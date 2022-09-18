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
  where,
} from "firebase/firestore";
import { onUnmounted, ref } from "vue";
import { db } from "./firebase";
import { user } from "./user";

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

// Graduation
export const createGraduation = async (
  title,
  year,
  university,
  department,
  img,
  url
) => {
  await addDoc(collection(db, "graduations"), {
    title: title?.value,
    year: year?.value,
    university: university?.value,
    department: department?.value,
    img: img?.value,
    url: url?.value,
    views: 0,
    likes: 0,
    projects: 0,
    timestamp: serverTimestamp(),
  });
};

export const createGraduationProject = async (
  title,
  name,
  description,
  img,
  post_id
) => {
  await addDoc(collection(db, "graduations", post_id, "projects"), {
    title: title?.value,
    name: name,
    description: description?.value,
    img: img?.value,
    uid: user?.value?.uid,
    views: 0,
    likes: 0,
    projects: 0,
    timestamp: serverTimestamp(),
  });
  await updateDoc(doc(db, "graduations", post_id), {
    projects: increment(1),
  });
};

// 졸업작품 좋아요

const createGraduationLike = async (post_id) => {
  await addDoc(collection(db, "graduations", post_id, "likes"), {
    uid: user?.value?.uid,
  });
};

const deleteGraduationLike = async (post_id, like_id) => {
  await deleteDoc(doc(db, `graduations/${post_id}/likes/${like_id}`));
};

export const pushGraduationLike = async (post_id) => {
  const likesRef = collection(db, "graduations", post_id, "likes");
  const q = query(likesRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) {
    createGraduationLike(post_id);
    await updateDoc(doc(db, "graduations", post_id), {
      likes: increment(1),
    });
    return;
  }
  if (querySnapshot.docs[0].data().uid === user?.value?.uid) {
    deleteGraduationLike(post_id, querySnapshot.docs[0].id);
    await updateDoc(doc(db, "graduations", post_id), {
      likes: increment(-1),
    });
    return;
  }
};

// 졸업작품 프로젝트 좋아요
const createGraduationProjectLike = async (post_id, project_id) => {
  await addDoc(
    collection(db, "graduations", post_id, "projects", project_id, "likes"),
    {
      uid: user?.value?.uid,
    }
  );
};

const deleteGraduationProjectLike = async (post_id, project_id, like_id) => {
  await deleteDoc(
    doc(db, `graduations/${post_id}/projects/${project_id}/likes/${like_id}`)
  );
};

export const pushGraduationProjectLike = async (post_id, project_id) => {
  if (!user || !user?.value?.uid) {
    return;
  }
  const likesRef = collection(
    db,
    "graduations",
    post_id,
    "projects",
    project_id,
    "likes"
  );
  const q = query(likesRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) {
    createGraduationProjectLike(post_id, project_id);
    await updateDoc(doc(db, "graduations", post_id, "projects", project_id), {
      likes: increment(1),
    });
    return;
  }
  if (querySnapshot.docs[0].data().uid === user?.value?.uid) {
    deleteGraduationProjectLike(post_id, project_id, querySnapshot.docs[0].id);
    await updateDoc(doc(db, "graduations", post_id, "projects", project_id), {
      likes: increment(-1),
    });
    return;
  }
};

// 졸업작품 프로젝트 평가 추가
export const createGraduationProjectReview = async (
  post_id,
  project_id,
  perfection,
  creativity,
  technicality,
  business,
  design
) => {
  await addDoc(
    collection(db, "graduations", post_id, "projects", project_id, "reviews"),
    {
      uid: user?.value?.uid,
      perfection: perfection,
      creativity: creativity,
      technicality: technicality,
      business: business,
      design: design,
    }
  );
};

// 졸업작품 프로젝트 평가 - 유무확인
export const checkGraduationProjectReview = async (post_id, project_id) => {
  const reviewRef = collection(
    db,
    "graduations",
    post_id,
    "projects",
    project_id,
    "reviews"
  );
  const q = query(reviewRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs[0]?.data().uid === user?.value?.uid) {
    return true;
  } else {
    return false;
  }
};

