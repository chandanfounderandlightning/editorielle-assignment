import { accountHandlers } from "@/common/mockServiceWorker/handlers/account";
import {
  baseFetcherHandlers, networkErrorBaseFetcherHandlers,
} from "@/common/mockServiceWorker/handlers/baseFetcher";
import {
  DefaultBodyType, MockedRequest, RestHandler,
} from "msw";

export const handlers: Array<RestHandler<MockedRequest<DefaultBodyType>>> = [
  ...accountHandlers,
  ...baseFetcherHandlers,
  ...networkErrorBaseFetcherHandlers,
];
