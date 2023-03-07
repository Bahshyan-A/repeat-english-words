<template>
  <app-header />
  <div class="container card-container" v-if="card">
    <quiz-card :card="card" @update="updateCard"/>
  </div>
</template>

<script setup lang="ts">
import { db } from "./helpers/db";
import { word } from "./types/base";
import { computed, onMounted, ref} from "vue";
import QuizCard from './components/QuizCard.vue';
import AppHeader from './components/AppHeader.vue';

const card = ref<null | word>(null);

onMounted(() => {
  card.value = db.getRandom();
});

const updateCard = () => {
  card.value = db.getRandom();
};
</script>


<style scoped lang="scss">

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
}

.card-container {
  margin-top: 45px;
  padding: 10px;
}

</style>
