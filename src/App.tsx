import "./App.css";
import { normaliseClient } from "./utils/normaliseClient";
import { useState, useEffect } from "react";
import type { ClientSummary, ClientStatus } from "./types";
import { ClientItem } from "./components/ClientItem";

const defaultStatus: ClientStatus = {
  sending: false,
  sent: false,
  error: undefined,
};

function App() {
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [clientStatuses, setClientStatuses] = useState<
    Record<number, ClientStatus>
  >({});

  const BACKEND_URL = "http://localhost:8080/clients";

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((rawUsers: any[]) => {
        const normalisedClients = rawUsers.map((user) => normaliseClient(user));
        setClients(normalisedClients);

        const initialStatus: Record<number, ClientStatus> = {};
        normalisedClients.forEach((_, index) => {
          initialStatus[index] = { ...defaultStatus };
        });
        setClientStatuses(initialStatus);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("failed to load clients");
        setLoading(false);
      });
  };

  const handleAutofill = (client: ClientSummary) => {
    chrome.runtime.sendMessage({ type: "FILL_FORM", payload: client });
  };

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

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Jupiter Extension</h1>
      {loading && <div>Loading clients...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <ul style={{ marginTop: "1rem", padding: 0, listStyle: "none" }}>
        {clients.map((client, index) => (
          <ClientItem
            key={index}
            client={client}
            index={index}
            expanded={expanded}
            setExpanded={setExpanded}
            status={clientStatuses[index]}
            onAutofill={handleAutofill}
            onSendToCRM={handleSendToCRM}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
