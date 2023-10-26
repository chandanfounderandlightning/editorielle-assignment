import {
  DefaultBodyType, MockedRequest, rest, RestHandler,
} from "msw";
import { apiMatcher } from "@/common/mockServiceWorker/handlers/apiMatcher";

const baseFetcherMockApi = '/baseFetcher';

export const typesOfRequests = [
  { method: 'POST' },
  { method: 'GET' },
  { method: 'PUT' },
];

export const definitionOfSuccessRequests = [
  { code: 201 },
  {
    code: 200,
    body: { test: 'test' },
  },
  {
    code: 200,
    body: 'test',
  },
  {
    code: 302,
    body: { test: 'test' },
  },
  {
    code: 302,
    body: 'test',
  },
];

export const definitionOfFailureRequests = [
  {
    code: 401,
    body: { error: { message: 'Unauthorized' } },
  },
  {
    code: 401,
    body: 'Unauthorized',
  },
  {
    code: 404,
    body: { error: { message: 'Not Found' } },
  },
  {
    code: 404,
    body: 'Not Found',
  },
  {
    code: 500,
    body: { error: { message: 'Internal Server Error' } },
  },
  {
    code: 500,
    body: 'Internal Server Error',
  },
];

export const baseFetcherHandlers: Array<RestHandler<MockedRequest<DefaultBodyType>>> = typesOfRequests.map(({ method }) => {
  return [...definitionOfSuccessRequests, ...definitionOfFailureRequests].map(({
    code, body,
  }) => {
    const isText = typeof body === 'string';
    const url = isText ? `${apiMatcher}${baseFetcherMockApi}/${code}Text` : `${apiMatcher}${baseFetcherMockApi}/${code}`;

    switch(method) {
    case 'POST':
      return rest.post(url, (req, res, ctx) => {
        return res(
          ctx.status(code),
          isText ? ctx.text(body) : ctx.json({ data: body }),
        );
      });
    case 'GET':
      return rest.get(url, (req, res, ctx) => {
        return res(
          ctx.status(code),
          isText ? ctx.text(body) : ctx.json({ data: body }),
        );
      });
    case 'PUT':
      return rest.put(url, (req, res, ctx) => {
        return res(
          ctx.status(code),
          isText ? ctx.text(body) : ctx.json({ data: body }),
        );
      });
    }
  });
}).flat() as Array<RestHandler<MockedRequest<DefaultBodyType>>>;

export const networkErrorBaseFetcherHandlers: Array<RestHandler<MockedRequest<DefaultBodyType>>> = typesOfRequests.map(({ method }) => {
  switch(method) {
  case 'POST':
    return rest.post(`${apiMatcher}${baseFetcherMockApi}/networkError`, (req, res) => {
      return res.networkError('Network error');
    });
  case 'GET':
    return rest.get(`${apiMatcher}${baseFetcherMockApi}/networkError`, (req, res) => {
      return res.networkError('Network error');
    });
  case 'PUT':
    return rest.put(`${apiMatcher}${baseFetcherMockApi}/networkError`, (req, res) => {
      return res.networkError('Network error');
    });
  }
}).flat() as Array<RestHandler<MockedRequest<DefaultBodyType>>>;
