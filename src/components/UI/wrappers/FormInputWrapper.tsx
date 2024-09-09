import React from "react";

function FormInputWrapper({ children }: any) {
  return (
    <div className="w-2/3 py-4 flex flex-row justify-between items-center">
      {children}
    </div>
  );
}

export default FormInputWrapper;
