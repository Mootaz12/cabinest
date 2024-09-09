import React from "react";

function FormErrorMessage({
  errorMessage,
}: {
  errorMessage: string | undefined;
}) {
  return <p className="text-red-500">{errorMessage}</p>;
}

export default FormErrorMessage;
