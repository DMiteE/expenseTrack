<template>
  <div class="-mt-2 pt-2 lg:mt-0 lg:flex-shrink-0">
    <div class="mx-auto pr-5 relative">
      <CircleGraph v-if="chartType === 'CircleGraph'"></CircleGraph>
      <PolarAreaBar v-if="chartType === 'PolarAreaBar'"></PolarAreaBar>
    </div>
  </div>
</template>

<script setup>
import CircleGraph from "./CircleGraph.vue";
import PolarAreaBar from "./PolarAreaBar.vue";
import { onMounted, defineProps } from "vue";

defineProps({
  chartType: {
    type: String,
    default: "CircleGraph",
  },
});
</script>

<style scoped></style>
