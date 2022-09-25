<template>
  <div class="px-28">
    <div>
      <div v-if="isEditUserProfile" class="flex justify-between items-center mb-4">
        <h3 class="font-bold text-xl">사용자정보 수정</h3>
        <button
          class="w-10 h-10 border-2 border-gray-400 flex justify-center items-center rounded bg-gray-200 cursor-pointer hover:bg-gray-300"
          @click="editProfile"
        >
          <font-awesome-icon icon="fa-solid fa-floppy-disk" class="text-lg" />
        </button>
      </div>

      <div v-else class="flex justify-between items-center mb-4">
        <h3 class="font-bold text-xl">사용자정보</h3>
        <button
          class="w-10 h-10 border-2 border-gray-400 flex justify-center items-center rounded bg-gray-200 cursor-pointer hover:bg-gray-300"
          @click="readyEditProfile"
        >
          <font-awesome-icon icon="fa-solid fa-user-pen" />
        </button>
      </div>

      <div
        v-if="isEditUserProfile"
        class="py-8 px-10 border border-gray-400 rounded-md bg-white"
      >
        <div class="border-b border-gray-300 pb-5 flex items-center">
          <div class="w-1/6 font-bold">사진</div>
          <div class="w-5/6 flex items-center justify-between">
            <div class="w-5/6">
              <input
                type="text"
                v-model="userPhotoUrl"
                placeholder="프로필사진 URL을 입력해주세요. 사진은 가로x세로 길이가 같은 것을 권장합니다."
                class="w-full border border-gray-300 rounded-sm py-0.5 px-1"
              />
              <p class="text-xs text-gray-400">
                프로필사진 URL을 입력해주세요. 사진은 가로x세로 길이가 같은 것을
                권장합니다.
              </p>
            </div>
            <div class="relative">
              <img :src="userPhotoUrl" alt="프로필사진" class="w-16 h-16 rounded-md" />
              <div
                class="absolute bottom-0 h-6 w-full text-center bg-gray-800 bg-opacity-60 rounded-b-md"
              >
                <font-awesome-icon icon="fa-solid fa-camera" class="pt-1 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
        <div class="border-b border-gray-300 flex py-5">
          <div class="w-1/6 font-bold">이름</div>
          <div class="w-5/6 flex justify-between items-center">
            <input
              type="text"
              v-model="userName"
              class="w-5/6 border border-gray-300 rounded-sm py-0.5 px-1"
              id="user-name-input"
            />
            <label for="user-name-input">
              <font-awesome-icon
                icon="fa-solid fa-chevron-left"
                size="lg"
                class="cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div class="flex pt-5">
          <div class="w-1/6 font-bold">이메일</div>
          <div class="w-5/6 flex justify-between items-center">
            <input
              type="email"
              name="user-email-input"
              id="user-email-input"
              v-model="userEmail"
              class="w-5/6 border border-gray-300 rounded-sm py-0.5 px-1"
            />
            <label for="user-email-input">
              <font-awesome-icon
                icon="fa-solid fa-chevron-left"
                size="lg"
                class="cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      <div v-else class="py-8 px-10 border border-gray-400 rounded-md bg-white">
        <div class="border-b border-gray-300 pb-5 flex items-center">
          <div class="w-1/6 font-bold">사진</div>
          <div class="w-5/6 flex items-center justify-between">
            <span>프로필사진으로 당신의 개성을 표현해보세요.</span>
            <div class="relative">
              <img :src="user?.photoURL" alt="프로필사진" class="w-16 h-16 rounded-md" />
              <div
                class="absolute bottom-0 h-6 w-full text-center bg-gray-800 bg-opacity-60 rounded-b-md"
              >
                <font-awesome-icon icon="fa-solid fa-camera" class="pt-1 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
        <div class="border-b border-gray-300 flex py-5">
          <div class="w-1/6 font-bold">이름</div>
          <div class="w-5/6">{{ user?.displayName }}</div>
        </div>
        <div class="flex pt-5">
          <div class="w-1/6 font-bold">이메일</div>
          <div class="w-5/6">{{ user?.email }}</div>
        </div>
      </div>
    </div>

    <div class="my-6 flex gap-8">
      <div class="flex-1">
        <h3 class="font-bold text-xl mb-3">인증메일 다시보내기</h3>
        <div
          class="py-8 px-10 border border-gray-400 rounded-md flex items-center h-32 bg-white"
        >
          <div class="flex flex-col w-full">
            <div class="flex justify-between">
              <div class="border-2 border-gray-400 rounded-md flex">
                <div class="border-r-2 border-gray-400 py-1 px-2">메일인증</div>
                <div
                  v-if="user?.emailVerified"
                  class="flex justify-center items-center w-8 bg-emerald-200 rounded-r"
                >
                  <font-awesome-icon icon="fa-solid fa-check" class="text-emerald-800" />
                </div>
                <div
                  v-else
                  class="flex justify-center items-center w-8 bg-rose-200 rounded-r"
                >
                  <font-awesome-icon icon="fa-solid fa-x" class="text-rose-800" />
                </div>
              </div>

              <button
                class="border-2 border-gray-400 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded-md"
                @click="pushSendEmailVerify"
              >
                <font-awesome-icon icon="fa-solid fa-paper-plane" />
                메일송신
              </button>
            </div>

            <p class="text-sm text-gray-500 ml-0.5 mt-1">
              이메일을 인증하지 않으면 게시물을 작성할 수 없습니다.
            </p>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <h3 class="font-bold text-xl mb-3">비밀번호 재설정</h3>
        <div
          class="py-8 px-10 border border-gray-400 rounded-md h-32 flex justify-between items-center bg-white"
        >
          <div class="flex justify-between items-center w-full">
            <p class="text-xs">비밀번호 재설정을 위해서 이메일을 보냅니다.</p>
            <button
              class="border-2 border-gray-400 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded-md"
              @click="pushSendEmailPasswordReset"
            >
              <font-awesome-icon icon="fa-solid fa-paper-plane" />
              메일송신
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="my-6">
      <h3 class="font-bold text-xl mb-3">계정삭제</h3>
      <div class="py-8 px-10 border border-gray-400 rounded-md bg-white">
        <p class="font-bold">🚧 계정을 삭제할 경우 신중히 선택하시기 바랍니다 🚧</p>
        <p class="font-bold">
          기존에 작성하신 게시물들은 자동으로 삭제되지 않습니다. 작성한 모든 게시물을
          삭제하고 계정을 삭제하시기 바랍니다.
        </p>
        <div class="flex justify-end items-center mt-4">
          <p class="flex-1">
            <span class="text-red-600 font-bold">계정삭제</span>를 입력하시고
            계정삭제버튼을 누르십시오.
          </p>
          <input
            type="text"
            v-model="isDelete"
            class="border-2 border-gray-400 border-r-0 rounded-l-md pl-2 py-1"
            placeholder="계정삭제"
          />
          <button
            class="border-2 border-gray-400 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded-r-md"
            @click="pushDeleteUser"
          >
            <font-awesome-icon icon="fa-solid fa-user-slash" />
            계정삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  user,
  updateUserProfile,
  sendEmailVerify,
  sendEmailPasswordReset,
  btnDeleteUser,
} from "../firebase/user";

const router = useRouter();

const isEditUserProfile = ref(false);

const userPhotoUrl = ref("");
const userName = ref("");
const userEmail = ref("");
const isDelete = ref(null);

const readyEditProfile = () => {
  userPhotoUrl.value = user?.value?.photoURL;
  userName.value = user?.value?.displayName;
  userEmail.value = user?.value?.email;
  isEditUserProfile.value = true;
};

const editProfile = () => {
  updateUserProfile(userPhotoUrl, userName, userEmail);
  isEditUserProfile.value = false;
};

const pushSendEmailVerify = () => {
  sendEmailVerify();
  alert("이메일을 보냈습니다. 3~5분이 소요될 수 도 있습니다.");
};

const pushSendEmailPasswordReset = () => {
  sendEmailPasswordReset();
  alert("이메일을 보냈습니다. 3~5분이 소요될 수 도 있습니다.");
};

const pushDeleteUser = () => {
  if (isDelete.value === "계정삭제") {
    btnDeleteUser();
    router.push({ name: "main" });
  } else {
    alert("입력값이 다릅니다!");
  }
};
</script>
