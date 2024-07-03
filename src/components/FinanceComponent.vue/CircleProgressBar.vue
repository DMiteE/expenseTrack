<template>
  <div class="progress-circle">
    <svg :width="size" :height="size">
      <circle
        class="progress-background"
        :stroke-dasharray="dashArray"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
      />
      <circle
        class="progress-bar"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
      />
    </svg>
    <div class="flex progress-text">
      <button class="mr-5" @click="openModal(0)">-</button>
      {{ progress }}%
      <button class="ml-5" @click="openModal(1)">+</button>
    </div>
    <AddSummGoalModal
      :ViewGoalModal="isOpenGoal"
      :summType="summType"
      @isOpenModal="closeModal()"
    ></AddSummGoalModal>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useGoalStore } from "@/stores/goal";
import AddSummGoalModal from "../modal/AddSummGoalModal.vue";
const goalStore = useGoalStore();
const summType = ref(0);
const isOpenGoal = ref(false);
function closeModal() {
  isOpenGoal.value = false;
}
function openModal(type) {
  summType.value = type;
  isOpenGoal.value = true;
}
onMounted(() => {
  goalStore.fetchGoals();
});
const props = defineProps({
  size: {
    type: Number,
    default: 160,
  },
});

const radius = computed(() => (props.size - 10) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const dashArray = computed(() => circumference.value);
const progress = computed(
  () => (goalStore.goals[0].summ / goalStore.goals[0].goalSumm) * 100
);
const dashOffset = computed(
  () => circumference.value - (progress.value / 100) * circumference.value
);
</script>

<style scoped>
.progress-circle {
  position: relative;
}

.progress-background {
  fill: none;
  stroke: #ddd;
  stroke-width: 10;
}

.progress-bar {
  fill: none;
  stroke: #4caf50;
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
</style>
