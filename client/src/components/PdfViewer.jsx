import { useState, useEffect } from "react";
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
import axios from "axios";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { FetchPdf } from "../logic/pdf/fetchPdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFViewer() {
  const location = useLocation();
  const pdf = location.state;
  const [numPages, setNumPages] = useState(null);
  const [isTwoPageMode, setIsTwoPageMode] = useState(false);
  const [loadedPages, setLoadedPages] = useState(() => {
    return parseInt(localStorage.getItem("loadedPages")) || 1;
  });
  const [pageWidth, setPageWidth] = useState(900);
  const [isFullPage, setIsFullPage] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { blobUrl: fileBlobUrl, loading: pdfLoading, error: pdfError } = FetchPdf(pdf?.src);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }

  const toggleFitToPage = () => {
    if (!isFullPage) {
      setPageWidth(window.innerWidth);
    } else {
      setPageWidth(900);
    }
    setIsFullPage(!isFullPage);
  };

  const toggleTwoPageMode = () => {
    setIsTwoPageMode((prev) => !prev);
    setPageWidth((prev) => (isTwoPageMode ? prev * 1.5 : prev / 1.5));
  };

  const zoomIn = () => {
    setIsFullPage(false);
    setPageWidth((prev) => Math.min(prev + 50, 1200));
  };

  const zoomOut = () => {
    setIsFullPage(false);
    setPageWidth((prev) => Math.max(prev - 50, 300));
  };

  const rotatePDF = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageWidth(900);
    setIsFullPage(false);
  }

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      setIsFullscreen(!!document.fullscreenElement);
    });
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsFullscreen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full p-6">
      {!isFullscreen && (
        <div className="w-full h-[65px] bg-[#333333] border-b border-gray-600 flex justify-between items-center px-4 fixed top-0 left-0 z-10">
          <div>
            {pdf.pdfName && (
              <h2 className="text-accent text-lg font-semibold">{pdf.pdfName}</h2>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="border-r-2 flex border-gray-600">
              <button className="w-8 h-8 flex items-center justify-center text-background" onClick={zoomOut}>
                <FaMinus size={15} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-white" onClick={zoomIn}>
                <FaPlus size={15} />
              </button>
              <button className={`w-8 h-8 flex items-center justify-center text-white rounded-full ${isFullPage ? "bg-accent" : ""}`} onClick={toggleFitToPage}>
                <FaExpand size={15} />
              </button>
            </div>
            {numPages && (
              <div className="text-white text-sm font-semibold border-r-2 border-r-gray-600 pr-4 h-[33px] flex items-center">
                <p>
                  Page <span className="bg-[#333333] border-2 border-gray-500 p-2 mx-2">{loadedPages}</span> of <span>{numPages}</span>
                </p>
              </div>
            )}
            <button className="w-8 h-8 flex items-center justify-center text-white" onClick={rotatePDF}>
              <FaRedo size={15} />
            </button>
            <button className={`w-8 h-8 flex items-center justify-center text-white rounded-full ${isTwoPageMode ? "bg-accent" : ""}`} onClick={toggleTwoPageMode}>
              <FaColumns size={15} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-white" onClick={toggleFullScreen}>
              <FaExpandArrowsAlt size={15} />
            </button>
          </div>
          <div>
            <h2 className="text-background font-highlight text-2xl font-semibold">
              Shree Kalam Academy
            </h2>
          </div>
        </div>
      )}

      {fileBlobUrl && (
        <div className="flex flex-col items-center mt-[70px] w-full">
          <Document
            file={fileBlobUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center h-[80vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mb-4"></div>
                <p className="text-accent text-lg font-header">Loading your PDF, please wait...</p>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
                <p className="text-accent text-xl font-semibold font-header mb-2">Failed to load the PDF.</p>
                <p className="text-white text-md font-body">Please check your internet connection or try again later.</p>
              </div>
            }
          >
            {Array.from({ length: loadedPages }, (_, index) => {
              const pageNumber = index + 1;
              const isLast = pageNumber === loadedPages;

              return isLast ? (
                <InView
                  key={pageNumber}
                  onChange={(inView) => {
                    if (inView && loadedPages < numPages) {
                      setLoadedPages((prev) => {
                        const newPages = Math.min(prev + 1, numPages);
                        localStorage.setItem("loadedPages", newPages);
                        return newPages;
                      });
                    }
                  }}
                  triggerOnce={false}
                  threshold={0.2}
                >
                  {({ ref }) => (
                    <div ref={ref}>
                      <Page
                        pageNumber={pageNumber}
                        width={pageWidth}
                        rotate={rotation}
                        renderMode="canvas"
                        className="mb-4"
                      />
                    </div>
                  )}
                </InView>
              ) : (
                <Page
                  key={pageNumber}
                  pageNumber={pageNumber}
                  width={pageWidth}
                  rotate={rotation}
                  renderMode="canvas"
                  className="mb-4"
                />
              );
            })}
          </Document>
        </div>
      )}
    </div>
  );
}
