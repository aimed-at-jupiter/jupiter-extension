export interface ClientRequest {
  fullName: string;
  title?: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    city: string;
    postCode: string;
  };
}

export interface ClientRow {
  id: number;
  full_name: string;
  title?: string | null;
  email: string;
  phone: string;
  address_line1: string;
  city: string;
  post_code: string;
}
