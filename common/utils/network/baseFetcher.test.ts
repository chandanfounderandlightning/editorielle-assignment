/** @jest-environment node */
import {
  authorizedFetcher, fetcher,
} from "@/common/utils/network/baseFetcher";
import {
  definitionOfFailureRequests,
  definitionOfSuccessRequests,
  typesOfRequests,
} from "@/common/mockServiceWorker/handlers/baseFetcher";

const getGivenValues = (code: number, body: any) => {
  const isText = typeof body === 'string';
  const url = isText ? `https://test.env/api/baseFetcher/${code}Text` : `https://test.env/api/baseFetcher/${code}`;
  const expectedCode = code;
  const expectedBody = body;
  return {
    isText,
    url,
    expectedCode,
    expectedBody,
  };
}

describe('baseFetcher', () => {
  describe.each(definitionOfSuccessRequests)('success', ({
    code, body,
  }) => {
    describe.each(typesOfRequests)(`for method $method`, ({ method }) => {
      it(`should return body ${JSON.stringify(body)} and code ${code}`, async () => {
        // given
        const {
          isText, url, expectedCode, expectedBody,
        } = getGivenValues(code, body);

        // when
        const result: any = await fetcher(url, { arg: { method } })

        // then
        expect(result.code).toEqual(expectedCode);
        expect(isText ? result.response : result.response.data).toEqual(expectedBody);
      });
    });
  });

  describe.each(definitionOfFailureRequests)('failure', ({
    code, body,
  }) => {
    describe.each(typesOfRequests)(`for method $method`, ({ method }) => {
      it(`should return body ${JSON.stringify(body)} and code ${code}`, async () => {
        // given
        const {
          url, expectedCode,
        } = getGivenValues(code, body);

        // when
        try{
          await fetcher(url, { arg: { method } });
        } catch(error: any) {

          // then
          await expect(error.cause.statusCode).toEqual(expectedCode);
        }
      });
    });
  });

  describe('network error', () => {
    describe.each(typesOfRequests)(`for method $method`, ({ method }) => {
      it(`should return handle network error`, async () => {
        // given
        const url = `http://localhost/api/baseFetcher/networkError`;

        // when
        try{
          await fetcher(url, { arg: {
            method,
            headers: { Authorization: `Bearer someWeirdToken` },
          } });
        } catch(error: any) {
          // then
          expect(error.message).toBe('Fetch error');
        }
      });
    });
  });
});

describe('baseFetcherAuthorized', () => {
  describe.each(definitionOfSuccessRequests)('success', ({
    code, body,
  }) => {
    describe.each(typesOfRequests)(`for method $method`, ({ method }) => {
      it(`should return body ${JSON.stringify(body)} and code ${code}`, async () => {
        // given
        const {
          isText, url, expectedCode, expectedBody,
        } = getGivenValues(code, body);

        // when
        const result: any = await authorizedFetcher(url, { arg: {
          method,
          headers: { Authorization: `Bearer someWeirdToken` },
        } });

        // then
        expect(result.code).toEqual(expectedCode);
        expect(isText ? result.response : result.response.data).toEqual(expectedBody);
      });
    });
  });

  describe.each(definitionOfFailureRequests)('failure', ({
    code, body,
  }) => {
    describe.each(typesOfRequests)(`for method $method`, ({ method }) => {
      it(`should return body ${JSON.stringify(body)} and code ${code}`, async () => {
        // given
        const {
          url, expectedCode,
        } = getGivenValues(code, body);

        // when
        try{
          await authorizedFetcher(url, { arg: {
            method,
            headers: { Authorization: `Bearer someWeirdToken` },
          } });
        } catch(error: any) {

          // then
          expect(error.cause.statusCode).toEqual(expectedCode);
        }
      });
    });
  });

  describe('network error', () => {
    describe.each(typesOfRequests)(`for method $method`, ({ method }) => {
      it(`should return handle network error`, async () => {
        // given
        const url = `http://localhost/api/baseFetcher/networkError`;

        // when
        try{
          await authorizedFetcher(url, { arg: {
            method,
            headers: { Authorization: `Bearer someWeirdToken` },
          } });
        } catch(error: any) {
        // then
          expect(error.message).toBe('Fetch error');
        }
      });
    });
  });
})
