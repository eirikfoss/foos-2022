import React, { useState } from "react";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import AvatarEditor from "react-avatar-editor";
import "react-html5-camera-photo/build/css/index.css";
import "./_camera.scss";

import ImagePreview from "./ImagePreview";

const CameraComp = () => {
  const [dataUri, setDataUri] = useState("");

  function handleTakePhotoAnimationDone(dataUri) {
    console.log(dataUri);
    setDataUri(dataUri);
  }

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }

  const isFullscreen = false;

  return (
    <div>
      {dataUri ? (
        <AvatarEditor
          image={dataUri}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
        />
      ) : (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
          imageType={IMAGE_TYPES.JPG}
          sizeFactor={0.1}
        />
      )}
    </div>
  );
};

export default CameraComp;
