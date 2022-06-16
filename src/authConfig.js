export const msalConfig = {
  auth: {
    clientId: "9b171a55-469e-4ba0-ba56-6c198113d6f3",
    authority:
      "https://login.microsoftonline.com/693c33f4-6ceb-41a2-859f-1d0b04676b18",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me",
};
