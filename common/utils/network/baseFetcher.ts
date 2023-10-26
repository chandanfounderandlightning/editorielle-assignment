import {
  FetcherError, handleResponse,
} from "@/common/utils/network/responseHandler";
import { FetcherResponse } from "swr/_internal";

const baseHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const isFetcherError = (error: any): error is FetcherError => {
  return error?.cause?.url !== undefined;
}

export type AuthorizedHeaders = {
  Authorization: string;
} & HeadersInit

export async function fetcher<Headers extends HeadersInit = Record<string, never>, Body = Record<string, never>> (
  url: string,
  options: Readonly<{arg: {body?: Body, headers?: Headers, method: string, otherFetchOptions?: any}}>,
): Promise<FetcherResponse> {

  const { arg } = options;
  const {
    method, headers, body,
  } = arg;
  try{
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      ...arg.otherFetchOptions,
      headers: {
        ...baseHeaders,
        ...headers,
      },
    });

    return await handleResponse(response);
  } catch (error) {
    if(isFetcherError(error)) {
      throw error;
    }
    throw new Error('Fetch error', { cause: error });
  }
}

export async function authorizedFetcher<Headers extends AuthorizedHeaders, Body = Record<string, never>> (
  url: string,
  options: Readonly<{arg: {body?: Body, headers: Headers, method: string, otherFetchOptions?: any}}>,
): Promise<FetcherResponse> {

  const { arg } = options;
  const {
    method, headers,
  } = arg;
  try{
    const response = await fetch(url, {
      method,
      ...arg.otherFetchOptions,
      headers: {
        ...baseHeaders,
        ...headers,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    if(isFetcherError(error)) {
      throw error;
    }
    throw new Error('Fetch error', { cause: error });
  }
}

