export type ClientSummary = {
  fullName: string;
  title?: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    city: string;
    postCode: string;
  };
};

export type FillFormMessage = {
  type: "FILL_FORM";
  payload: ClientSummary;
};

export type ClientStatus = {
  sending: boolean;
  error?: string;
  sent?: boolean;
};
