import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://editorielle-fe-uat.vercel.app/",
    retries: {
      runMode: 2,
    },
  },
  video: false,
  screenshotOnRunFailure: false,
  watchForFileChanges: false,
  env: {
    MAILOSAUR_API_KEY: "X6GCxR3dSUFZO3QU9uTUOMKURM0xpqft",
    },
  defaultCommandTimeout: 60000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,

});