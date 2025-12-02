import "./App.css";
import { normaliseClient } from "./utils/normaliseClient";
import { useState, useEffect } from "react";
import type { ClientSummary, ClientStatus } from "./types";

function App() {
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [clientStatuses, setClientStatuses] = useState<
    Record<number, ClientStatus>
  >({});

  const BACKEND_URL = "http://localhost:8080/clients";

  const handleAutofill = (client: ClientSummary) => {
    chrome.runtime.sendMessage({ type: "FILL_FORM", payload: client });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSendToCRM = (client: ClientSummary, index: number) => {
    setClientStatuses((prev) => ({
      ...prev,
      [index]: { sending: true, error: undefined, sent: false },
    }));

    fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send");
        return res.json();
      })
      .then(() => {
        setClientStatuses((prev) => ({
          ...prev,
          [index]: { sending: false, error: undefined, sent: true },
        }));
      })
      .catch(() => {
        setClientStatuses((prev) => ({
          ...prev,
          [index]: { sending: false, error: "Failed to send", sent: false },
        }));
      });
  };

  const fetchClients = () => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((rawUsers: any[]) => {
        const normalisedClients = rawUsers.map((user) => normaliseClient(user));
        setClients(normalisedClients);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("failed to load clients");
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <div>Loading users...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ padding: "1rem" }}>
        <h1>Jupiter Extension</h1>
        <ul style={{ marginTop: "1rem", padding: 0, listStyle: "none" }}>
          {clients.map((client: ClientSummary, index: number) => {
            const status: ClientStatus = clientStatuses[index] || {
              sending: false,
              sent: false,
              error: undefined,
            };
            return (
              <li
                key={index}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setExpanded(expanded === index ? null : index)}
                >
                  {client.fullName}
                </div>

                {expanded === index && (
                  <div style={{ marginTop: "0.5rem" }}>
                    <div>Email: {client.email}</div>
                    <div>City: {client.address.city}</div>
                    <div>Phone: {client.phone}</div>

                    <button
                      onClick={() => handleAutofill(client)}
                      disabled={status.sending}
                    >
                      Autofill Form
                    </button>

                    <button
                      onClick={() => handleSendToCRM(client, index)}
                      disabled={status.sending || status.sent}
                    >
                      {status.sending
                        ? "Sending..."
                        : status.sent
                        ? "Sent"
                        : "Send to CRM"}
                    </button>

                    {status.error && (
                      <div style={{ color: "red", marginTop: "0.25rem" }}>
                        {status.error}
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
