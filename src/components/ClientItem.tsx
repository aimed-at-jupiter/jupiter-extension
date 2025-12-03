import type { ClientSummary, ClientStatus } from "../types";

type Props = {
  client: ClientSummary;
  index: number;
  expanded: number | null;
  setExpanded: (index: number | null) => void;
  status: ClientStatus;
  onAutofill: (client: ClientSummary) => void;
  onSendToCRM: (client: ClientSummary, index: number) => void;
};

export const ClientItem = ({
  client,
  index,
  expanded,
  setExpanded,
  status,
  onAutofill,
  onSendToCRM,
}: Props) => {
  return (
    <li
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

          <button onClick={() => onAutofill(client)} disabled={status.sending}>
            Autofill Form
          </button>

          <button
            onClick={() => onSendToCRM(client, index)}
            disabled={status.sending || status.sent}
            style={{
              backgroundColor: status.sent ? "green" : undefined,
              color: status.sent ? "white" : undefined,
              cursor: status.sent ? "not-allowed" : undefined,
              pointerEvents: status.sent ? "none" : undefined,
            }}
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
};
