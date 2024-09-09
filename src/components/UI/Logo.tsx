import React from "react";
import Image from "next/image";
import LogoImage from "../../../public/logo.png";
function Logo() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <Image src={LogoImage} alt="CabiNest" width={120} height={120} />
      <p className="tracking-widest font-semibold text-green text-xl">
        CABINEST
      </p>
    </div>
  );
}

export default Logo;
