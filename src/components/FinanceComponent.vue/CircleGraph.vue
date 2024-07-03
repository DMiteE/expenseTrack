<template>
  <div class="w-300 h-300">
    <h1>График расходов</h1>
    <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Pie, Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useOperationStore } from "@/stores/operations";
import { ref, computed, onMounted, watch } from "vue";
import { getRandomColor } from "../../helpers/randomColor";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartDataLabels,
  ChartDataLabels
);

const operationStore = useOperationStore();

export default {
  name: "DoughnutChart",
  components: { Pie, Doughnut },
  setup() {
    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: "left",
          labels: {
            usePointStyle: true,
            padding: 20,
            boxWidth: 10,
          },
        },
        datalabels: {
          formatter: (value, context) => {
            const dataset = context.chart.data.datasets[context.datasetIndex];
            const dataIndex = context.dataIndex;
            return dataset.data[dataIndex];
          },
          color: "gray",
          font: {
            weight: "bold",
          },
        },
      },
    });

    const categoriesAll = ref([]);
    const categoriesSum = ref({});

    onMounted(async () => {
      await operationStore.fetchOperationsByMonth();
      updateCategories();
    });

    watch(
      () => operationStore.lossOperation,
      () => {
        updateCategories();
      }
    );

    function updateCategories() {
      categoriesAll.value = operationStore.lossOperation;

      categoriesAll.value.forEach((item) => {
        const type = item.type.value;
        const label = item.category.label;
        const sum = item.summ;

        const categoryKey = `${type}-${label}`;
        console.log(categoryKey);
        if (categoriesSum.value[categoryKey]) {
          categoriesSum.value[categoryKey].sum += sum;
        } else {
          categoriesSum.value[categoryKey] = {
            type,
            label,
            sum: sum,
            color: getRandomColor(),
          };
        }
      });
    }

    const outputData = computed(() => Object.values(categoriesSum.value));

    const chartData = computed(() => ({
      labels: outputData.value.map((op) => op.label),
      datasets: [
        {
          data: outputData.value.map((op) => op.sum),
          backgroundColor: outputData.value.map((op) => op.color),
          borderColor: outputData.value.map((op) => op.color),
          borderWidth: 1,
        },
      ],
    }));

    return { chartData, chartOptions };
  },
};
</script>

<style scoped>
</style>
