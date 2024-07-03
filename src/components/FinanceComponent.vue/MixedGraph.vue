<template>
  <div class="chart-container">
    <Bar :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
  Tooltip,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ref, computed, onMounted, watch } from "vue";
import { useOperationStore } from "@/stores/operations";

ChartJS.register(
  Title,
  Legend,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

export default {
  name: "BarChart",
  components: { Bar },
  setup() {
    const operationStore = useOperationStore();
    const incomeCategories = ref([]);
    const lossOperation = ref([]);
    const categoriesIncomeSum = ref({});
    const categoriesLossSum = ref({});
    const categoriesMonthSum = ref({});
    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Расходы и доходы",
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    });

    const updateCategories = () => {
      incomeCategories.value = operationStore.incomeOperationAllMonth;
      lossOperation.value = operationStore.lossOperationAllMonth;
      categoriesIncomeSum.value = {};
      categoriesLossSum.value = {};
      categoriesMonthSum.value = {};

      incomeCategories.value.forEach((item) => {
        const categoryKey = `${item.type.value}-${item.category.label}`;
        categoriesIncomeSum.value[categoryKey] = categoriesIncomeSum.value[
          categoryKey
        ] || {
          type: item.type.value,
          label: item.category.label,
          sum: 0,
        };
        categoriesIncomeSum.value[categoryKey].sum += item.summ;

        const monthKey = item.month;
        categoriesMonthSum.value[monthKey] = categoriesMonthSum.value[
          monthKey
        ] || {
          month: item.month,
          income: 0,
          loss: 0,
        };
        categoriesMonthSum.value[monthKey].income += item.summ;
      });

      lossOperation.value.forEach((item) => {
        const categoryKey = `${item.type.value}-${item.category.label}`;
        categoriesLossSum.value[categoryKey] = categoriesLossSum.value[
          categoryKey
        ] || {
          type: item.type.value,
          label: item.category.label,
          sum: 0,
        };
        categoriesLossSum.value[categoryKey].sum += item.summ;

        const monthKey = item.month;
        categoriesMonthSum.value[monthKey] = categoriesMonthSum.value[
          monthKey
        ] || {
          month: item.month,
          income: 0,
          loss: 0,
        };
        categoriesMonthSum.value[monthKey].loss += item.summ;
      });
    };

    onMounted(async () => {
      await operationStore.fetchOperationsByMonth();
      await operationStore.fetchOperationsAllMonth();
      updateCategories();
    });

    watch(
      () => [
        operationStore.incomeOperationAllMonth,
        operationStore.lossOperationAllMonth,
      ],
      updateCategories
    );

    const chartData = computed(() => {
      const outputMonthData = Object.values(categoriesMonthSum.value);
      return {
        labels: outputMonthData.map((month) => month.month),
        datasets: [
          {
            label: "Расходы",
            data: outputMonthData.map((month) => month.loss),
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Доходы",
            data: outputMonthData.map((month) => month.income),
            backgroundColor: "rgba(75, 192, 192, 1)",
          },
        ],
      };
    });

    return { chartData, chartOptions };
  },
};
</script>

<style scoped>
.chart-container {
  width: 600px;
  height: 400px;
}
@media only screen and (max-width: 750px) {
  .chart-container {
    width: 400px;
    height: 200px;
  }
  .my-chart-id {
    height: 300px;
  }
}
@media only screen and (max-width: 540px) {
  .chart-container {
    width: 350px;
    height: 300px;
    position: relative;
    left: 40px;
  }
  .my-chart-id {
    height: 300px;
  }
}
</style>
