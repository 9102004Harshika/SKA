// import { useState, useEffect } from "react";

// export function FetchPdf(token) {
//   const [blobUrl, setBlobUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!token) {
//       setBlobUrl(null);
//       setLoading(true);
//       setError(null);
//       return;
//     }

//     let isMounted = true;
//     setLoading(true);
//     setError(null);

//     const fetchPdf = async () => {
//       try {
//         // Instead of fetching and creating a blob, just set the URL string directly
//         // React-pdf will handle range requests internally on this URL
        
//         const url = `http://localhost:5000/api/files/getStream/${token}`;
    
//         if (isMounted) {
//           setBlobUrl(url);  // set URL string instead of blob URL
//           setLoading(false);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err);
//           setLoading(false);
//         }
//       }
//     };
    
//     fetchPdf();

//     return () => {
//       isMounted = false;
//       if (blobUrl) {
//         URL.revokeObjectURL(blobUrl);
//       }
//     };
//   }, [token]);

//   return { blobUrl, loading, error };
// }


import { useState, useEffect } from "react";

export function FetchPdf(token) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (!token) {
      if (isMounted) {
        setBlobUrl(null);
        setError(null);
        setLoading(true);
      }
      return;
    }

    setLoading(true);
    setError(null);

    const url = `http://localhost:5000/api/files/getStream/${token}`;
    if (isMounted) {
      setBlobUrl(url);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  return { blobUrl, loading, error };
}
