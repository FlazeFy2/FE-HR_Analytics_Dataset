<template>
    <h1 v-if="title && !second_title && !content" class="text-lg font-bold mb-1">{{ title }}</h1>
    <h3 v-if="second_title && !title && !content" class="text-lg font-bold mb-1">{{ second_title }}</h3>
    <p v-else-if="content" class="mb-1 text-secondary">{{ content }}</p>
</template>
  
<script setup>
    defineProps({
        title: String,
        content: String,
        second_title: String
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
</style>
  