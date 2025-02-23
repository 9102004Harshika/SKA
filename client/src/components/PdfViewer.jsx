const PdfViewer = ({ src }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <iframe src={src} className="w-full h-full" />
    </div>
  );
};

export default PdfViewer;
