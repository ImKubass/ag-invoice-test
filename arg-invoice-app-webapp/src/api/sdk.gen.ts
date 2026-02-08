import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String']['output'];
};

export type CreateInvoiceInput = {
  currency?: InputMaybe<Currency>;
  customerCity: Scalars['String']['input'];
  customerCountry: Scalars['String']['input'];
  customerEmail: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  customerStreet: Scalars['String']['input'];
  customerZip: Scalars['String']['input'];
  dueDate: Scalars['DateTime']['input'];
  issueDate: Scalars['DateTime']['input'];
  items: Array<InvoiceItemInput>;
  projectDescription: Scalars['String']['input'];
  vendorCity: Scalars['String']['input'];
  vendorCountry: Scalars['String']['input'];
  vendorStreet: Scalars['String']['input'];
  vendorZip: Scalars['String']['input'];
};

export enum Currency {
  Czk = 'czk',
  Eur = 'eur',
  Usd = 'usd'
}

export type Invoice = {
  __typename?: 'Invoice';
  amount: Scalars['Float']['output'];
  currency: Currency;
  customerCity: Scalars['String']['output'];
  customerCountry: Scalars['String']['output'];
  customerEmail: Scalars['String']['output'];
  customerName: Scalars['String']['output'];
  customerStreet: Scalars['String']['output'];
  customerZip: Scalars['String']['output'];
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  issueDate: Scalars['DateTime']['output'];
  items: Array<InvoiceItem>;
  number: Scalars['String']['output'];
  projectDescription: Scalars['String']['output'];
  status: InvoiceStatus;
  vendorCity: Scalars['String']['output'];
  vendorCountry: Scalars['String']['output'];
  vendorStreet: Scalars['String']['output'];
  vendorZip: Scalars['String']['output'];
};

export type InvoiceItem = {
  __typename?: 'InvoiceItem';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  pricePerUnit: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
};

export type Invoices = {
  __typename?: 'Invoices';
  data: Array<Invoice>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type InvoiceItemInput = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  pricePerUnit: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
};

export enum InvoiceStatus {
  Paid = 'paid',
  Pending = 'pending'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createInvoice: Invoice;
  deleteInvoice: Success;
  /** "Authenticate user with email and password and return a JWT access token. The token must be passed in the Authorization header for authenticated requests (e.g., 'Authorization: Bearer <token>') */
  login: AccessToken;
  /** Switch invoice between `paid` and `pending` status */
  markAsPaid: Invoice;
  register: Success;
  updateInvoice: Invoice;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationDeleteInvoiceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkAsPaidArgs = {
  id: Scalars['Int']['input'];
  paid: Scalars['Boolean']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateInvoiceArgs = {
  id: Scalars['Int']['input'];
  input: UpdateInvoiceInput;
};

export type Query = {
  __typename?: 'Query';
  invoice: Invoice;
  invoices: Invoices;
  me: User;
  status: Scalars['String']['output'];
};


export type QueryInvoiceArgs = {
  id: Scalars['Int']['input'];
};

export type QueryInvoicesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InvoiceStatus>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean']['output'];
};

export type UpdateInvoiceInput = {
  currency?: InputMaybe<Currency>;
  customerCity: Scalars['String']['input'];
  customerCountry: Scalars['String']['input'];
  customerEmail: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  customerStreet: Scalars['String']['input'];
  customerZip: Scalars['String']['input'];
  dueDate: Scalars['DateTime']['input'];
  issueDate: Scalars['DateTime']['input'];
  items: Array<InvoiceItemInput>;
  projectDescription: Scalars['String']['input'];
  vendorCity: Scalars['String']['input'];
  vendorCountry: Scalars['String']['input'];
  vendorStreet: Scalars['String']['input'];
  vendorZip: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessToken', accessToken: string } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Success', success: boolean } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number } };

