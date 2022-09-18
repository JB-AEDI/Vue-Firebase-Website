<template>
  <PolarArea
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script setup>
import { PolarArea } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);

const props = defineProps({
  chartId: {
    type: String,
    default: "polar-chart",
  },
  datasetIdKey: {
    type: String,
    default: "label",
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 400,
  },
  cssClasses: {
    default: "",
    type: String,
  },
  styles: {
    type: Object,
    default: () => {},
  },
  plugins: {
    type: Array,
    default: () => [],
  },
  perfectionSum: Number,
  creativitySum: Number,
  technicalitySum: Number,
  businessSum: Number,
  designSum: Number,
});

const chartData = {
  labels: ["완성도", "창의성", "기술성", "사업성", "예술성"],
  datasets: [
    {
      label: "프로젝트 평가",
      backgroundColor: [
        "rgba(255, 159, 180, 0.5)",
        "rgba(255, 207, 159, 0.5)",
        "rgba(255, 225, 154, 0.5)",
        "rgba(144, 231, 231, 0.5)",
        "rgba(130, 205, 255, 0.5)",
      ],
      pointBackgroundColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)",
      data: [
        props.perfectionSum,
        props.creativitySum,
        props.technicalitySum,
        props.businessSum,
        props.designSum,
      ],
    },
  ],
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
