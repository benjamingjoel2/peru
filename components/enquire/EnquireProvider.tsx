"use client";

import { createContext, useCallback, useContext, useState } from "react";
import dynamic from "next/dynamic";

const EnquireModal = dynamic(() => import("./EnquireModal").then((m) => m.EnquireModal), { ssr: false });
const ItineraryDownloadModal = dynamic(() => import("./ItineraryDownloadModal").then((m) => m.ItineraryDownloadModal), { ssr: false });

type Ctx = {
  openEnquire: (journey?: string) => void;
  openDownload: (journey: string) => void;
};

const EnquireContext = createContext<Ctx>({ openEnquire: () => {}, openDownload: () => {} });

export function EnquireProvider({ children }: { children: React.ReactNode }) {
  const [enquire, setEnquire] = useState<{ open: boolean; journey?: string }>({ open: false });
  const [download, setDownload] = useState<{ open: boolean; journey?: string }>({ open: false });
  const [loaded, setLoaded] = useState(false);

  const openEnquire = useCallback((journey?: string) => {
    setLoaded(true);
    setEnquire({ open: true, journey });
  }, []);
  const openDownload = useCallback((journey: string) => {
    setLoaded(true);
    setDownload({ open: true, journey });
  }, []);

  return (
    <EnquireContext.Provider value={{ openEnquire, openDownload }}>
      {children}
      {loaded && (
        <>
          <EnquireModal open={enquire.open} journey={enquire.journey} onClose={() => setEnquire({ open: false })} />
          {download.journey && (
            <ItineraryDownloadModal open={download.open} journey={download.journey} onClose={() => setDownload((d) => ({ ...d, open: false }))} />
          )}
        </>
      )}
    </EnquireContext.Provider>
  );
}

export const useEnquire = () => useContext(EnquireContext);

/** Client button for server components. */
export function EnquireButton({ journey, children, className }: { journey?: string; children: React.ReactNode; className?: string }) {
  const { openEnquire } = useEnquire();
  return (
    <button type="button" onClick={() => openEnquire(journey)} className={className}>
      {children}
    </button>
  );
}

export function DownloadButton({ journey, children, className }: { journey: string; children: React.ReactNode; className?: string }) {
  const { openDownload } = useEnquire();
  return (
    <button type="button" onClick={() => openDownload(journey)} className={className}>
      {children}
    </button>
  );
}
