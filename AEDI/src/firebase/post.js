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
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { onUnmounted, ref } from "vue";
import { db } from "./firebase";
import { user } from "./user";
import {
  deleteProjectAllFiles,
  deletePostEditorImg,
  deletePostImg,
} from "./firestore";

// Create Post

// Notice

/**
 *  공지사항 생성
 * @param {Promise<string>} title 제목
 * @param {Promise<string>} description 내용
 * @param {Promise<string>} name 이름
 * @param {boolean} admin 사용자권한
 */
export const createNotice = async (
  title,
  description,
  name,
  admin,
  editorImgPath,
  important
) => {
  await addDoc(collection(db, "notices"), {
    title: title?.value,
    description: description?.value,
    uid: user?.value?.uid,
    name: name,
    admin: admin,
    editorImgPath: editorImgPath?.value,
    important: important?.value,
    timestamp: serverTimestamp(),
    views: 0,
  });
};

// Event
/**
 * 이벤트 생성
 * @param {Promise<string>} title 제목
 * @param {Promise<string>} startDate 시작날짜
 * @param {Promise<string>} endDate 종료날짜
 * @param {Promise<string>} description 내용
 * @param {string} name 이름
 * @param {boolean} admin 사용자권한
 * @param {array} editorImgPath 에디터 이미지 경로 배열
 * @param {Promise<boolean>} important 중요공지
 */
export const createEvent = async (
  title,
  startDate,
  endDate,
  description,
  name,
  admin,
  editorImgPath,
  important
) => {
  await addDoc(collection(db, "events"), {
    title: title?.value,
    startDate: startDate?.value,
    endDate: endDate?.value,
    description: description?.value,
    uid: user?.value?.uid,
    name: name,
    admin: admin,
    editorImgPath: editorImgPath?.value,
    important: important?.value,
    timestamp: serverTimestamp(),
    views: 0,
  });
};

// Graduation
/**
 * 졸업작품 생성
 * @param {Promise<string>} title 제목
 * @param {Promise<number>} year 연도
 * @param {Promise<string>} university 학교
 * @param {Promise<string>} department 학과
 * @param {Promise<string>} img 이미지링크
 * @param {Promise<string>} url 사이트링크
 */
export const createGraduation = async (
  title,
  year,
  university,
  department,
  img,
  url,
  imgFilePath
) => {
  await addDoc(collection(db, "graduations"), {
    title: title?.value,
    year: year?.value,
    university: university?.value,
    department: department?.value,
    img: img?.value,
    url: url?.value,
    imgFilePath: imgFilePath,
    views: 0,
    likes: 0,
    projects: 0,
    reviews: 0,
    timestamp: serverTimestamp(),
  });
};

// Contest
/**
 * 공모전 생성
 * @param {Promise<string>} title 제목
 * @param {Promise<string>} host 주최
 * @param {Promise<string>} supervision 주관
 * @param {Promise<string>} sponsor 후원
 * @param {Promise<string>} startDate 시작날짜
 * @param {Promise<string>} endDate 종료날짜
 * @param {Promise<string>} target 대상
 * @param {Promise<string>} field 분야
 * @param {Promise<string>} img 이미지링크
 * @param {Promise<string>} url 사이트링크
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
  url,
  imgFilePath
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
    imgFilePath: imgFilePath,
    views: 0,
    likes: 0,
    projects: 0,
    reviews: 0,
    timestamp: serverTimestamp(),
  });
};

// Project
/**
 * 프로젝트 생성
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {Promise<string>} title 제목
 * @param {string} name 이름
 * @param {Promise<string>} description 설명
 * @param {Promise<string>} img 이미지링크
 */
