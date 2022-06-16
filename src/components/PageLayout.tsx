import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
const PageLayout: React.FC<any> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar
        bg="primary"
        variant="dark"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <a className="navbar-brand" href="/">
          Alpha 2022
        </a>
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </Navbar>
      <br />
      {children}
    </div>
  );
};

export default PageLayout;
