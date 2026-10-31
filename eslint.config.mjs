import next from "eslint-config-next";

const config = [
  ...next,
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", ".open-next/**", ".wrangler/**"] },
];

export default config;
