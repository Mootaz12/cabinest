import React from "react";
import Image from "next/image";

function ImagePreview({ imagePreview }: { imagePreview: string }) {
  if (imagePreview)
    return (
      <Image src={imagePreview} width={200} height={200} alt="image preview" />
    );
}

export default ImagePreview;
