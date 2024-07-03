<script setup>
import Portfolio from "../components/InvestComponents/Portfolio.vue";
import Header from '../components/Header.vue';
import InvestHeader from "../components/InvestComponents/InvestHeader.vue";
</script>

<template>
<Header></Header>
<InvestHeader :headerTitle="'Инвестиции'"  ></InvestHeader>
<Portfolio></Portfolio>
<InvestHeader :headerTitle="'Криптовалюта'"  ></InvestHeader>
<Portfolio></Portfolio>
</template>