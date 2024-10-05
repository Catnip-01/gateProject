import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function LoginButton() {
  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;

    console.log("token : " + token);

    // Decode JWT token to get user info
    const userInfo = JSON.parse(atob(token.split(".")[1]));

    console.log(userInfo); // Logs the entire user info, including email and name if available
    console.log("Email:", userInfo.email);
    console.log("name:", userInfo.name);
    console.log("pic:", userInfo.picture); // Logs the user's email
  };

  const handleError = () => {
    console.log("Login failed!");
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="999607107513-edlbrsl54f1mbqgtodf8pda95qrip25e.apps.googleusercontent.com">
        <GoogleLogin
          theme="filled_black" // Dark-themed button
          onSuccess={handleSuccess}
          onError={handleError}
          scope="profile email" // Request profile and email scopes
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default LoginButton;
