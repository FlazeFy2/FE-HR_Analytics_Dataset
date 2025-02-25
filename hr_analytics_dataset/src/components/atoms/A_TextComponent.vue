<template>
    <h1 v-if="title && !second_title && !content && !third_title" class="mb-3" v-html="title"></h1>
    <h3 v-if="second_title && !title && !content && !third_title" class="mb-2" v-html="second_title"></h3>
    <h5 v-if="third_title && !title && !content && !second_title" class="mb-1" v-html="third_title"></h5>
    <p v-else-if="content" class="mb-1 text-secondary" v-html="content"></p>
</template>
  
<script setup>
    defineProps({
        title: String,
        content: String,
        second_title: String,
        third_title: String
    })
</script>

<style>
    h1 {
        font-weight: 600;
        color: #42b883;
        font-size: 36px;
    }
    h3 {
        font-weight: 500;
        font-size: 20px;
    }
    h5 {
        font-weight: 500;
        font-size: 17px;
    }
</style>
  