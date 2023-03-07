<template>
    <header class="header">
        <div class="header__container">
            <div class="header__logo">🌎 Repeat-english</div>
            <nav class="header__nav">
                <ul v-if="!isDesktop" class="header__nav-list">
                    <li class="header__nav-list-item"><a href="#">О проекте</a></li>
                    <li class="header__nav-list-item"><a href="#">Новые слова</a></li>
                    <li class="header__nav-list-item"><a href="#">Словарь</a></li>
                    <li class="header__nav-list-item"><a href="#">Избранное</a></li>
                    <li class="header__nav-list-item"><a href="#">Статистика</a></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
const isDesktop = computed(() => {
  return window.innerWidth < 768;
})
</script>

<style lang="scss" scoped>

.header {
    background-color: #fff;
    box-shadow: 0px 4px 12px #0000000e;
    padding: 0 10px;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;

    &__container {
        max-width: 1280px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__logo{
        font-weight: 800;
        color: #2080f0;
        padding: 10px;
        border-radius: 8px;
        font-size: 22px;
    }

    &__nav{
        &-list{
            display: flex;
            gap: 1.5rem;
            list-style: none;

            &-item a{
                text-decoration: none;
                font-weight: 500;
                font-size: 19px;
                color: #2080f0;

                &:hover, &:focus {
                    color: #5a9eeb;
                }
            }
        }
    }
}

</style>