<template>
  <h1>Repeat English</h1>
  <quiz-card v-if="card" @update="updateCard" :card="card"/>
</template>

<script setup lang="ts">
import { db } from "./helpers/db";
import { word } from "./types/base";
import { onMounted, ref} from "vue";
import QuizCard from './components/QuizCard.vue';

const card = ref<null | word>(null);

onMounted(() => {
  card.value = db.getRandom();
});

const updateCard = () => {
  card.value = db.getRandom();
};
</script>

<style scoped lang="scss">

</style>
