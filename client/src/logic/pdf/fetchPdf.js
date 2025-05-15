import { useState, useEffect } from "react";

export function FetchPdf(token) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setBlobUrl(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchPdf = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/files/getStream?token=${token}`,
          { headers: { Range: "bytes=0-" } }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        if (isMounted) {
          setBlobUrl(url);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchPdf();

    return () => {
      isMounted = false;
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [token]);

  return { blobUrl, loading, error };
}
