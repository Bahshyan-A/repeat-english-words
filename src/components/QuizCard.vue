<template>
  <n-card size="huge" :title="card.eng" class="quiz-card">
    <n-input
      @keypress.enter="checkAnswer"
      v-model:value="ask"
      size="large"
      type="text"
      placeholder="Ваш ответ"
    />
    <div class="quiz-card__bottom">
      <n-button
        class="quiz-card__btn"
        strong
        secondary
        type="info"
        size="large"
        @click="checkAnswer"
        >Проверить</n-button
      >
      <n-button @click="showHint" dashed type="success">{{
        hintContent
      }}</n-button>
      <transition name="fade">
        <template v-if="showResultLabel">
          <n-alert
            class="quiz-card__info"
            :title="alertData.title"
            :type="alertData.type"
          >
          </n-alert>
        </template>
      </transition>
      <n-divider />
      <n-button
        class="quiz-card__btn"
        strong
        secondary
        type="warning"
        size="large"
        @click="updateCard"
        >Следующее слово</n-button
      >
    </div>
  </n-card>
</template>
  
  <script setup lang="ts">
import {
  NCard,
  NInput,
  NDivider,
  NAlert,
  NSpace,
  NButton,
  NCollapse,
  NCollapseItem,
  NTag,
} from "naive-ui";
import { db } from "../helpers/db";
import {
  formatStringToArray,
  deleteBrackets,
  deleteBackSpaces,
  formatAnswerStr,
} from "../helpers/strings";
import { word } from "../types/base";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update"]);

const ask = ref("");
const isCorrect = ref(false);
const showResultLabel = ref(false);
const showCorrectAnswer = ref(false);

const updateCard = () => {
  ask.value = "";
  showResultLabel.value = false;
  showCorrectAnswer.value = false;

  emit("update");
};

const showHint = () => {
  showCorrectAnswer.value = !showCorrectAnswer.value;
};

const checkAnswer = () => {
  if (props.card) {
    const answers = formatStringToArray(deleteBrackets(props.card.rus));
    isCorrect.value = answers.includes(formatAnswerStr(ask.value));
    if (!showResultLabel.value) showResultLabel.value = true;
  }
};

const alertData = computed(() => {
  const title = `${isCorrect.value ? "Абсолютно верно" : "Неправильный ответ"}`;
  const type: "success" | "error" = isCorrect.value ? "success" : "error";
  return {
    title,
    type,
  };
});

const hintContent = computed(() => {
  if (props.card) {
    return !showCorrectAnswer.value ? "Показать ответ" : props.card.rus;
  }
});
</script>
  
  <style scoped lang="scss">
.quiz-card {
  display: flex;
  flex-direction: column;

  &__bottom {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    gap: 5px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
  