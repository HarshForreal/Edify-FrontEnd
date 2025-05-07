import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
const SimplePage = () => {
  return (
    <div>
      simplePage
      <GoogleOAuthProvider clientId="566586261259-ljug55amp137b24l1hv9n9en4jegat94.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        ;{" "}
      </GoogleOAuthProvider>
    </div>
  );
};

export default SimplePage;
