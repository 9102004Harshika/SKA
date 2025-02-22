import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min"; // Import worker script

// Set worker path manually
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl, onClose }) => {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.5);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        renderPage(1, pdf);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [pdfUrl]);

  const renderPage = async (pageNumber, pdf) => {
    if (!pdf) return;
    const page = await pdf.getPage(pageNumber);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
  };

  const nextPage = () => {
    if (pageNum < numPages) {
      setPageNum(pageNum + 1);
      renderPage(pageNum + 1, pdfDoc);
    }
  };

  const prevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
      renderPage(pageNum - 1, pdfDoc);
    }
  };

  const zoomIn = () => {
    setScale(scale + 0.2);
    renderPage(pageNum, pdfDoc);
  };

  const zoomOut = () => {
    if (scale > 0.5) {
      setScale(scale - 0.2);
      renderPage(pageNum, pdfDoc);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md shadow-md w-4/5 h-4/5 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          ✖
        </button>

        <canvas ref={canvasRef} className="border w-full h-auto" />

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevPage}
            disabled={pageNum <= 1}
            className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            ◀ Previous
          </button>
          <span>
            Page {pageNum} of {numPages}
          </span>
          <button
            onClick={nextPage}
            disabled={pageNum >= numPages}
            className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>

        <div className="flex justify-center mt-2 space-x-4">
          <button
            onClick={zoomOut}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            ➖ Zoom Out
          </button>
          <button
            onClick={zoomIn}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            ➕ Zoom In
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
