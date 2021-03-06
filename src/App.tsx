import React, { useEffect, useState } from "react";
import PageLayout from "./components/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";
import ContainerTable from "./components/ContainerTable";
import { Alert, Snackbar } from "@mui/material";

const App: React.FC = () => {
  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>You are not signed in! Please sign in.</p>
        </div>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
};

function ProfileContent() {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState<string>("");
  const name = accounts[0] && accounts[0].name;

  const RequestAccessToken = () => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response: any) => {
        console.log("RESPONSE");
        console.log(response);
        setAccessToken(response.accessToken);
        setEmail(response.account.username);
      })
      .catch((e: any) => {
        instance.acquireTokenPopup(request).then((response: any) => {
          setAccessToken(response.accessToken);
        });
      });
  };

  //Request an Access token on loac
  useEffect(() => {
    RequestAccessToken();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "5vw",
      }}
      className="ProfileContent"
    >
      {/* <h5 className="card-title">Welcome {name}</h5> */}
      {accessToken ? (
        <>
          {/* <p>Access Token Acquired!</p> */}
          {/* <div> */}
          {/* <Button variant="secondary" onClick={RequestAccessToken}>
            Request Access Token
          </Button> */}
          {/* <ContainerTable email={email} openToast={setShowToast} /> */}
          {/* </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* <Button variant="secondary" onClick={RequestAccessToken}>
            Request Access Token
          </Button> */}
            <ContainerTable email={email} openToast={setShowToast} />
            <Snackbar
              open={showToast}
              autoHideDuration={6000}
              onClose={() => setShowToast(false)}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
              <Alert severity="success">
                Successfully subscribed to image notifications!
              </Alert>
            </Snackbar>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* <Button variant="secondary" onClick={RequestAccessToken}>
            Request Access Token
          </Button> */}
        </div>
      )}
    </div>
  );
}

export default App;
