import React from "react";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import UpdateUserDataForm from "@/components/Forms/UpdateUserDataForm";

function UserPage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  return (
    <>
      <h2 className="text-4xl font-semibold text-darkBlue">
        Update your account
      </h2>
      <h3 className="text-2xl font-semibold text-darkBlue">Update user data</h3>
      <ReactQueryProvider>
        <UpdateUserDataForm userId={userId} />
      </ReactQueryProvider>
    </>
  );
}

export default UserPage;
