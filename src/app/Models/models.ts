export interface User {
  token: string;
}

export interface Plan {
  domains: number;
  emails: number;
  id: number;
  liveSupport: boolean;
  planName: string;
  price: number;
  space: number;
}
