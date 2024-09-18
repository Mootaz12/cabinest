import CreateUserForm from "@/components/user/CreateUserForm";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import React from "react";

function UsersPage() {
  return (
    <>
      <h2 className="text-4xl font-semibold">Create a new user</h2>
      <ReactQueryProvider>
        <CreateUserForm />
      </ReactQueryProvider>
    </>
  );
}

export default UsersPage;