// 내가 작성한 졸업작품 프로젝트 평가 - 가져오기
export const getMyGraduationProjectReview = async (post_id, project_id) => {
  const reviewRef = collection(
    db,
    "graduations",
    post_id,
    "projects",
    project_id,
    "reviews"
  );
  const q = query(reviewRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs[0]?.data().uid === user?.value?.uid) {
    return querySnapshot.docs[0].data();
  }
};

// 내가 작성한 졸업작품 프로젝트 평가 - 삭제
export const deleteMyGraduationProjectReview = async (post_id, project_id) => {
  const reviewRef = collection(
    db,
    "graduations",
    post_id,
    "projects",
    project_id,
    "reviews"
  );
  const q = query(reviewRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs[0]?.data().uid === user?.value?.uid) {
    await deleteDoc(
      doc(
        db,
        "graduations",
        post_id,
        "projects",
        project_id,
        "reviews",
        querySnapshot.docs[0].id
      )
    );
  }
};

// 졸업작품 프로젝트 평가 - 실시간 가져오기
export const onSnapshotGraduationProjectReviews = (post_id, project_id) => {
  const perfectionSum = ref(0);
  const creativitySum = ref(0);
  const technicalitySum = ref(0);
  const businessSum = ref(0);
  const designSum = ref(0);

  let unsub = () => {};
  unsub();
  unsub = onSnapshot(
    collection(db, "graduations", post_id, "projects", project_id, "reviews"),
    (snapshot) => {
      // perfection
      const perfectionArray = [];
      snapshot.forEach((doc) => {
        perfectionArray.push(Number(doc.data().perfection));
      });
      perfectionArray.forEach((value) => {
        perfectionSum.value += value;
      });
      // creativity
      const creativityArray = [];
      snapshot.forEach((doc) => {
        creativityArray.push(Number(doc.data().creativity));
      });
      creativityArray.forEach((value) => {
        creativitySum.value += value;
      });
      // technicality
      const technicalityArray = [];
      snapshot.forEach((doc) => {
        technicalityArray.push(Number(doc.data().technicality));
      });
      technicalityArray.forEach((value) => {
        technicalitySum.value += value;
      });
      // business
      const businessArray = [];
      snapshot.forEach((doc) => {
        businessArray.push(Number(doc.data().business));
      });
      businessArray.forEach((value) => {
        businessSum.value += value;
      });
      // design
      const designArray = [];
      snapshot.forEach((doc) => {
        designArray.push(Number(doc.data().design));
      });
      designArray.forEach((value) => {
        designSum.value += value;
      });
    }
  );
  onUnmounted(() => unsub());

  return {
    perfectionSum,
    creativitySum,
    technicalitySum,
    businessSum,
    designSum,
  };
};

// 졸업작품 프로젝트 댓글 - 추가
export const createGraduationProjectComment = async (
  post_id,
  project_id,
  rating,
  comment,
  name
) => {
  await addDoc(
    collection(db, "graduations", post_id, "projects", project_id, "comments"),
    {
      uid: user?.value?.uid,
      rating: rating.value,
      comment: comment.value,
      name: name,
    }
  );
};

// 졸업작품 프로젝트 댓글 - 유무확인
export const checkGraduationProjectComments = async (post_id, project_id) => {
  const commentsRef = collection(
    db,
    "graduations",
    post_id,
    "projects",
    project_id,
    "comments"
  );
  const q = query(commentsRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs[0]?.data().uid === user?.value?.uid) {
    return true;
  } else {
    return false;
  }
};

