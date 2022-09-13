import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

// Upload File
export const uploadFile = (path, file) => {
  const storageRef = ref(storage, path);
  return uploadBytes(storageRef, file);
};

export const getUrl = (path) => {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
};
