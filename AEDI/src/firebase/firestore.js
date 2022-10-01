import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";

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

export const deleteBeforeImgFile = async (menu, post_id) => {
  const docSnap = await getDoc(doc(db, menu, post_id));
  const filePath = docSnap.data().imgFilePath;
  const desertRef = ref(storage, filePath);
  await deleteObject(desertRef);
};

export const deleteRegacyFile = async (filePath) => {
  const desertRef = ref(storage, filePath);
  await deleteObject(desertRef);
};

export const deleteProjectAllFiles = async (
  imgPath,
  editorImgPath,
  filePath
) => {
  const delImgRef = ref(storage, imgPath);
  await deleteObject(delImgRef);

  if (editorImgPath.length > 0) {
    for (const index in editorImgPath) {
      const path = editorImgPath[index];
      const delEditorImgRef = ref(storage, path);
      await deleteObject(delEditorImgRef);
    }
  }

  if (filePath.length > 0) {
    for (const index in filePath) {
      const path = filePath[index];
      const delFileRef = ref(storage, path);
      await deleteObject(delFileRef);
    }
  }
};

export const deletePostEditorImg = async (editorImgPath) => {
  if (editorImgPath.length > 0) {
    for (const index in editorImgPath) {
      const path = editorImgPath[index];
      const delEditorImgRef = ref(storage, path);
      await deleteObject(delEditorImgRef);
    }
  }
};

export const deletePostImg = async (imgPath) => {
  const delImgRef = ref(storage, imgPath);
  await deleteObject(delImgRef);
};
