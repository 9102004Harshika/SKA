import { useState, useEffect } from "react";

export function FetchPdf(token) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let objectUrl = null;

    if (!token) {
      setBlobUrl(null);
      setLoading(false);
      setError("Token not provided");
      return;
    }

    const fetchBlob = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:5000/api/files/getStream/${token}`);
        if (!response.ok) throw new Error("Failed to fetch PDF");

        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);

        if (isMounted) {
          setBlobUrl(objectUrl);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching PDF blob:", err);
        if (isMounted) {
          setError(err.message || "Unknown error");
          setLoading(false);
        }
      }
    };

    fetchBlob();

    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [token]);

  return { blobUrl, loading, error };
}
