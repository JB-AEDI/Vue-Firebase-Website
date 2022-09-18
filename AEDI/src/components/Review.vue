<template>
  <div class="flex flex-col gap-4">
    <!-- 완성도 (perfaction) -->
    <div class="grid grid-cols-6">
      <div class="col-span-1 flex items-center font-bold text-lg">완성도</div>
      <div class="col-span-5">
        <ul class="grid grid-cols-5 gap-2">
          <li class="col-span-1">
            <input
              type="radio"
              v-model="perfactionValue"
              id="perfaction-1"
              name="perfaction"
              value="1"
              class="hidden peer"
              required
            />
            <label
              for="perfaction-1"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">매우낮음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="perfactionValue"
              id="perfaction-2"
              name="perfaction"
              value="2"
              class="hidden peer"
            />
            <label
              for="perfaction-2"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">낮음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="perfactionValue"
              id="perfaction-3"
              name="perfaction"
              value="3"
              class="hidden peer"
            />
            <label
              for="perfaction-3"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">보통</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="perfactionValue"
              id="perfaction-4"
              name="perfaction"
              value="4"
              class="hidden peer"
            />
            <label
              for="perfaction-4"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">높음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="perfactionValue"
              id="perfaction-5"
              name="perfaction"
              value="5"
              class="hidden peer"
            />
            <label
              for="perfaction-5"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">매우높음</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <!-- 창의성 (creativity) -->
    <div class="grid grid-cols-6">
      <div class="col-span-1 flex items-center font-bold text-lg">창의성</div>
      <div class="col-span-5">
        <ul class="grid grid-cols-5 gap-2">
          <li class="col-span-1">
            <input
              type="radio"
              v-model="creativityValue"
              id="creativity-1"
              name="creativity"
              value="1"
              class="hidden peer"
              required
            />
            <label
              for="creativity-1"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">매우낮음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="creativityValue"
              id="creativity-2"
              name="creativity"
              value="2"
              class="hidden peer"
            />
            <label
              for="creativity-2"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">낮음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="creativityValue"
              id="creativity-3"
              name="creativity"
              value="3"
              class="hidden peer"
            />
            <label
              for="creativity-3"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">보통</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="creativityValue"
              id="creativity-4"
              name="creativity"
              value="4"
              class="hidden peer"
            />
            <label
              for="creativity-4"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">높음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="creativityValue"
              id="creativity-5"
              name="creativity"
              value="5"
              class="hidden peer"
            />
            <label
              for="creativity-5"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">매우높음</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <!-- 기술성 (technicality) -->
    <div class="grid grid-cols-6">
      <div class="col-span-1 flex items-center font-bold text-lg">기술성</div>
      <div class="col-span-5">
        <ul class="grid grid-cols-5 gap-2">
          <li class="col-span-1">
            <input
              type="radio"
              v-model="technicalityValue"
              id="technicality-1"
              name="technicality"
              value="1"
              class="hidden peer"
              required
            />
            <label
              for="technicality-1"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">매우낮음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="technicalityValue"
              id="technicality-2"
              name="technicality"
              value="2"
              class="hidden peer"
            />
            <label
              for="technicality-2"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">낮음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="technicalityValue"
              id="technicality-3"
              name="technicality"
              value="3"
              class="hidden peer"
            />
            <label
              for="technicality-3"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">보통</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="technicalityValue"
              id="technicality-4"
              name="technicality"
              value="4"
              class="hidden peer"
            />
            <label
              for="technicality-4"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">높음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="technicalityValue"
              id="technicality-5"
              name="technicality"
              value="5"
              class="hidden peer"
            />
            <label
              for="technicality-5"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">매우높음</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <!-- 사업성 (business) -->
    <div class="grid grid-cols-6">
      <div class="col-span-1 flex items-center font-bold text-lg">사업성</div>
      <div class="col-span-5">
        <ul class="grid grid-cols-5 gap-2">
          <li class="col-span-1">
            <input
              type="radio"
              v-model="businessValue"
              id="business-1"
              name="business"
              value="1"
              class="hidden peer"
              required
            />
            <label
              for="business-1"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">매우낮음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="businessValue"
              id="business-2"
              name="business"
              value="2"
              class="hidden peer"
            />
            <label
              for="business-2"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">낮음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="businessValue"
              id="business-3"
              name="business"
              value="3"
              class="hidden peer"
            />
            <label
              for="business-3"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">보통</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="businessValue"
              id="business-4"
              name="business"
              value="4"
              class="hidden peer"
            />
            <label
              for="business-4"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">높음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="businessValue"
              id="business-5"
              name="business"
              value="5"
              class="hidden peer"
            />
            <label
              for="business-5"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">매우높음</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <!-- 예술성 (design) -->
    <div class="grid grid-cols-6">
      <div class="col-span-1 flex items-center font-bold text-lg">예술성</div>
      <div class="col-span-5">
        <ul class="grid grid-cols-5 gap-2">
          <li class="col-span-1">
            <input
              type="radio"
              v-model="designValue"
              id="design-1"
              name="design"
              value="1"
              class="hidden peer"
              required
            />
            <label
              for="design-1"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">매우낮음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="designValue"
              id="design-2"
              name="design"
              value="2"
              class="hidden peer"
            />
            <label
              for="design-2"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">낮음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="designValue"
              id="design-3"
              name="design"
              value="3"
              class="hidden peer"
            />
            <label
              for="design-3"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">보통</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="designValue"
              id="design-4"
              name="design"
              value="4"
              class="hidden peer"
            />
            <label
              for="design-4"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">높음</span>
            </label>
          </li>
          <li class="col-span-1">
            <input
              type="radio"
              v-model="designValue"
              id="design-5"
              name="design"
              value="5"
              class="hidden peer"
            />
            <label
              for="design-5"
              class="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span class="font-semibold text-sm">매우높음</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const perfactionValue = ref("");
const creativityValue = ref("");
const technicalityValue = ref("");
const businessValue = ref("");
const designValue = ref("");
</script>
