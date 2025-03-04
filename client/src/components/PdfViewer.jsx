

import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaExpand,FaRedo } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();


export default function PDFViewer() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [loadedPages, setLoadedPages] = useState(() => {
    return parseInt(localStorage.getItem("loadedPages")) || 1;
  });
  const [pageWidth, setPageWidth] = useState(900); // Default width
  const [isFullPage, setIsFullPage] = useState(false); // Toggle state for full-page view
  const [rotation, setRotation] = useState(0);
  // Toggle Fit to Page Mode
  const toggleFitToPage = () => {
    if (!isFullPage) {
      setPageWidth(window.innerWidth); // Expand to full width
    } else {
      setPageWidth(900); // Reset to default width
    }
    setIsFullPage(!isFullPage);
  };

  // Zoom In - Increase width
  const zoomIn = () => {
    setIsFullPage(false); // Disable full-page mode when zooming
    setPageWidth((prevWidth) => Math.min(prevWidth + 50, 1200));
  };

  // Zoom Out - Decrease width
  const zoomOut = () => {
    setIsFullPage(false); // Disable full-page mode when zooming
    setPageWidth((prevWidth) => Math.max(prevWidth - 50, 300));
  };

  function onFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setPdfName(selectedFile.name);
      setNumPages(null);
      setLoadedPages(1);
      localStorage.setItem("loadedPages", 1);
    }
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageWidth(900); // Reset to normal width on load
    setIsFullPage(false);
  }
  let lastScrollY = 0; // Track previous scroll position
  let isScrolling = false; // To prevent rapid scroll handling

  const rotatePDF = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };
  function handleScroll() {
    const scrollPosition = window.scrollY;

    if (
      scrollPosition + window.innerHeight >= document.body.offsetHeight - 50 &&
      loadedPages < numPages
    ) {
      // Scrolling Down - Add one page when reaching the bottom
      setLoadedPages((prev) => {
        const newPages = Math.min(prev + 1, numPages);
        localStorage.setItem("loadedPages", newPages);
        return newPages;
      });
    } else if (
      scrollPosition < lastScrollY &&
      loadedPages > 1 &&
      !isScrolling
    ) {
      // Scrolling Up - Subtract one page when scrolling up
      isScrolling = true;
      setLoadedPages((prev) => {
        const newPages = Math.max(prev - 1, 1);
        localStorage.setItem("loadedPages", newPages);
        return newPages;
      });

      // Debounce: Disable scrolling logic for a brief time to prevent rapid firing
      setTimeout(() => {
        isScrolling = false;
      }, 200); // Adjust the delay time (in milliseconds) to control the scroll speed
    }

    // Update lastScrollY for the next scroll event
    lastScrollY = scrollPosition;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadedPages, numPages]);

  return (
    // added pdf viewer in the project 
    <div className="flex flex-col items-center bg-black min-h-screen w-full p-6">
      
      {/* Toolbar */}
      <div className="w-full h-[65px] bg-[#333333] border-b border-gray-600 flex justify-between items-center px-4 fixed top-0 left-0 z-10">
        <div>
          {pdfName && (
            <h2 className="text-white text-lg font-semibold">{pdfName}</h2>
          )}
          <input type="file" accept="application/pdf" onChange={onFileChange} className="mb-4" />
        </div>
        <div className="flex items-center ml-[-400px] gap-2 ">
          <div className=" border-r-2  flex border-gray-600">
            {/* Zoom Out Button */}
            <button
              className="w-8 h-8 flex items-center justify-center text-white "
              onClick={zoomOut}
            >
              <FaMinus size={15} />
            </button>

            {/* Zoom In Button */}
            <button
              className="w-8 h-8 flex items-center justify-center text-white "
              onClick={zoomIn}
            >
              <FaPlus size={15} />
            </button>
            {/* Fit to page */}
            <button
              className={`w-8 h-8 flex items-center justify-center text-white rounded-full ${
                isFullPage ? "bg-blue-600 hover:bg-blue-500" : ""
              }`}
              onClick={toggleFitToPage}
            >
              <FaExpand size={15} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {file && numPages && (
              <div className="text-white ml-4 text-sm font-semibold border-r-2 border-r-gray-600 pr-4 h-[33px] flex items-center">
                <p className="tracking-wide">
                  Page
                  <span className="bg-[#333333] border border-2 border-gray-500 p-2 mx-2">
                    {loadedPages}
                  </span>
                  of <span>{numPages}</span>
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 ">
         <div className=""> <button
              className="w-8 h-8 flex items-center justify-center text-white"
              onClick={rotatePDF}
            >
              <FaRedo size={15} />
            </button>
            
            </div>
          </div>
        </div>
        <div>ekjdnweS</div>
      </div>

      {/* PDF Viewer - No Scrollbar, Scrolls with Page */}
      {file && (
        <div className="flex flex-col items-center mt-[70px] w-full">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(loadedPages), (_, index) => (
              <Page
                key={index}
                pageNumber={index + 1}
                className="mb-4"
                width={pageWidth}
                rotate={rotation}
              />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
}