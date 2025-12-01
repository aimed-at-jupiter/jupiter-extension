import "./App.css";
import { normaliseClient } from "./utils/normaliseClient";
import { useState } from "react";
import type { ClientSummary } from "./types";

function App() {
  const [clients, setClients] = useState<ClientSummary[]>([]);

  const handleSelectClient = (client: ClientSummary) => {
    chrome.runtime.sendMessage({ type: "FILL_FORM", payload: client });
  };

  const handleFetch = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((rawUsers) => {
        const clients = rawUsers.map((user: any) => normaliseClient(user));
        setClients(clients);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div style={{ padding: "1rem" }}>
        <h1>Jupiter Extension</h1>
        <button onClick={handleFetch}>Fetch Users</button>

        {clients.length > 0 && (
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
                onClick={() => handleSelectClient(client)}
              >
                {client.fullName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
