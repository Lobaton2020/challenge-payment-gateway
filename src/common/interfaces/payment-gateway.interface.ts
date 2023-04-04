export enum enumTypePaymentSource {
  NEQUI = 'NEQUI',
  CARD = 'CARD',
}
export interface IPaymentSource {
  type: enumTypePaymentSource;
  token: string;
  acceptance_token: string;
  customer_email: string;
}

export interface Meta {
  data: IResponsePayloadMerchant;
  meta: {};
}

export interface IResponsePayloadMerchant {
  id: number;
  name: string;
  email: string;
  contact_name: string;
  phone_number: string;
  active: boolean;
  logo_url: null;
  legal_name: string;
  legal_id_type: string;
  legal_id: string;
  public_key: string;
  accepted_currencies: string[];
  fraud_javascript_key: null;
  fraud_groups: any[];
  accepted_payment_methods: string[];
  payment_methods: PaymentMethod[];
  presigned_acceptance: PresignedAcceptance;
}

export interface PaymentMethod {
  name: string;
  payment_processors: PaymentProcessor[];
}

export interface PaymentProcessor {
  name: string;
}

export interface PresignedAcceptance {
  acceptance_token: string;
  permalink: string;
  type: string;
}

export interface ICard {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
}

export interface INequi {
  phone_number: string;
}

export interface IResponseTokenization {
  data: { id: string };
}



export interface PayloadTransaction {
  acceptance_token: string;
  amount_in_cents: number;
  currency: string;
  customer_email: string;
  payment_method: PaymentMethod;
  payment_source_id: number;
  redirect_url: string;
  reference: string;
  customer_data: CustomerData;
  shipping_address: ShippingAddress;
}

export interface CustomerData {
  phone_number: string;
  full_name: string;
}

export interface PaymentMethod {
  type: string;
  token: string;
  installments: number;
}

export interface ShippingAddress {
  address_line_1: string;
  address_line_2: string;
  country: string;
  region: string;
  city: string;
  name: string;
  phone_number: string;
  postal_code: string;
}
