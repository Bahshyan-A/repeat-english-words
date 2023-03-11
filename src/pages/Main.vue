<template>
    <div class="container container-bg">
        <h1 class="main-title">5000 самых популярных английских слов</h1>
        <h2 class="main-link"><router-link to="/quiz">Новые слова</router-link></h2>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.main{
    &-title {
        color: $blue;
        max-width: 800px;
        text-align:center;
    }

    &-link{
        margin-top: 100px;
        a {
            color: $green;
        }
    }
}
</style>