import React from "react";

import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import SignInForm from "@/components/Forms/SignInForm";
import Logo from "@/components/UI/Logo";

function SignInPage() {
  return (
    <div className="flex flex-col gap-4">
      <Logo />
      <React.Fragment>
        <h1 className="text-center text-4xl font-semibold mb-5">
          Log in to your account
        </h1>
        <ReactQueryProvider>
          <SignInForm />
        </ReactQueryProvider>
      </React.Fragment>
    </div>
  );
}

export default SignInPage;
