import CreateUserForm from "@/components/Forms/CreateUserForm";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
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
