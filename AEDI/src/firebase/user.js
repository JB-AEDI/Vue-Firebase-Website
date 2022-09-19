import { onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import { ref, onUnmounted, watch } from "vue";
import { db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const user = ref(null);

const auth = getAuth();
onAuthStateChanged(auth, (data) => {
  if (data) {
    user.value = data;
  } else {
    user.value = null;
  }
});

export const createUser = async (email, password, name) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "profiles", result.user.uid), {
    name: name,
    admin: false,
  });
};

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  await signOut(auth);
};

export const useUserProfile = () => {
  const userProfile = ref({});
  let unsub = () => {};
  watch(user, (user) => {
    if (!user || !user.uid) {
      return;
    }
    unsub();
    unsub = onSnapshot(
      doc(db, "profiles", user?.uid),
      (doc) => (userProfile.value = doc.data())
    );
  });

  onUnmounted(unsub);
  return userProfile;
};

export const getUserProfile = async () => {
  const docRef = doc(db, "profiles", user?.value?.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    // console.log("No such document!");
  }
};
