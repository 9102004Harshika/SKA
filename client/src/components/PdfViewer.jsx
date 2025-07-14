import React, { useState, useEffect, useMemo,useRef } from "react";
import { InView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import {
  FaPlus,
  FaMinus,
  FaExpand,
  FaRedo,
  FaColumns,
  FaExpandArrowsAlt,
} from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { FetchPdf } from "../logic/pdf/fetchPdf";

// PDF worker setup
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// 🧠 Memoized Page component
const MemoPage = React.memo(({ pageNumber, width, rotate }) => (
  <Page
    key={pageNumber}
    pageNumber={pageNumber}
    width={width}
    rotate={rotate}
    renderMode="canvas"
    renderTextLayer={false}
    renderAnnotationLayer={false}
    className="mb-4 shadow-lg"
    loading={<div className="text-white text-center my-4">Loading page {pageNumber}...</div>}
  />
));
export default function PDFViewer() {
  const location = useLocation();
  const pdf = location.state;

  const { pdfUrl: fileBlobUrl, loading: pdfLoading, error: pdfError } = FetchPdf(pdf?.src);

  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState(() =>
    parseInt(localStorage.getItem("loadedPages")) || 1
  );

  const [isTwoPageMode, setIsTwoPageMode] = useState(false);
  const [pageWidth, setPageWidth] = useState(900);
  const [isFullPage, setIsFullPage] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [goToPageInput, setGoToPageInput] = useState("");

  const pageRefs = useRef({});

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      setIsFullscreen(!!document.fullscreenElement);
    });
    const handleKeyDown = (e) => e.key === "Escape" && setIsFullscreen(false);
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoadedPages((prev) => Math.min(prev, numPages));
    setPageWidth(900);
    setIsFullPage(false);
  };
  const handleGoToPage = () => {
    const targetPage = parseInt(goToPageInput, 10);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= numPages) {
      setLoadedPages((prev) => Math.max(prev, targetPage)); // Ensure the page is rendered
      const pageEl = pageRefs.current[targetPage];
      if (pageEl) {
        pageEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const toggleFitToPage = () => {
    const screenWidth = window.innerWidth;
    setIsFullPage((prev) => {
      const newState = !prev;
      setPageWidth(newState ? screenWidth : 900);
      return newState;
    });
  };

  const toggleTwoPageMode = () => setIsTwoPageMode((prev) => !prev);
  const zoomIn = () => setPageWidth((prev) => Math.min(prev + 50, 1200));
  const zoomOut = () => setPageWidth((prev) => Math.max(prev - 50, 300));
  const rotatePDF = () => setRotation((prev) => (prev + 90) % 360);

  const memoizedFileBlobUrl = useMemo(() => fileBlobUrl, [fileBlobUrl]);

  // ✅ Track which page is most visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            page: parseInt(entry.target.dataset.page, 10),
            ratio: entry.intersectionRatio,
          }));

        if (visible.length) {
          visible.sort((a, b) => b.ratio - a.ratio);
          const visiblePage = visible[0].page;
          setCurrentPage((prev) => (prev !== visiblePage ? visiblePage : prev));
        }
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    Object.values(pageRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [numPages, isTwoPageMode]);

  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full p-6">
      {!isFullscreen && (
        <div className="w-full h-[65px] bg-[#333333] border-b border-gray-600 fixed top-0 left-0 z-10 px-4 flex justify-between items-center">
          <h2 className="text-accent text-lg font-semibold">
            {pdf?.pdfName || "Untitled Document"}
          </h2>
          <div className="flex items-center gap-2">
            <div className="border-r-2 flex border-gray-600">
              <button onClick={zoomOut} className="w-8 h-8 flex items-center justify-center text-white"><FaMinus size={15} /></button>
              <button onClick={zoomIn} className="w-8 h-8 flex items-center justify-center text-white"><FaPlus size={15} /></button>
              <button onClick={toggleFitToPage} className={`w-8 h-8 flex items-center justify-center ${isFullPage ? "bg-accent text-black rounded-full mr-2" : "text-white"}`}><FaExpand size={15} /></button>
            </div>
            {numPages && (
              <div className="text-white text-sm font-semibold border-r-2 border-gray-600 px-4">
                Page{" "}
                <span className="bg-[#333333] border border-gray-500 px-2 py-1 mx-2">
                  {isTwoPageMode
                    ? `${currentPage}${currentPage + 1 <= numPages ? `–${currentPage + 1}` : ""}`
                    : currentPage}
                </span>{" "}
                of {numPages}
              </div>
            )}
            <button onClick={rotatePDF} className="w-8 h-8 flex items-center justify-center text-white"><FaRedo size={15} /></button>
            <button onClick={toggleTwoPageMode} className={`w-8 h-8 flex items-center justify-center ${isTwoPageMode ? "bg-accent text-black rounded-full" : "text-white"}`}><FaColumns size={15} /></button>
            <button onClick={toggleFullScreen} className="w-8 h-8 flex items-center justify-center text-white"><FaExpandArrowsAlt size={15} /></button>
            <div className="flex items-center gap-2">
  <input
    type="number"
    min="1"
    max={numPages}
    value={goToPageInput}
    onChange={(e) => setGoToPageInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleGoToPage();
    }}
    placeholder="Page"
    className="w-16 px-2 py-1 text-sm rounded bg-[#222] text-white border border-gray-600"
  />
  <button
    onClick={handleGoToPage}
    className="px-2 py-1 text-sm bg-accent text-black rounded hover:bg-yellow-400"
  >
    Go
  </button>
</div>

          </div>
          <h2 className="text-background text-2xl font-semibold font-highlight">Kalp Academy</h2>
        </div>
      )}

      {memoizedFileBlobUrl ? (
        <Document
          file={memoizedFileBlobUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="flex flex-col items-center justify-center h-[80vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mb-4"></div>
            <p className="text-accent text-lg font-header">Loading your PDF, please wait...</p>
          </div>}
          error={<div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
            <p className="text-accent text-xl font-semibold font-header mb-2">Failed to load the PDF.</p>
            <p className="text-white text-md font-body">Please check your internet connection or try again later.</p>
          </div>}
        >
          {Array.from({ length: numPages }, (_, i) => {
            const pageNumber = i + 1;
            const shouldRender = pageNumber <= loadedPages;

            return (
              <InView
                key={`inview-${pageNumber}`}
                triggerOnce={true}
                onChange={(inView) => {
                  if (inView && pageNumber === loadedPages && loadedPages < numPages) {
                    setLoadedPages((prev) => {
                      const next = prev + (isTwoPageMode ? 2 : 1);
                      localStorage.setItem("loadedPages", next);
                      return next;
                    });
                  }
                }}
              >
                {({ inView, ref }) => {
                  const pageRefCallback = (el) => {
                    pageRefs.current[pageNumber] = el;
                    ref(el); // connect InView's internal ref
                  };

                  if (inView && shouldRender) {
                    return isTwoPageMode && pageNumber % 2 === 1 ? (
                      <div ref={pageRefCallback} className="flex justify-center gap-4 mb-6" data-page={pageNumber}>
                        <MemoPage pageNumber={pageNumber} width={pageWidth / 1.1} rotate={rotation} />
                        {pageNumber + 1 <= numPages && (
                          <MemoPage pageNumber={pageNumber + 1} width={pageWidth / 1.1} rotate={rotation} />
                        )}
                      </div>
                    ) : !isTwoPageMode ? (
                      <div ref={pageRefCallback} data-page={pageNumber}>
                        <MemoPage pageNumber={pageNumber} width={pageWidth} rotate={rotation} />
                      </div>
                    ) : null;
                  }

                  return <div ref={pageRefCallback} data-page={pageNumber} style={{ height: "1200px" }} />;
                }}
              </InView>
            );
          })}
        </Document>
      ) : (
        <div className="text-white text-center mt-20">Waiting for PDF URL...</div>
      )}
    </div>
  );
}
