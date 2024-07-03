<template>
  <div class="p-6 max-w-full mx-auto">
    <div class="text-xl font-bold text-gray-500">Статьи по инвестициям</div>
    <ul class="p-6 max-w-full mx-auto bg-white rounded-xl shadow-md">
      <li
        v-for="(article, index) in articles"
        :key="index"
        class="flex items-center space-x-4 mb-4 bg-gray-100"
      >
        <div class="p-4">
          <div class="text-lg font-bold">
            {{ index + 1 }}. {{ article.title }}
          </div>
          <div class="text-gray-500">{{ article.description }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        {
          title: "Инвестиции для начинающих: первые шаги в мире финансов",
          description:
            "В этом гайде мы расскажем вам о базовых принципах инвестирования и поможем вам сделать первые шаги в мире финансов.",
        },
        {
          title: "Как диверсифицировать инвестиционный портфель",
          description:
            "Узнайте, как распределить свои инвестиции для минимизации риска и максимизации дохода.",
        },

      ],
    };
  },
};
</script>
