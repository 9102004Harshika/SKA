// useStreamToken.js
import { useState, useEffect } from "react";
import axios from "axios";

const streamTokenCache = {};

export function RequestStream(pdfUrl) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(!!pdfUrl);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pdfUrl) {
      setToken(null);
      setLoading(false);
      setError(null);
      return;
    }

    const cachedToken = streamTokenCache[pdfUrl];
    if (cachedToken) {
      setToken(cachedToken);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}api/files/requestStream`, {
        pdfUrl,
      })
      .then((res) => {
        if (!isMounted) return;
        streamTokenCache[pdfUrl] = res.data.token;
        setToken(res.data.token);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Stream token fetch failed", err);
        setError(err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  return { token, loading, error };
}
