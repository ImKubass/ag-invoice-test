import {
	queryOptions,
	type UseMutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import type { GraphQLError } from "./errors.js";
import { fetcher } from "./fetcher.js";
import {
	CreateInvoiceDocument,
	type CreateInvoiceMutation,
	type CreateInvoiceMutationVariables,
	DeleteInvoiceDocument,
	type DeleteInvoiceMutation,
	type DeleteInvoiceMutationVariables,
	InvoiceDocument,
	type InvoiceQueryVariables,
	InvoicesDocument,
	LoginDocument,
	type LoginMutation,
	type LoginMutationVariables,
	MarkInvoiceAsPaidDocument,
	type MarkInvoiceAsPaidMutation,
	type MarkInvoiceAsPaidMutationVariables,
	MeDocument,
	RegisterDocument,
	type RegisterMutation,
	type RegisterMutationVariables,
	UpdateInvoiceDocument,
	type UpdateInvoiceMutation,
	type UpdateInvoiceMutationVariables,
} from "./sdk.gen.js";

const queriesKeyFactory = {
	me: () => ["me"],
	invoices: {
		all: () => ["invoices"],
		list: () => [queriesKeyFactory.invoices.all(), "list"],
		details: () => [queriesKeyFactory.invoices.all(), "detail"],
		detail: (variables: InvoiceQueryVariables) => [
			queriesKeyFactory.invoices.details(),
			variables,
		],
	},
};

export const api = {
	meQueryOptions: () => {
		return queryOptions({
			queryKey: queriesKeyFactory.me(),
			queryFn: fetcher(MeDocument),
		});
	},
	useLoginMutation: (
		options?: UseMutationOptions<
			LoginMutation,
			GraphQLError,
			LoginMutationVariables
		>,
	) => {
		return useMutation<LoginMutation, GraphQLError, LoginMutationVariables>({
			...options,
			mutationFn: (variables) => fetcher(LoginDocument, variables)(),
		});
	},
	useRegisterMutation: (
		options?: UseMutationOptions<
			RegisterMutation,
			GraphQLError,
			RegisterMutationVariables
		>,
	) => {
		return useMutation<
			RegisterMutation,
			GraphQLError,
			RegisterMutationVariables
		>({
			...options,
			mutationFn: (variables) => fetcher(RegisterDocument, variables)(),
		});
	},
	invoiceQueryOptions: (variables: InvoiceQueryVariables) => {
		return queryOptions({
			queryKey: queriesKeyFactory.invoices.detail(variables),
			queryFn: fetcher(InvoiceDocument, variables),
		});
	},
	invoicesQueryOptions: () => {
		return queryOptions({
			queryKey: queriesKeyFactory.invoices.list(),
			queryFn: fetcher(InvoicesDocument),
		});
	},
	createInvoiceMutation: (
		options?: UseMutationOptions<
			CreateInvoiceMutation,
			GraphQLError,
			CreateInvoiceMutationVariables
		>,
	) => {
		const queryClient = useQueryClient();

		return useMutation<
			CreateInvoiceMutation,
			GraphQLError,
			CreateInvoiceMutationVariables
		>({
			...options,
			mutationFn: (variables) => fetcher(CreateInvoiceDocument, variables)(),
			onSuccess: (...params) => {
				queryClient.invalidateQueries({
					queryKey: queriesKeyFactory.invoices.list(),
				});

				options?.onSuccess?.(...params);
			},
		});
	},
	updateInvoiceMutation: (
		options?: UseMutationOptions<
			UpdateInvoiceMutation,
			GraphQLError,
			UpdateInvoiceMutationVariables
		>,
	) => {
		const queryClient = useQueryClient();

		return useMutation<
			UpdateInvoiceMutation,
			GraphQLError,
			UpdateInvoiceMutationVariables
		>({
			...options,
			mutationFn: (variables) => fetcher(UpdateInvoiceDocument, variables)(),
			onSuccess: (data, variables, onMutateResult, context) => {
				queryClient.invalidateQueries({
					queryKey: queriesKeyFactory.invoices.list(),
				});
				queryClient.invalidateQueries({
					queryKey: queriesKeyFactory.invoices.detail({
						id: data.updateInvoice.id,
					}),
				});

				options?.onSuccess?.(data, variables, onMutateResult, context);
			},
		});
	},
	deleteInvoiceMutation: (
		options?: UseMutationOptions<
			DeleteInvoiceMutation,
			GraphQLError,
			DeleteInvoiceMutationVariables
		>,
	) => {
		const queryClient = useQueryClient();

		return useMutation<
			DeleteInvoiceMutation,
			GraphQLError,
			DeleteInvoiceMutationVariables
		>({
			...options,
			mutationFn: (variables) => fetcher(DeleteInvoiceDocument, variables)(),
			onSuccess: (data, variables, onMutateResult, context) => {
				queryClient.invalidateQueries({
					queryKey: queriesKeyFactory.invoices.list(),
				});
				queryClient.removeQueries({
					queryKey: queriesKeyFactory.invoices.detail({
						id: variables.id,
					}),
				});

				options?.onSuccess?.(data, variables, onMutateResult, context);
			},
		});
	},
	markInvoiceAsPaidMutation: (
		options?: UseMutationOptions<
			MarkInvoiceAsPaidMutation,
			GraphQLError,
			MarkInvoiceAsPaidMutationVariables
		>,
	) => {
		const queryClient = useQueryClient();

		return useMutation<
			MarkInvoiceAsPaidMutation,
			GraphQLError,
			MarkInvoiceAsPaidMutationVariables
		>({
			...options,
			mutationFn: (variables) =>
				fetcher(MarkInvoiceAsPaidDocument, variables)(),
			onSuccess: (data, variables, onMutateResult, context) => {
				queryClient.invalidateQueries({
					queryKey: queriesKeyFactory.invoices.list(),
				});
				queryClient.invalidateQueries({
					queryKey: queriesKeyFactory.invoices.detail({
						id: variables.id,
					}),
				});

				options?.onSuccess?.(data, variables, onMutateResult, context);
			},
		});
	},
};
