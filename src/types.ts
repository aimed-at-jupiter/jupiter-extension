export type ClientSummary = {
  name: {
    full: string;
    first?: string;
    last?: string;
    title?: string;
  };
  email: string;
  phone: string;
  address: {
    line1: string;
    city: string;
    postCode: string;
  };
};
