enum RESPONSE_BODY_TYPE {
  JSON = 'json',
  TEXT = 'text',
}

export interface FetcherError extends Error {
  cause: {
    statusCode: number;
    statusText: string;
    url: string;
    body: any;
  }
}

export async function handleResponse (response: Response) {
  if (response.status >= 400) {
    await handleNotOk(response);
  }
  const responseDataType = response.headers.get('Content-Type')?.includes('application/json') ? RESPONSE_BODY_TYPE.JSON : RESPONSE_BODY_TYPE.TEXT;
  const responseReturnData = !!response?.body && responseDataType === RESPONSE_BODY_TYPE.JSON ? await response.json() : await response.text();

  return {
    code: response.status,
    response: responseReturnData,
  };
}

export async function handleNotOk (response: Response) {
  const responseDataType = response?.headers.get('Content-Type')?.includes('application/json') ? RESPONSE_BODY_TYPE.JSON : RESPONSE_BODY_TYPE.TEXT;
  const body = responseDataType === RESPONSE_BODY_TYPE.JSON ? await response.json() : await response.text();
  const errorObject = {
    statusCode: response?.status,
    statusText: body.message,
    url: response?.url,
    body,
  };
  throw new Error(errorObject.statusText, { cause: errorObject }) as FetcherError;
}
