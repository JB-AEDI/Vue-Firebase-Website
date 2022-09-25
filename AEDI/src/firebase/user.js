import { onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import { ref, onUnmounted, watch } from "vue";
import { db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";

export const user = ref(null);
export const auth = getAuth();

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
  updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: "https://picsum.photos/250/250",
  });
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Verification email sent.
      console.log("이메일 전송");
    })
    .catch((error) => {
      // Error occurred. Inspect error.code.
      console.log(error);
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

/**
 * 사용자 프로필 업데이트
 * @param {Promise<string>} photoURL user photo
 * @param {Promise<string>} displayName user name
 * @param {Promise<string>} email user email
 */
export const updateUserProfile = (photoURL, displayName, email) => {
  updateProfile(auth.currentUser, {
    photoURL: photoURL?.value,
    displayName: displayName?.value,
    email: email?.value,
  });
};

export const sendEmailVerify = () => {
  sendEmailVerification(auth.currentUser);
};

export const sendEmailPasswordReset = () => {
  sendPasswordResetEmail(auth, user?.value?.email);
};

export const btnDeleteUser = () => {
  deleteUser(auth.currentUser);
};
