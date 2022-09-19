import {
  addDoc,
  serverTimestamp,
  collection,
  doc,
  query,
  orderBy,
  getDoc,
  getDocs,
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
/*
  title,        제목
  description,  설명
  name,         이름
  admin         관리자 bool
*/
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
/*
  title,        제목
  startDate,    시작날짜
  endDate,      종료날짜
  description,  설명
  name,         이름
  admin         관리자 bool
*/
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
/*
  title,        제목
  year,         연도
  university,   학교
  department,   학과
  img,          이미지
  url           URL 사이트링크
*/
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

// Contest
/*
  title,        제목
  host,         주최
  supervision,  주관
  sponsor,      후원
  startDate,    시작날짜
  endDate,      종료날짜
  target,       대상
  field,        분야
  img,          이미지
  url           URL 사이트링크
*/
export const createContest = async (
  title,
  host,
  supervision,
  sponsor,
  startDate,
  endDate,
  target,
  field,
  img,
  url
) => {
  await addDoc(collection(db, "contests"), {
    title: title?.value,
    host: host?.value,
    supervision: supervision?.value,
    sponsor: sponsor?.value,
    startDate: startDate?.value,
    endDate: endDate?.value,
    target: target?.value,
    field: field?.value,
    img: img?.value,
    url: url?.value,
    views: 0,
    likes: 0,
    projects: 0,
    timestamp: serverTimestamp(),
  });
};

// Graduation Project
export const createProject = async (
  menu,
  post_id,
  title,
  name,
  description,
  img
) => {
  await addDoc(collection(db, menu, post_id, "projects"), {
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
  await updateDoc(doc(db, menu, post_id), {
    projects: increment(1),
  });
};

// 졸업작품, 공모전 좋아요
export const pushLike = async (menu, post_id) => {
  if (!user || !user?.value?.uid) {
    return;
  }
  const likesRef = collection(db, menu, post_id, "likes");

  const createLike = async () => {
    await addDoc(likesRef, {
      uid: user?.value?.uid,
    });
  };

  const deleteLike = async (like_id) => {
    await deleteDoc(doc(db, `${menu}/${post_id}/likes/${like_id}`));
  };

  const q = query(likesRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length === 0) {
    createLike();
    await updateDoc(doc(db, menu, post_id), {
      likes: increment(1),
    });
    return;
  }
  if (querySnapshot.docs[0].data().uid === user?.value?.uid) {
    deleteLike(querySnapshot.docs[0].id);
    await updateDoc(doc(db, menu, post_id), {
      likes: increment(-1),
    });
    return;
  }
};

// 졸업작품 프로젝트 좋아요

export const pushProjectLike = async (menu, post_id, project_id) => {
  if (!user || !user?.value?.uid) {
    return;
  }
  const likesRef = collection(
    db,
    menu,
    post_id,
    "projects",
    project_id,
    "likes"
  );

  const createProjectLike = async () => {
    await addDoc(likesRef, {
      uid: user?.value?.uid,
    });
  };

  const deleteProjectLike = async (like_id) => {
    await deleteDoc(
      doc(db, `${menu}/${post_id}/projects/${project_id}/likes/${like_id}`)
    );
  };

  const q = query(likesRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) {
    createProjectLike();
    await updateDoc(doc(db, menu, post_id, "projects", project_id), {
      likes: increment(1),
    });
    return;
  }
  if (querySnapshot.docs[0].data().uid === user?.value?.uid) {
    deleteProjectLike(querySnapshot.docs[0].id);
    await updateDoc(doc(db, menu, post_id, "projects", project_id), {
      likes: increment(-1),
    });
    return;
  }
};

// 졸업작품 프로젝트 평가 추가
export const createProjectReview = async (
  menu,
  post_id,
  project_id,
  perfection,
  creativity,
  technicality,
  business,
  design
) => {
  await addDoc(
    collection(db, menu, post_id, "projects", project_id, "reviews"),
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
export const checkProjectReview = async (menu, post_id, project_id) => {
  const reviewRef = collection(
    db,
    menu,
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
export const getMyProjectReview = async (menu, post_id, project_id) => {
  const reviewRef = collection(
    db,
    menu,
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
export const deleteMyProjectReview = async (menu, post_id, project_id) => {
  const reviewRef = collection(
    db,
    menu,
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
        menu,
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
export const onSnapshotProjectReviews = (menu, post_id, project_id) => {
  const perfectionSum = ref(0);
  const creativitySum = ref(0);
  const technicalitySum = ref(0);
  const businessSum = ref(0);
  const designSum = ref(0);

  let unsub = () => {};
  unsub();
  unsub = onSnapshot(
    collection(db, menu, post_id, "projects", project_id, "reviews"),
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
export const createProjectComment = async (
  menu,
  post_id,
  project_id,
  rating,
  comment,
  name
) => {
  await addDoc(
    collection(db, menu, post_id, "projects", project_id, "comments"),
    {
      uid: user?.value?.uid,
      rating: rating.value,
      comment: comment.value,
      name: name,
      timestamp: serverTimestamp(),
    }
  );
};

// 졸업작품 프로젝트 댓글 - 유무확인
export const checkProjectComments = async (menu, post_id, project_id) => {
  const commentsRef = collection(
    db,
    menu,
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
export const onSnapshotProjectComments = (menu, post_id, project_id) => {
  const comments = ref([]);
  let unsub = () => {};
  unsub();
  const commentsRef = collection(
    db,
    menu,
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

// 졸업작품 프로젝트 댓글 - 삭제
export const deleteProjectComment = async (
  menu,
  post_id,
  project_id,
  comment_uid,
  comment_id
) => {
  // if (comment_uid !== user?.value?.uid) return;
  console.log(menu);
  const commentsRef = collection(
    db,
    menu,
    post_id,
    "projects",
    project_id,
    "comments"
  );
  const q = query(commentsRef, where("uid", "==", comment_uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs[0]?.data().uid === comment_uid) {
    deleteDoc(
      doc(db, menu, post_id, "projects", project_id, "comments", comment_id)
    );
  }
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

// Contests
export const updateContest = async (
  title,
  host,
  supervision,
  sponsor,
  startDate,
  endDate,
  target,
  field,
  img,
  url,
  post_id
) => {
  await updateDoc(doc(db, "contests", post_id), {
    title: title?.value,
    host: host?.value,
    supervision: supervision?.value,
    sponsor: sponsor?.value,
    startDate: startDate?.value,
    endDate: endDate?.value,
    target: target?.value,
    field: field?.value,
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
export const onSnapshotProjects = (menu, post_id) => {
  const projects = ref([]);
  let unsub = () => {};
  unsub();
  unsub = onSnapshot(collection(db, menu, post_id, "projects"), (snapshot) => {
    projects.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(() => unsub());

  return projects;
};

// 리스트 페이지 - 스냅샷
export const onSnapshotPostsPage = (menu) => {
  let posts = [];
  const postsPage = ref([]);
  // 배열 n개씩 나누는 함수
  const division = (array, n) => {
    const length = array.length;
    const divide =
      Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0);
    const newArray = [];

    for (let i = 0; i < divide; i++) {
      newArray.push(array.splice(0, n));
    }

    return newArray;
  };
  const postRef = collection(db, menu);
  const q = query(postRef, orderBy("timestamp"));
  let unsub = () => {};
  unsub();
  unsub = onSnapshot(q, (snapshot) => {
    posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    postsPage.value = division(posts, 10);
  });
  onUnmounted(() => unsub());

  return postsPage;
};

// 일반 게시물 데이터(공지사항, 이벤트, 졸업작품소개, 공모전소개) - 스냅샷
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

// 프로젝트 게시물 데이터(졸업작품, 공모전 - 프로젝트) - 스냅샷
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

// 업데이트(수정) 페이지 V-model 바인딩용 getDoc

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

export const getHost = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().host;
};

export const getSupervision = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().supervision;
};

export const getSponsor = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().sponsor;
};

export const getTarget = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().target;
};

export const getField = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().field;
};
