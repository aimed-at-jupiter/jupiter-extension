import type { ClientSummary } from "../types";
import { getTitle } from "./getTitle";

export function normaliseClient(rawClient: any): ClientSummary {
  const safeClient = {
    name: rawClient?.name ?? "",
    email: rawClient?.email ?? "",
    phone: rawClient?.phone ?? "",
    street: rawClient?.address?.street ?? "",
    suite: rawClient?.address?.suite ?? "",
    city: rawClient?.address?.city ?? "",
    zipcode: rawClient?.address?.zipcode ?? "",
  };
  const { title, nameWithoutTitle } = getTitle(safeClient.name);

  const suiteParts = safeClient.suite.trim().split(/\s+/);

  let normalisedLine1;

  if (suiteParts[0].toLowerCase() === "suite") {
    normalisedLine1 = suiteParts.slice(1).join(" ") + ` ${safeClient.street}`;
  } else {
    normalisedLine1 = `${safeClient.suite.trim()} ${safeClient.street.trim()}`;
  }

  return {
    fullName: nameWithoutTitle,
    title,
    email: safeClient.email.trim(),
    phone: safeClient.phone.trim(),
    address: {
      line1: normalisedLine1.trim(),
      city: safeClient.city.trim(),
      postCode: safeClient.zipcode.trim(),
    },
  };
}
