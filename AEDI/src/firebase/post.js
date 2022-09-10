import {
  addDoc,
  serverTimestamp,
  collection,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
  getDoc,
  getDocs,
  endBefore,
  updateDoc,
  increment,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { onUnmounted, ref } from "vue";
import { db } from "./firebase";
import { user } from "./user";

const storage = getStorage();

// Create Post

// Notice
export const createNotice = async (title, description, name, admin) => {
  await addDoc(collection(db, "notices"), {
    title: title?.value,
    description: description?.value,
    uid: user?.value?.uid,
    name: name,
    admin: admin,
    timestamp: serverTimestamp(),
    views: 0,
  });
};

// Event
export const createEvent = async (
  title,
  startDate,
  endDate,
  description,
  name,
  admin
) => {
  await addDoc(collection(db, "events"), {
    title: title?.value,
    startDate: startDate?.value,
    endDate: endDate?.value,
    description: description?.value,
    uid: user?.value?.uid,
    name: name,
    admin: admin,
    timestamp: serverTimestamp(),
    views: 0,
  });
};

// Update Post

// Notices
export const updateNotice = async (
  title,
  description,
  name,
  admin,
  post_id
) => {
  await updateDoc(doc(db, "notices", post_id), {
    title: title?.value,
    description: description?.value,
    uid: user?.value?.uid,
    name: name,
    admin: admin,
  });
};

// Events
export const updateEvent = async (
  title,
  startDate,
  endDate,
  description,
  name,
  admin,
  post_id
) => {
  await updateDoc(doc(db, "events", post_id), {
    title: title?.value,
    startDate: startDate?.value,
    endDate: endDate?.value,
    description: description?.value,
    uid: user?.value?.uid,
    name: name,
    admin: admin,
  });
};

// Views Count
export const updateViewsCount = async (menu, post_id) => {
  await updateDoc(doc(db, menu, post_id), {
    views: increment(1),
  });
};

// Delete Post
export const deletePost = async (menu, post_id) => {
  await deleteDoc(doc(db, menu, post_id));
};

// Upload File
export const uploadFile = (path, file) => {
  const storageRef = ref(storage, path);
  return uploadBytes(storageRef, file);
};

export const getUrl = (path) => {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
};

// Loading PostList

// Notice

// 첫번째 post 컬렉션의 스냅샷을 작성날짜 기준 내림차순 (orderBy 2번째 인자 생략시 기본 내림차순)으로 정렬해 10개의 문서만 받아오기
const firstNoticesPosts = query(
  collection(db, "notices"),
  orderBy("timestamp"),
  limit(10)
);
let documentSnapshotsNotices = await getDocs(firstNoticesPosts);

// 마지막 문서 스냅샷 기억해두기 (쿼리결과 스냅샷 크기 - 1 = 마지막 문서 위치)
let lastVisibleNotices =
  documentSnapshotsNotices.docs[documentSnapshotsNotices.docs.length - 1];

// 앞서 기억해둔 문서값으로 새로운 쿼리 요청
let firstVisibleNotices;
export const nextNoticesPaging = async () => {
  const nextPosts = query(
    collection(db, "notices"),
    orderBy("timestamp"),
    startAfter(lastVisibleNotices),
    limit(10)
  );
  documentSnapshotsNotices = await getDocs(nextPosts);
  firstVisibleNotices = documentSnapshotsNotices.docs[0];
};

// 이전 스냅샷으로 변경
export const beforeNoticesPaging = async () => {
  const beforePosts = query(
    collection(db, "notices"),
    orderBy("timestamp"),
    endBefore(firstVisibleNotices),
    limit(10)
  );
  const beforeSnapshots = await getDocs(beforePosts);
  if (beforeSnapshots.length === 0) {
    console.log("첫페이지 입니다.");
  } else {
    documentSnapshotsNotices = await getDocs(beforePosts);
  }
};

export const pagingNoticesPost = () => documentSnapshotsNotices.docs;

// Event
const firstEventsPosts = query(
  collection(db, "events"),
  orderBy("timestamp"),
  limit(10)
);
let documentSnapshotsEvents = await getDocs(firstEventsPosts);

// 마지막 문서 스냅샷 기억해두기 (쿼리결과 스냅샷 크기 - 1 = 마지막 문서 위치)
let lastVisibleEvents =
  documentSnapshotsEvents.docs[documentSnapshotsEvents.docs.length - 1];

// 앞서 기억해둔 문서값으로 새로운 쿼리 요청
let firstVisibleEvents;
export const nextEventsPaging = async () => {
  const nextPosts = query(
    collection(db, "events"),
    orderBy("timestamp"),
    startAfter(lastVisibleEvents),
    limit(10)
  );
  documentSnapshotsEvents = await getDocs(nextPosts);
  firstVisibleEvents = documentSnapshotsEvents.docs[0];
};

// 이전 스냅샷으로 변경
export const beforeEventsPaging = async () => {
  const beforePosts = query(
    collection(db, "events"),
    orderBy("timestamp"),
    endBefore(firstVisibleEvents),
    limit(10)
  );
  const beforeSnapshots = await getDocs(beforePosts);
  if (beforeSnapshots.length === 0) {
    console.log("첫페이지 입니다.");
  } else {
    documentSnapshotsEvents = await getDocs(beforePosts);
  }
};

export const pagingEventsPost = () => documentSnapshotsEvents.docs;

// GetPost

export const onSnapshotPost = (menu, post_id) => {
  const post = ref();
  let unsub = () => {};
  unsub();
  unsub = onSnapshot(
    doc(db, menu, post_id),
    (doc) => (post.value = doc.data())
  );
  onUnmounted(() => unsub());

  return post;
};

export const onSnapshotPostContent = (menu, post_id) => {
  const post = ref();
  let unsub = () => {};
  unsub();
  unsub = onSnapshot(
    doc(db, menu, post_id),
    (doc) => (post.value = doc.data().description)
  );
  onUnmounted(() => unsub());

  return post;
};

export const getPost = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap;
};

export const getContent = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().description;
};

export const getTitle = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().title;
};

export const getStartDate = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().startDate;
};

export const getEndDate = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().endDate;
};