export type InvoiceQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type InvoiceQuery = { __typename?: 'Query', invoice: { __typename?: 'Invoice', id: number, amount: number, currency: Currency, customerCity: string, customerCountry: string, customerEmail: string, customerName: string, customerStreet: string, customerZip: string, dueDate: string, issueDate: string, number: string, projectDescription: string, status: InvoiceStatus, vendorCity: string, vendorCountry: string, vendorStreet: string, vendorZip: string, items: Array<{ __typename?: 'InvoiceItem', id: number, description: string, pricePerUnit: number, quantity: number }> } };

export type InvoicesQueryVariables = Exact<{
  status?: InputMaybe<InvoiceStatus>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type InvoicesQuery = { __typename?: 'Query', invoices: { __typename?: 'Invoices', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'Invoice', id: number, number: string, status: InvoiceStatus, dueDate: string, customerName: string, amount: number, currency: Currency }> } };

export type CreateInvoiceMutationVariables = Exact<{
  input: CreateInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', createInvoice: { __typename?: 'Invoice', id: number } };

export type UpdateInvoiceMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateInvoiceInput;
}>;


export type UpdateInvoiceMutation = { __typename?: 'Mutation', updateInvoice: { __typename?: 'Invoice', id: number } };

export type DeleteInvoiceMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteInvoiceMutation = { __typename?: 'Mutation', deleteInvoice: { __typename?: 'Success', success: boolean } };

export type MarkInvoiceAsPaidMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  paid: Scalars['Boolean']['input'];
}>;


export type MarkInvoiceAsPaidMutation = { __typename?: 'Mutation', markAsPaid: { __typename?: 'Invoice', id: number } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const LoginDocument = new TypedDocumentString(`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
  }
}
    `) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = new TypedDocumentString(`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    success
  }
}
    `) as unknown as TypedDocumentString<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = new TypedDocumentString(`
    query me {
  me {
    id
  }
}
    `) as unknown as TypedDocumentString<MeQuery, MeQueryVariables>;
export const InvoiceDocument = new TypedDocumentString(`
    query invoice($id: Int!) {
  invoice(id: $id) {
    id
    amount
    currency
    customerCity
    customerCountry
    customerEmail
    customerName
    customerStreet
    customerZip
    dueDate
    issueDate
    items {
      id
      description
      pricePerUnit
      quantity
    }
    number
    projectDescription
    status
    vendorCity
    vendorCountry
    vendorStreet
    vendorZip
  }
}
    `) as unknown as TypedDocumentString<InvoiceQuery, InvoiceQueryVariables>;
export const InvoicesDocument = new TypedDocumentString(`
    query invoices($status: InvoiceStatus, $page: Int!, $pageSize: Int!) {
  invoices(status: $status, page: $page, pageSize: $pageSize) {
    data {
      id
      number
      status
      dueDate
      customerName
      amount
      currency
    }
    total
    page
    pageSize
  }
}
    `) as unknown as TypedDocumentString<InvoicesQuery, InvoicesQueryVariables>;
export const CreateInvoiceDocument = new TypedDocumentString(`
    mutation createInvoice($input: CreateInvoiceInput!) {
  createInvoice(input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const UpdateInvoiceDocument = new TypedDocumentString(`
    mutation updateInvoice($id: Int!, $input: UpdateInvoiceInput!) {
  updateInvoice(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;
export const DeleteInvoiceDocument = new TypedDocumentString(`
    mutation deleteInvoice($id: Int!) {
  deleteInvoice(id: $id) {
    success
  }
}
    `) as unknown as TypedDocumentString<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>;
export const MarkInvoiceAsPaidDocument = new TypedDocumentString(`
    mutation markInvoiceAsPaid($id: Int!, $paid: Boolean!) {
  markAsPaid(id: $id, paid: $paid) {
    id
  }
}
    `) as unknown as TypedDocumentString<MarkInvoiceAsPaidMutation, MarkInvoiceAsPaidMutationVariables>;
