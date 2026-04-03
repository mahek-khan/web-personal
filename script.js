import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast'; // Optional: notifications ke liye
import 'react-hot-toast/dist/index.css';

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        const response = await fetch("https://api.example.com/data", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.message || "No data received");
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch data. Please try again later.");
        setData("");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );

  if (error) return (
    <div className="error">
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );

  return (
    <div className="app">
      <Toaster position="top-right" />
      <div className="response-box">
        <h2>API Response:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
