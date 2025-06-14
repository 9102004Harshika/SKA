import { useState, useEffect } from "react";

export function FetchPdf(token) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setPdfUrl(null);
      setError("Token not provided");
      setLoading(false);
      return;
    }

    const streamUrl = `${process.env.REACT_APP_API_BASE_URL}api/files/getStream/${token}`;
    setPdfUrl(streamUrl);
    setLoading(false);
    setError(null);
  }, [token]);

  return { pdfUrl, loading, error };
}