export const createProject = async (
  menu,
  post_id,
  title,
  name,
  description,
  img,
  filesUrl,
  filesName,
  imgFilePath,
  filePath,
  editorImgPath
) => {
  await addDoc(collection(db, menu, post_id, "projects"), {
    title: title?.value,
    name: name,
    description: description?.value,
    img: img?.value,
    filesUrl: filesUrl?.value,
    filesName: filesName?.value,
    imgFilePath: imgFilePath,
    filePath: filePath?.value,
    editorImgPath: editorImgPath?.value,
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

export const updateProjectFileArray = async () => {
  await updateDoc(doc);
};

// 졸업작품, 공모전 좋아요
/**
 * 좋아요 눌렀을 때 함수 (포스트)
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @returns
 */
export const pushLike = async (menu, post_id) => {
  if (!user || !user?.value?.uid) {
    return;
  }
  const likesRef = collection(db, menu, post_id, "likes");
  // 좋아요 생성
  const createLike = async () => {
    await addDoc(likesRef, {
      uid: user?.value?.uid,
    });
  };
  // 좋아요 삭제
  const deleteLike = async (like_id) => {
    await deleteDoc(doc(db, `${menu}/${post_id}/likes/${like_id}`));
  };

  // 유저 아이디가 있는 좋아요를 검색한 쿼리
  const q = query(likesRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);

  // 좋아요가 없을 때 누름(생성, 메뉴 좋아요 수 1증가)
  if (querySnapshot.docs.length === 0) {
    createLike();
    await updateDoc(doc(db, menu, post_id), {
      likes: increment(1),
    });
    return;
  }
  // 좋아요가 있을 때 누름(삭제, 메뉴 좋아요 수 1감소)
  if (querySnapshot.docs[0].data().uid === user?.value?.uid) {
    deleteLike(querySnapshot.docs[0].id);
    await updateDoc(doc(db, menu, post_id), {
      likes: increment(-1),
    });
    return;
  }
};

// 프로젝트 좋아요
/**
 * 좋아요 눌렀을 때 함수 (포스트)
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @returns
 */
export const pushProjectLike = async (menu, post_id, project_id) => {
  // 유저 없거나, 유저아이디가 없을때 종료
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

  // 좋아요 생성

  const createProjectLike = async () => {
    await addDoc(likesRef, {
      uid: user?.value?.uid,
    });
  };
  // 좋아요 삭제
  const deleteProjectLike = async (like_id) => {
    await deleteDoc(
      doc(db, `${menu}/${post_id}/projects/${project_id}/likes/${like_id}`)
    );
  };

  // 유저 아이디가 있는 좋아요를 검색한 쿼리
  const q = query(likesRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);

  // 좋아요가 없을 때 누름(생성, 메뉴 좋아요 수 1증가)
  if (querySnapshot.docs.length === 0) {
    createProjectLike();
    await updateDoc(doc(db, menu, post_id, "projects", project_id), {
      likes: increment(1),
    });
    return;
  }

  // 좋아요가 있을 때 누름(삭제, 메뉴 좋아요 수 1감소)
  if (querySnapshot.docs[0].data().uid === user?.value?.uid) {
    deleteProjectLike(querySnapshot.docs[0].id);
    await updateDoc(doc(db, menu, post_id, "projects", project_id), {
      likes: increment(-1),
    });
    return;
  }
};

// 프로젝트 평가 추가
/**
 * 프로젝트 평가 추가
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @param {string} perfection 완성도
 * @param {string} creativity 창의성
 * @param {string} technicality 기술성
 * @param {string} business 사업성
 * @param {string} design 예술성
 */
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
  await updateDoc(doc(db, menu, post_id), {
    reviews: increment(1),
  });
  await updateDoc(doc(db, "profiles", user?.value?.uid), {
    myReviewList: arrayUnion(project_id),
    myReviewCount: increment(1),
  });
};

// 프로젝트 평가 - 유무확인
/**
 * 프로젝트 평가 - 유무확인
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @returns true, false
 */
export const checkProjectReview = async (menu, post_id, project_id) => {
  const reviewRef = collection(
    db,
    menu,
    post_id,
    "projects",
    project_id,
    "reviews"
  );
  // 유저아이디가 같은 프로젝트 평가를 찾는 쿼리
  const q = query(reviewRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  // 유저아이디가 같다면 (true 반환), 아니면 (false 반환)
  if (querySnapshot.docs[0]?.data().uid === user?.value?.uid) {
    return true;
  } else {
    return false;
  }
};

// 내가 작성한 프로젝트 평가 - 가져오기
/**
 *  내가 작성한 프로젝트 평가 - 가져오기
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @returns 유저아이디가 같은 평가
 */
export const getMyProjectReview = async (menu, post_id, project_id) => {
  const reviewRef = collection(
    db,
    menu,
    post_id,
    "projects",
    project_id,
    "reviews"
  );
  // 유저아이디가 같은 프로젝트 평가를 찾는 쿼리
  const q = query(reviewRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  // 유저아이디가 같은 평가가 있다면 평가데이터를 반환
  if (querySnapshot.docs[0]?.data().uid === user?.value?.uid) {
    return querySnapshot.docs[0].data();
  }
};

// 내가 작성한 프로젝트 평가 - 삭제
/**
 * 내가 작성한 프로젝트 평가 - 삭제
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 */
export const deleteMyProjectReview = async (menu, post_id, project_id) => {
  const reviewRef = collection(
    db,
    menu,
    post_id,
    "projects",
    project_id,
    "reviews"
  );
  // 유저아이디가 같은 프로젝트 평가를 찾는 쿼리
  const q = query(reviewRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  // 유저아이디가 같다면 평가 삭제
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
    await updateDoc(doc(db, menu, post_id), {
      reviews: increment(-1),
    });
    await updateDoc(doc(db, "profiles", user?.value?.uid), {
      myReviewList: arrayRemove(project_id),
      myReviewCount: increment(-1),
    });
  }
};

// 프로젝트 평가 - 실시간 가져오기
/**
 * 프로젝트 평가 값 합산 - 실시간 가져오기
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @returns
 */
export const onSnapshotProjectReviews = (menu, post_id, project_id) => {
  // 평가 데이터 ref 선언
  const perfectionSum = ref(0);
  const creativitySum = ref(0);
  const technicalitySum = ref(0);
  const businessSum = ref(0);
  const designSum = ref(0);

  let unsub = () => {};
  // 실시간 데이터 가져오기
  unsub();
  unsub = onSnapshot(
    collection(db, menu, post_id, "projects", project_id, "reviews"),
    (snapshot) => {
      // 평가데이터를 Array에 넣고 합한 값을 ref 변수에 넣음
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
  // 마운트가 종료됬을 때 실시간 데이터 가져오기 종료
  onUnmounted(() => unsub());

  return {
    perfectionSum,
    creativitySum,
    technicalitySum,
    businessSum,
    designSum,
  };
};

// 프로젝트 댓글 - 추가
/**
 * 프로젝트 댓글 - 추가
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @param {Promise<number>} rating 평점
 * @param {Promise<string>} comment 댓글내용
 * @param {string} name 이름
 */
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

// 프로젝트 댓글 - 유무확인
/**
 * // 프로젝트 댓글을 작성했는 지 유무를 확인
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @returns true, false
 */
export const checkProjectComments = async (menu, post_id, project_id) => {
  const commentsRef = collection(
    db,
    menu,
    post_id,
    "projects",
    project_id,
    "comments"
  );
  // 유저 아이디가 같은 프로젝트 댓글을 찾는 쿼리
  const q = query(commentsRef, where("uid", "==", user?.value?.uid));
  const querySnapshot = await getDocs(q);
  // 유저 아이디가 같은 댓글이 있다면, (true 반환), 없다면 (false 반환)
  if (querySnapshot.docs[0]?.data().uid === user?.value?.uid) {
    return true;
  } else {
    return false;
  }
};

// 프로젝트 댓글 - 실시간 가져오기
/**
 * 프로젝트 댓글들 실시간으로 가져오기
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @returns
 */
export const onSnapshotProjectComments = (menu, post_id, project_id) => {
  const comments = ref([]);
  let unsub = () => {};
  // 프로젝트 댓글 실시간으로 가져오기
  unsub();
  const commentsRef = collection(
    db,
    menu,
    post_id,
    "projects",
    project_id,
    "comments"
  );
  // 프로젝트 댓글들 시간순으로 정렬하는 쿼리
  const q = query(commentsRef, orderBy("timestamp"));
  unsub = onSnapshot(q, (snapshot) => {
    comments.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  // 마운트가 종료됬을 때 실시간 댓글 가져오기 종료
  onUnmounted(() => unsub());

  return comments;
};

// 프로젝트 댓글 - 삭제
/**
 * 프로젝트 댓글 - 삭제
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @param {string} comment_uid 댓글 - 유저아이디
 * @param {string} comment_id 댓글 - 아이디
 */
export const deleteProjectComment = async (
  menu,
  post_id,
  project_id,
  comment_uid,
  comment_id
) => {
  // if (comment_uid !== user?.value?.uid) return;
  const commentsRef = collection(
    db,
    menu,
    post_id,
    "projects",
    project_id,
    "comments"
  );
  // 유저 아이디가 같은 댓글 찾는 쿼리
  const q = query(commentsRef, where("uid", "==", comment_uid));
  const querySnapshot = await getDocs(q);
  // 유저 아이디가 같다면 댓글 삭제
  if (querySnapshot.docs[0]?.data().uid === comment_uid) {
    deleteDoc(
      doc(db, menu, post_id, "projects", project_id, "comments", comment_id)
    );
  }
};

// Update Post

// Notices
/**
 * 공지사항 포스트 수정
 * @param {Promise<string>} title 제목
 * @param {Promise<string>} description 내용
 * @param {string} name 이름
 * @param {boolean} admin 사용자권한
 * @param {string} post_id 포스트 아이디
 */
export const updateNotice = async (
  title,
  description,
  name,
  admin,
  editorImgPath,
  important,
  post_id
) => {
  await updateDoc(doc(db, "notices", post_id), {
    title: title?.value,
    description: description?.value,
    uid: user?.value?.uid,
    name: name,
    admin: admin,
    editorImgPath: editorImgPath?.value,
    important: important?.value,
  });
};

// Events
/**
 * 이벤트 포스트 수정
 * @param {Promise<string>} title 제목
 * @param {Promise<string>} startDate 시작날짜
 * @param {Promise<string>} endDate 종료날짜
 * @param {Promise<string>} description 내용
 * @param {string} name 이름
 * @param {boolean} admin 사용자권한
 * @param {string} post_id 포스트 아이디
 */
export const updateEvent = async (
  title,
  startDate,
  endDate,
  description,
  name,
  admin,
  editorImgPath,
  important,
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
    editorImgPath: editorImgPath?.value,
    important: important?.value,
  });
};

// Graduations
/**
 * 졸업작품 포스트 수정
 * @param {Promise<string>} title 제목
 * @param {Promise<string>} year 연도
 * @param {Promise<string>} university 학교
 * @param {Promise<string>} department 학과
 * @param {Promise<string>} img 이미지링크
 * @param {Promise<string>} url 사이트링크
 * @param {string} post_id 포스트 아이디
 */
export const updateGraduation = async (
  title,
  year,
  university,
  department,
  img,
  url,
  post_id,
  imgFilePath
) => {
  await updateDoc(doc(db, "graduations", post_id), {
    title: title?.value,
    year: year?.value,
    university: university?.value,
    department: department?.value,
    img: img?.value,
    url: url?.value,
    imgFilePath: imgFilePath,
  });
};

// Contests
/**
 * 공모전 포스트 수정
 * @param {Promise<string>} title 제목
 * @param {Promise<string>} host 주관
 * @param {Promise<string>} supervision 주최
 * @param {Promise<string>} sponsor 후원
 * @param {Promise<string>} startDate 시작날짜
 * @param {Promise<string>} endDate 종료날짜
 * @param {Promise<string>} target 대상
 * @param {Promise<string>} field 분야
 * @param {Promise<string>} img 이미지링크
 * @param {Promise<string>} url 사이트링크
 * @param {string} post_id 포스트 아이디
 */
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
  post_id,
  imgFilePath
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
    imgFilePath: imgFilePath,
  });
};

// Project Update
/**
 * 프로젝트 업데이트
 * @param {string} menu 카테고리
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @param {Promise<string>} title 제목
 * @param {Promise<string>} description 내용
 * @param {Promise<string>} img 이미지링크
 */
export const updateProject = async (
  menu,
  post_id,
  project_id,
  title,
  description,
  img,
  filesUrl,
  filesName,
  imgFilePath,
  filePath,
  editorImgPath
) => {
  await updateDoc(doc(db, menu, post_id, "projects", project_id), {
    title: title?.value,
    description: description?.value,
    img: img?.value,
    filesUrl: filesUrl?.value,
    filesName: filesName?.value,
    imgFilePath: imgFilePath?.value,
    filePath: filePath?.value,
  });
  for (const imgPath in editorImgPath?.value) {
    await updateDoc(doc(db, menu, post_id, "projects", project_id), {
      editorImgPath: arrayUnion(editorImgPath.value[imgPath]),
    });
  }
};

// Views Count
/**
 * 포스트 views 카운트 증가
 * @param {string} menu 카테고리 ("graduations", "contests", "notices", "events")
 * @param {string} post_id 포스트 아이디
 */
export const updateViewsCount = async (menu, post_id) => {
  await updateDoc(doc(db, menu, post_id), {
    views: increment(1),
  });
};

/**
 * 프로젝트 views 카운트 증가
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 */
export const updateViewsProjectCount = async (menu, post_id, project_id) => {
  await updateDoc(doc(db, menu, post_id, "projects", project_id), {
    views: increment(1),
  });
};

// Delete Post
/**
 * 포스트(공지사항, 이벤트) 삭제
 * @param {string} menu 카테고리 ("notices", "events")
 * @param {string} post_id 포스트 아이디
 */
export const deletePost = async (menu, post_id) => {
  const post = await getDoc(doc(db, menu, post_id));
  const editorImgPath = post.data().editorImgPath;
  await deletePostEditorImg(editorImgPath);

  await deleteDoc(doc(db, menu, post_id));
};

/**
 * 포스트(졸업작품, 공모전) 삭제
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 */
export const deleteProjectPost = async (menu, post_id) => {
  // 포스트 좋아요 삭제
  const likes = await getDocs(collection(db, menu, post_id, "likes"));
  likes.docs.forEach(async (like) => {
    await deleteDoc(doc(db, menu, post_id, "likes", like.id));
  });
  // 포스트 프로젝트 삭제
  const projects = await getDocs(collection(db, menu, post_id, "projects"));
  projects.docs.forEach(async (project) => {
    await deleteProject(menu, post_id, project.id);
  });
  // 포스트 포스터 이미지 삭제
  const post = await getDoc(doc(db, menu, post_id));
  const imgPath = post.data().imgFilePath;
  await deletePostImg(imgPath);
  // 포스트 삭제
  await deleteDoc(doc(db, menu, post_id));
};

/**
 * 프로젝트 삭제
 * @param {string} menu 카테고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 */
export const deleteProject = async (menu, post_id, project_id) => {
  // 프로젝트 좋아요 삭제
  const likes = await getDocs(
    collection(db, menu, post_id, "projects", project_id, "likes")
  );
  likes.docs.forEach(async (like) => {
    await deleteDoc(
      doc(db, menu, post_id, "projects", project_id, "likes", like.id)
    );
  });

  // 프로젝트 평가 삭제
  const reviews = await getDocs(
    collection(db, menu, post_id, "projects", project_id, "reviews")
  );

  reviews.docs.forEach(async (review) => {
    // 각 유저프로필 프로젝트 평가리스트 필드삭제
    await updateDoc(doc(db, "profiles", review.data().uid), {
      myReviewList: arrayRemove(project_id),
      myReviewCount: increment(-1),
    });
    // 포스트 리뷰 카운트 감소
    await updateDoc(doc(db, menu, post_id), {
      reviews: increment(-1),
    });
    // 프로젝트 평가 삭제
    await deleteDoc(
      doc(db, menu, post_id, "projects", project_id, "reviews", review.id)
    );
  });

  // 프로젝트 댓글 삭제
  const comments = await getDocs(
    collection(db, menu, post_id, "projects", project_id, "comments")
  );
  comments.docs.forEach(async (comment) => {
    await deleteDoc(
      doc(db, menu, post_id, "projects", project_id, "comments", comment.id)
    );
  });
  // 프로젝트 수 감소
  await updateDoc(doc(db, menu, post_id), {
    projects: increment(-1),
  });

  // 프로젝트 파일 삭제
  const project = await getDoc(doc(db, menu, post_id, "projects", project_id));
  const imgPath = project.data().imgFilePath;
  const editorImgPath = project.data().editorImgPath;
  const filePath = project.data().filePath;
  await deleteProjectAllFiles(imgPath, editorImgPath, filePath);

  // 프로젝트 삭제
  await deleteDoc(doc(db, menu, post_id, "projects", project_id));
};

// Loading Post

export const getPostCount = (menu) => {
  const projectCount = ref(0);
  const eventCount = ref(0);
  const reviewCount = ref(0);

  let unsub = () => {};
  unsub();

  unsub = onSnapshot(collection(db, menu), (snapshot) => {
    snapshot.docs.forEach((doc) => {
      projectCount.value += doc.data().projects;
    });
    snapshot.docs.forEach((doc) => {
      reviewCount.value += doc.data().reviews;
    });
    eventCount.value = snapshot.docs.length;
  });

  onUnmounted(() => unsub());

  return { projectCount, eventCount, reviewCount };
};

// 평가 참여현황
export const onSnapshotUserReviewCount = () => {
  const reviewCount = ref(0);

  let unsub = () => {};
  unsub();
  unsub = onSnapshot(collection(db, "profiles"), (snapshot) => {
    snapshot.docs.forEach((doc) => {
      reviewCount.value += doc.data().myReviewList.length;
    });
  });

  onUnmounted(() => unsub());

  return reviewCount;
};

// 평가 참여 랭킹
export const onSnapshotUserReviewRank = () => {
  const users = ref([]);

  const q = query(collection(db, "profiles"), orderBy("myReviewCount", "desc"));

  let unsub = () => {};
  unsub();
  unsub = onSnapshot(q, (snapshot) => {
    users.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });

  onUnmounted(() => unsub());

  return users;
};

// 리스트 페이지 - 스냅샷
/**
 * 포스트 리스트 실시간 가져오기
 * @param {string} menu 카테고리 ("graduations", "contests", "notices", "events")
 * @returns
 */
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
  const q = query(postRef, orderBy("timestamp", "desc"));

  let unsub = () => {};
  // 포스트 리스트 실시간 가져오기
  unsub();
  unsub = onSnapshot(q, (snapshot) => {
    posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    postsPage.value = division(posts, 10);
  });
  // 마운트 종료됬을 때 실시간 가져오기 종료
  onUnmounted(() => unsub());

  return postsPage;
};

// 중요 공지 포스트 실시간 가져오기
export const onSnapshotImportantPosts = async (menu) => {
  const posts = ref([]);
  let unsub = () => {};

  unsub();

  const postRef = collection(db, menu);
  const q = query(
    postRef,
    where("important", "==", true)
    // orderBy("timestamp", "desc")
  );

  // 포스트 리스트 실시간 가져오기
  unsub = onSnapshot(q, (snapshot) => {
    posts.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  // 마운트 종료됬을 때 실시간 가져오기 종료
  onUnmounted(() => unsub());

  return posts;
};

// 포스트 sort 테스트 중

// 졸업작품 연도별 카테고리 배열 가져오기
export const onSnapshotGraduationsYear = () => {
  let posts = [];
  const year = ref([]);
  const yearCategory = ref([]);
  let unsub = () => {};

  unsub();
  unsub = onSnapshot(collection(db, "graduations"), (snapshot) => {
    posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    year.value = posts.map((doc) => {
      return doc.year;
    });
    yearCategory.value = year.value.filter(
      (value, index) => year.value.indexOf(value) === index
    );
  });

  onUnmounted(() => unsub());

  return yearCategory;
};

// 졸업작품 대학별 카테고리 배열 가져오기
export const onSnapshotGraduationsUniversity = () => {
  let posts = [];
  const university = ref([]);
  const universityCategory = ref([]);
  let unsub = () => {};

  unsub();
  unsub = onSnapshot(collection(db, "graduations"), (snapshot) => {
    posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    university.value = posts.map((doc) => {
      return doc.university;
    });
    universityCategory.value = university.value.filter(
      (value, index) => university.value.indexOf(value) === index
    );
  });

  onUnmounted(() => unsub());

  return universityCategory;
};

// 졸업작품 학과별 카테고리 배열 가져오기
export const onSnapshotGraduationsDepartment = () => {
  let posts = [];
  const department = ref([]);
  const departmentCategory = ref([]);
  let unsub = () => {};

  unsub();
  unsub = onSnapshot(collection(db, "graduations"), (snapshot) => {
    posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    department.value = posts.map((doc) => {
      return doc.department;
    });
    departmentCategory.value = department.value.filter(
      (value, index) => department.value.indexOf(value) === index
    );
  });

  onUnmounted(() => unsub());

  return departmentCategory;
};

// 졸업작품 카테고리 리스트 가져오기
export const graduationCategoryPage = (year, university, department) => {
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

  const postRef = collection(db, "graduations");
  let q;
  if (
    year.value === "연도별" &&
    university.value === "학교별" &&
    department.value === "학과별"
  ) {
    return;
  }
  if (
    year.value !== "연도별" &&
    university.value === "학교별" &&
    department.value === "학과별"
  ) {
    q = query(postRef, where("year", "==", year.value));
  }
  if (
    year.value === "연도별" &&
    university.value !== "학교별" &&
    department.value === "학과별"
  ) {
    q = query(postRef, where("university", "==", university.value));
  }
  if (
    year.value === "연도별" &&
    university.value === "학교별" &&
    department.value !== "학과별"
  ) {
    q = query(postRef, where("department", "==", department.value));
  }
  if (
    year.value !== "연도별" &&
    university.value !== "학교별" &&
    department.value === "학과별"
  ) {
    q = query(
      postRef,
      where("year", "==", year.value),
      where("university", "==", university.value)
    );
  }
  if (
    year.value !== "연도별" &&
    university.value === "학교별" &&
    department.value !== "학과별"
  ) {
    q = query(
      postRef,
      where("year", "==", year.value),
      where("university", "==", university.value)
    );
  }
  if (
    year.value === "연도별" &&
    university.value !== "학교별" &&
    department.value !== "학과별"
  ) {
    q = query(
      postRef,
      where("university", "==", university.value),
      where("department", "==", department.value)
    );
  }
  if (
    year.value !== "연도별" &&
    university.value !== "학교별" &&
    department.value !== "학과별"
  ) {
    q = query(
      postRef,
      where("year", "==", year.value),
      where("university", "==", university.value),
      where("department", "==", department.value)
    );
  }

  let unsub = () => {};
  // 포스트 리스트 실시간 가져오기
  unsub();
  unsub = onSnapshot(q, (snapshot) => {
    posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    postsPage.value = division(posts, 10);
  });
  // 마운트 종료됬을 때 실시간 가져오기 종료
  onUnmounted(() => unsub());

  return postsPage;
};

// 프로젝트 리스트 - 스냅샷
/**
 * 프로젝트 리스트 실시간 가져오기
 * @param {string} menu 카데고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @returns
 */
export const onSnapshotProjects = (menu, post_id) => {
  const projects = ref([]);
  let unsub = () => {};
  // 프로젝트 리스트 실시간 가져오기
  unsub();
  unsub = onSnapshot(collection(db, menu, post_id, "projects"), (snapshot) => {
    projects.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  // 마운트가 종료됬을 때 실시간 가져오기 종료
  onUnmounted(() => unsub());

  return projects;
};

// 일반 게시물 데이터(공지사항, 이벤트, 졸업작품소개, 공모전소개) - 스냅샷
/**
 *
 * @param {string} menu 카테고리 ("graduations", "contests", "notices", "events")
 * @param {string} post_id 포스트 아이디
 * @returns
 */
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
/**
 *
 * @param {string} menu 카데고리 ("graduations", "contests")
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @returns
 */
export const onSnapshotProject = (menu, post_id, project_id) => {
  const project = ref();
  let unsub = () => {};
  // 프로젝트 포스트 데이터 실시간 가져오기
  unsub();
  unsub = onSnapshot(
    doc(db, menu, post_id, "projects", project_id),
    (doc) => (project.value = doc.data())
  );
  // 마운트 종료됬을 때 실시간 가져오기 종료
  onUnmounted(() => unsub());

  return project;
};

/**
 * 포스트 (내용) 실시간 가져오기
 * @param {string} menu 카테고리 ("graduations", "contests", "notices", "events")
 * @param {string} post_id 포스트 아이디
 * @returns
 */
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

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getPost = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getContent = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().description;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getTitle = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().title;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getStartDate = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().startDate;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getEndDate = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().endDate;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getYear = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().year;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getUniversity = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().university;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getDepartment = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().department;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getImg = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().img;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getPostUrl = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().url;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getHost = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().host;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getSupervision = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().supervision;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getSponsor = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().sponsor;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getTarget = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().target;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} id 포스트 아이디
 * @returns
 */
export const getField = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().field;
};

export const getImportant = async (menu, id) => {
  const docRef = doc(db, menu, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().important;
};

// Project getDoc

/**
 *
 * @param {string} menu 카테고리
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @returns
 */
export const getProjectTitle = async (menu, post_id, project_id) => {
  const docRef = doc(db, menu, post_id, "projects", project_id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().title;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @returns
 */
export const getProjectContent = async (menu, post_id, project_id) => {
  const docRef = doc(db, menu, post_id, "projects", project_id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().description;
};

/**
 *
 * @param {string} menu 카테고리
 * @param {string} post_id 포스트 아이디
 * @param {string} project_id 프로젝트 아이디
 * @returns
 */
export const getProjectImg = async (menu, post_id, project_id) => {
  const docRef = doc(db, menu, post_id, "projects", project_id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().img;
};

export const getProjectImgPath = async (menu, post_id, project_id) => {
  const docRef = doc(db, menu, post_id, "projects", project_id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().imgFilePath;
};

export const getProjectFileNameList = async (menu, post_id, project_id) => {
  const docRef = doc(db, menu, post_id, "projects", project_id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().filesName;
};

export const getProjectFileUrlList = async (menu, post_id, project_id) => {
  const docRef = doc(db, menu, post_id, "projects", project_id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().filesUrl;
};

export const getProjectFilePathList = async (menu, post_id, project_id) => {
  const docRef = doc(db, menu, post_id, "projects", project_id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().filePath;
};
