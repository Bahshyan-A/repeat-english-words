<template>
  <n-card
    content-style="padding: 10px;"
    :header-style="cardHeaderStyles"
    size="huge"
    class="quiz-card"
    :class="cardStyles"
  >
    <template #header>
      <div>
        <span class="quiz-card__description">Напиши перевод к слову:</span>
        <br />
        <span class="quiz-card__word"
          >{{ card.eng }}{{ showCorrectAnswer ? " - " + card.rus : "" }}</span
        >
      </div>
    </template>

    <n-input
      @keypress.enter="checkAnswer"
      v-model:value="ask"
      class="quiz-card__input"
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
    <n-button
      @click="showHint"
      class="quiz-card__hint"
      quaternary
      type="success"
      >{{ hintContent }}</n-button
    >
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

const hintContent = computed(() => {
  if (props.card) {
    return !showCorrectAnswer.value ? "🙈 Показать ответ" : "🙉 Скрыть ответ";
  }
});

const cardStyles = computed(() => {
  if (showResultLabel.value) {
    return isCorrect.value ? "quiz-card--success" : "quiz-card--wrong";
  } else {
    return "";
  }
});

const cardHeaderStyles = computed(() => {
  if (showResultLabel.value) {
    return isCorrect.value ? "background: #62e49f" : "background: #e46262";
  } else {
    return "background:rgb(179, 213, 252)";
  }
});
</script>

<style scoped lang="scss">
.quiz-card {
  display: flex;
  width: 400px;
  border-radius: 8px;
  border: 3px solid;
  border-color:$blue--light;
  box-shadow: 4px 4px 12px #0000000e;
  flex-direction: column;
  text-align: center;

  &--success {
    border-color: $green--light;

    .quiz-card__word {
      color: $green--dark;
    }
    .quiz-card__description {
      color: $green;
    }
  }

  &--wrong {
    border-color: $red--light;

    .quiz-card__word {
      color: $red--dark;
    }
    .quiz-card__description {
      color: $red;
    }
  }

  @media (max-width: 760px) {
    width: 100%;
  }

  &__bottom {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    gap: 5px;

    button {
      height: 80px;
    }
  }

  &__word {
    font-weight: 500;
    font-size: 30px;
    color: $blue--dark;
  }
  &__description {
    color:  $blue;
    font-size: 16px;
  }

  &__hint {
    margin: 10px;
  }

  &__input {
    color: #000;
    margin-top: 15px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
  }

  &__btn {
    font-size: 20px;
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
