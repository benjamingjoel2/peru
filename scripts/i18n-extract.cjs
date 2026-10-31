/* Collects every English string the site can show and writes:
 *   i18n/source.json      { key: English }   (what translators work from)
 *   i18n/client-keys.json [key]              (strings client components need in the browser)
 * and reports missing translations per locale. Run: node scripts/i18n-extract.cjs
 */
const fs = require("fs"), path = require("path"), Module = require("module");
const root = path.join(__dirname, "..");
const ts = require("typescript");

// Minimal TypeScript loader with the "@/" alias, enough to evaluate data modules.
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (req, parent, ...rest) {
  if (req.startsWith("@/")) req = path.join(root, req.slice(2));
  if (req === "server-only") return require.resolve("./noop.cjs");
  try { return origResolve.call(this, req, parent, ...rest); } catch (e) {
    for (const ext of [".ts", ".tsx", "/index.ts"]) { try { return origResolve.call(this, req + ext, parent, ...rest); } catch {} }
    throw e;
  }
};
for (const ext of [".ts", ".tsx"]) {
  require.extensions[ext] = (m, filename) => {
    const out = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, resolveJsonModule: true }, fileName: filename });
    m._compile(out.outputText, filename);
  };
}
const { copyStrings, hashKey } = require(path.join(root, "lib/i18n/index.ts"));
const cfg = require(path.join(root, "i18n/extract.config.cjs"));

const strings = new Map(); // key -> text
const add = (s) => { if (typeof s === "string" && /[A-Za-z]/.test(s)) strings.set(hashKey(s), s); };

// 1. Data modules (evaluated, so computed strings are included)
for (const rel of cfg.dataModules) {
  const mod = require(path.join(root, rel));
  for (const [name, v] of Object.entries(mod)) {
    if (typeof v === "function") continue;
    if (typeof v === "string") { if (!cfg.skipExports?.includes(name)) add(v); continue; }
    for (const s of copyStrings(v)) add(s);
  }
}
for (const s of cfg.extra?.(require) ?? []) add(s);

// 2. t("...") and L(...) literals in source files
const srcFiles = [];
const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) { if (!["node_modules", ".next"].includes(f.name)) walk(p); } else if (/\.(tsx?|mjs)$/.test(f.name)) srcFiles.push(p); } };
for (const d of ["app", "components", "lib"]) walk(path.join(root, d));
const fileStrings = new Map();
const importsOf = new Map();
for (const file of srcFiles) {
  const src = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const found = [];
  const imps = [];
  const visit = (n, inL) => {
    if (ts.isImportDeclaration(n)) imps.push(n.moduleSpecifier.text);
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
      const name = n.expression.text;
      if (name === "t" && n.arguments[0] && (ts.isStringLiteral(n.arguments[0]) || ts.isNoSubstitutionTemplateLiteral(n.arguments[0]))) found.push(n.arguments[0].text);
      if (name === "L") { n.arguments.forEach((a) => visit(a, true)); return; }
    }
    if (ts.isPropertyAssignment(n) && ["error", "message"].includes(n.name.getText()) && ts.isStringLiteral(n.initializer) && /\s/.test(n.initializer.text)) found.push(n.initializer.text);
    if (inL && ts.isPropertyAssignment(n)) {
      const key = n.name.getText().replace(/["']/g, "");
      if (cfg.skipKeys.has(key) && key !== "alt") return;
    }
    if (inL && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) && !ts.isPropertyAssignment(n.parent) || (inL && ts.isPropertyAssignment(n.parent) && n.parent.initializer === n && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)))) found.push(n.text);
    ts.forEachChild(n, (c) => visit(c, inL));
  };
  visit(sf, false);
  fileStrings.set(file, found);
  importsOf.set(file, { imps, client: /^["']use client["']/.test(src.trimStart()) });
  // only static source copy is added for app/components/lib files (data modules were evaluated above)
  if (!cfg.dataModules.some((m) => path.join(root, m) === file)) found.forEach(add);
}

// 3. Client graph: files reachable from "use client" files
const resolveImp = (from, spec) => {
  let base = spec.startsWith("@/") ? path.join(root, spec.slice(2)) : spec.startsWith(".") ? path.join(path.dirname(from), spec) : null;
  if (!base) return null;
  for (const ext of ["", ".ts", ".tsx", "/index.ts"]) if (fs.existsSync(base + ext) && fs.statSync(base + ext).isFile()) return base + ext;
  return null;
};
const clientFiles = new Set();
const stack = [...importsOf.entries()].filter(([, v]) => v.client).map(([f]) => f);
while (stack.length) {
  const f = stack.pop();
  if (clientFiles.has(f)) continue;
  clientFiles.add(f);
  for (const s of importsOf.get(f)?.imps ?? []) { const r = resolveImp(f, s); if (r && importsOf.has(r) && !cfg.dataModules.some((m) => path.join(root, m) === r)) stack.push(r); }
}
const clientKeys = new Set();
for (const f of clientFiles) for (const s of fileStrings.get(f) ?? []) if (/[A-Za-z]/.test(s)) clientKeys.add(hashKey(s));

const source = Object.fromEntries([...strings.entries()].sort((a, b) => a[1].localeCompare(b[1])));
fs.writeFileSync(path.join(root, "i18n/source.json"), JSON.stringify(source, null, 1) + "\n");
fs.writeFileSync(path.join(root, "i18n/client-keys.json"), JSON.stringify([...clientKeys].sort()) + "\n");
console.log(`${Object.keys(source).length} strings, ${clientKeys.size} client keys`);
for (const l of ["fr", "de", "es"]) {
  const dict = JSON.parse(fs.readFileSync(path.join(root, `i18n/${l}.json`), "utf8"));
  const missing = Object.keys(source).filter((k) => !dict[k]);
  const stale = Object.keys(dict).filter((k) => !source[k]);
  console.log(`${l}: ${missing.length} missing, ${stale.length} unused`);
  if (process.argv.includes("--strict") && missing.length) process.exitCode = 1;
}
