<template>
  <div class="greetings">
    <A_TextComponent title="HR Analytic" />
    <A_TextComponent second_title="About" />
    <A_TextComponent content="The dataset offers a comprehensive view of consumer shopping trends, aiming to uncover patterns and behaviors in retail purchasing. It contains detailed transactional data across various product categories, customer demographics, and purchase channels"/>
    <br><hr><br>
    <a href="https://www.kaggle.com/datasets/hopesb/hr-analytics-dataset?select=Messy_HR_Dataset_Detailed.csv" target="_blank" rel="noopener">Kaggle</a>
    <a href="https://github.com/FlazeFy2/DS-HR_Analytics_Dataset" target="_blank" rel="noopener">Jupiter Notebook</a>
  </div>
</template>

<script>
    import A_TextComponent from "@/components/atoms/A_TextComponent.vue"
    
    export default {
        components: {
            A_TextComponent
        },
        data() {}
    }
</script>

<style scoped>
  a {
    color: #42b883;
    font-weight: 500;
    font-size: 14px;
    background-color:rgba(66, 184, 131, 0.25);
    border-radius: 20px;
    padding: 7px 12px;
    margin-right: 6px;
  }
</style>
