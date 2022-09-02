import { doc, addDoc, serverTimestamp, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "./firebase";
import { user } from "./user";

const storage = getStorage();

export const createNotice = async (title, description) => {
  await addDoc(collection(db, "notices"), {
    title: title?.value,
    description: description.value,
    uid: user?.value?.uid,
    timestamp: serverTimestamp(),
    views: 0,
  });
};

export const uploadFile = (path, file) => {
  const storageRef = ref(storage, path);
  return uploadBytes(storageRef, file);
};

export const getUrl = (path) => {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
};