// 졸업작품 프로젝트 댓글 - 가져오기
export const onSnapshotGraduationProjectComments = (post_id, project_id) => {
  const comments = ref([]);
  let unsub = () => {};
  unsub();
  const commentsRef = collection(
    db,
    "graduations",
    post_id,
    "projects",
    project_id,
    "comments"
  );
  const q = query(commentsRef, orderBy("timestamp"));
  unsub = onSnapshot(q, (snapshot) => {
    comments.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(() => unsub());

  return comments;
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

// Graduations
export const updateGraduation = async (
  title,
  year,
  university,
  department,
  img,
  url,
  post_id
) => {
  await updateDoc(doc(db, "graduations", post_id), {
    title: title?.value,
    year: year?.value,
    university: university?.value,
    department: department?.value,
    img: img?.value,
    url: url?.value,
  });
};

// Views Count
export const updateViewsCount = async (menu, post_id) => {
  await updateDoc(doc(db, menu, post_id), {
    views: increment(1),
  });
};

export const updateViewsProjectCount = async (menu, post_id, project_id) => {
  await updateDoc(doc(db, menu, post_id, "projects", project_id), {
    views: increment(1),
  });
};

// Delete Post
export const deletePost = async (menu, post_id) => {
  await deleteDoc(doc(db, menu, post_id));
};

// Loading PostList

// Notice

// 첫번째 post 컬렉션의 스냅샷을 작성날짜 기준 내림차순 (orderBy 2번째 인자 생략시 기본 내림차순)으로 정렬해 10개의 문서만 받아오기
const firstNoticesPosts = query(
  collection(db, "notices"),
  orderBy("timestamp"),
  limit(10)
);

let documentSnapshotsNotices;
let firstVisibleNotices;

export const setFirstNoticesPage = async () => {
  documentSnapshotsNotices = await getDocs(firstNoticesPosts);
};

// 앞서 기억해둔 문서값으로 새로운 쿼리 요청
export const nextNoticesPaging = async () => {
  // 마지막 문서 스냅샷 기억해두기 (쿼리결과 스냅샷 크기 - 1 = 마지막 문서 위치)
  const lastVisibleNotices =
    documentSnapshotsNotices.docs[documentSnapshotsNotices.docs.length - 1];

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

export const pagingNoticesPost = () => documentSnapshotsNotices?.docs;

// Event
const firstEventsPosts = query(
  collection(db, "events"),
  orderBy("timestamp"),
  limit(10)
);

// 앞서 기억해둔 문서값으로 새로운 쿼리 요청
let documentSnapshotsEvents;
let firstVisibleEvents;

export const setFirstEventsPage = async () => {
  documentSnapshotsEvents = await getDocs(firstEventsPosts);
};

export const nextEventsPaging = async () => {
  documentSnapshotsEvents = await getDocs(firstEventsPosts);
  // 마지막 문서 스냅샷 기억해두기 (쿼리결과 스냅샷 크기 - 1 = 마지막 문서 위치)
  const lastVisibleEvents =
    documentSnapshotsEvents.docs[documentSnapshotsEvents.docs.length - 1];
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

export const pagingEventsPost = () => documentSnapshotsEvents?.docs;

// Graduation
const graduationsPosts = query(
  collection(db, "graduations"),
  orderBy("timestamp")
);

let documentSnapshotsGraduations;
export const setFirstGraduationsPage = async () => {
  documentSnapshotsGraduations = await getDocs(graduationsPosts);
};

export const pagingGraduationsPost = () => documentSnapshotsGraduations.docs;

export const onSnapshotGraduationProjects = (post_id) => {
  const projects = ref([]);
  let unsub = () => {};
  unsub();
  unsub = onSnapshot(
    collection(db, "graduations", post_id, "projects"),
    (snapshot) => {
      projects.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
  );
  onUnmounted(() => unsub());

  return projects;
};

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

export const onSnapshotProject = (menu, post_id, project_id) => {
  const project = ref();
  let unsub = () => {};
  unsub();
  unsub = onSnapshot(
    doc(db, menu, post_id, "projects", project_id),
    (doc) => (project.value = doc.data())
  );
  onUnmounted(() => unsub());

  return project;
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

export const getYear = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().year;
};

export const getUniversity = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().university;
};

export const getDepartment = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().department;
};

export const getImg = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().img;
};

export const getPostUrl = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().url;
};
