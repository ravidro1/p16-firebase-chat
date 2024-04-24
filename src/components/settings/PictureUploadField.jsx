import React, { useRef, useState } from "react";
import useChatContext from "../../context/useChatContext";
import useUsersContext from "../../context/useUsersContext";

export default function PictureUploadField() {
  const [file, setFile] = useState(null);

  const [progress, setProgress] = useState(null);

  const { uploadImageToStorage } = useChatContext();
  const { currentUser, updateUser } = useUsersContext();

  const fileInputRef = useRef();

  const updateProfilePicture = async () => {
    try {
      if (!file) return;

      const imageUrl = await uploadImageToStorage(
        file,
        currentUser.uid,
        setProgress
      );

      await updateUser(currentUser.uid, {
        profilePic: imageUrl,
      });
      clearInput();
    } catch (error) {
      error.log(error);
    }
  };

  const clearInput = () => {
    if (fileInputRef && fileInputRef.current) fileInputRef.current.value = null;
    setFile(null);
  };

  return (
    <div className="w-[400px] flex xl:h-[60px] h-[45px] xl:m-5 m-3">
      <input
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        accept="image/png, image/jpeg"
      />
      <button
        onClick={clearInput}
        className="w-[10%] bg-[#1C2B2D] rounded-l-lg"
      >
        {" "}
        X{" "}
      </button>
      <button
        onClick={() => fileInputRef.current.click()}
        className="p-2 bg-teal-700 w-[60%] overflow-hidden overflow-ellipsis"
      >
        {progress
          ? Math.round(progress) + "%"
          : file
            ? file.name
            : "Choose File"}
      </button>
      <button
        className="bg-[#1C2B2D] p-2 rounded-r-lg w-[30%]"
        onClick={updateProfilePicture}
      >
        {" "}
        Upload Picture
      </button>
    </div>
  );
}
