import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { useState } from "react";
import { dataBase, storage } from "../../Firebase/FirebaseConfig";
import useUsersContext from "../../context/useUsersContext";
import { useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";

export default function PictureUploadField() {
  const [file, setFile] = useState(null);

  const [progress, setProgress] = useState(null);

  const { currentUser } = useUsersContext();
  const fileInputRef = useRef();

  const updateProfilePicture = async () => {
    if (!file) return;

    const storageRef = ref(storage, currentUser.uid);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setProgress(null);

          updateDoc(doc(dataBase, "users", currentUser.uid), {
            profilePic: downloadURL,
          })
            .then(() => clearInput())
            .catch((error) => console.log(error));
        });
      }
    );
  };

  const clearInput = () => {
    if (fileInputRef && fileInputRef.current) fileInputRef.current.value = null;
    setFile(null);
  };

  return (
    <div className="w-[400px] flex h-[60px]  m-5">
      <input
        ref={fileInputRef}
        hidden={"hidden"}
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
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
