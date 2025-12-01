import "./App.css";
import { normaliseClient } from "./utils/normaliseClient";
import { useState, useEffect } from "react";
import type { ClientSummary } from "./types";

function App() {
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleAutofill = (client: ClientSummary) => {
    chrome.runtime.sendMessage({ type: "FILL_FORM", payload: client });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSendToCRM = (client: ClientSummary) => {
    fetch("path", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Sent to CRM");
      })
      .catch((err) => {
        setError(err);
        console.error(err);
        alert("Failed to send to CRM");
      });
  };

  const fetchClients = () => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((rawUsers) => {
        const normalisedClients = rawUsers.map((user: any) =>
          normaliseClient(user)
        );
        setClients(normalisedClients);
      })
      .catch((err) => {
        setError("failed to load clients");
        console.error(err);
      });
  };

  return (
    <>
      {loading && <div>Loading users...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ padding: "1rem" }}>
        <h1>Jupiter Extension</h1>
        <ul style={{ marginTop: "1rem", padding: 0, listStyle: "none" }}>
          {clients.map((client: ClientSummary, index: number) => (
            <li
              key={index}
              style={{
                padding: "0.5 rem",
                border: "1px solid #ccc",
                marginBottom: "0.5rem",
                cursor: "pointer",
              }}
            >
              <div
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                {client.fullName}
              </div>
              {expanded === index && (
                <div style={{ marginTop: "0.5rem" }}>
                  <div>Email: {client.email}</div>
                  <div>City: {client.address.city}</div>
                  <div>Phone: {client.phone}</div>
                  <button onClick={() => handleAutofill(client)}>
                    Autofill Form
                  </button>
                  <button onClick={() => handleSendToCRM(client)}>
                    Send to CRM
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
