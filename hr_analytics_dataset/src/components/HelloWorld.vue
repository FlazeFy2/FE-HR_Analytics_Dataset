<script setup>
  import { ref, onMounted } from "vue"
  import { readBody, readHeader } from "@/utils/data_prepare"
  import O_TableComponent from "@/components/organisms/O_TableComponent.vue"
  import A_TextComponent from "@/components/atoms/A_TextComponent.vue"
  import M_TotalBudgetTrainingLossBenefit from "@/components/molecules/M_TotalBudgetTrainingLossBenefit.vue"
  import M_BestEmployeeAndLowestScore from "@/components/molecules/M_BestEmployeeAndLowestScore.vue"

  const header_dataset = ref([])
  const body_dataset = ref([])

  onMounted(async () => {
    const filePath = "/src/assets/Messy_HR_Dataset_Detailed.csv" 
    try {
      const data_header = await readHeader(filePath)
      const data_body = await readBody(filePath)

      // Data Prepare
      const data_header_clean = data_header.filter(dt => dt !== "Unnamed: 0")
      header_dataset.value = data_header_clean.map(header => ({
        label: header,
        field: header,
        sortable: true
      }))      
      const data_body_clean = data_body.map(row => {
        return Object.fromEntries(
            Object.entries(row).filter(([key]) => data_header_clean.includes(key))
        )
      })
      body_dataset.value = data_body_clean
    } catch (error) {
      console.error("Failed to load CSV:", error)
    }
  })
</script>

<template>
  <div class="greetings">
    <A_TextComponent title="HR Analytic" />
    <A_TextComponent second_title="About" />
    <A_TextComponent content="The dataset offers a comprehensive view of consumer shopping trends, aiming to uncover patterns and behaviors in retail purchasing. It contains detailed transactional data across various product categories, customer demographics, and purchase channels"/>
    <A_TextComponent second_title="Source" />
    <a href="https://www.kaggle.com/datasets/hopesb/hr-analytics-dataset?select=Messy_HR_Dataset_Detailed.csv" target="_blank" rel="noopener">Kaggle</a>
    <a href="https://github.com/FlazeFy2/DS-HR_Analytics_Dataset" target="_blank" rel="noopener">Jupiter Notebook</a>
    
    <hr>
    <div class="d-flex justify-content-between">
      <A_TextComponent second_title="Descriptive Statistic" />
      <button class="btn btn-link rounded-pill" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDescriptiveStats" aria-expanded="false" aria-controls="collapseExample">Show Content</button>
    </div>
    <div class="collapse" id="collapseDescriptiveStats">
      <M_TotalBudgetTrainingLossBenefit/>
      <M_BestEmployeeAndLowestScore/>
    </div>
    
    <hr>
    <A_TextComponent second_title="Dataset" />
    <O_TableComponent 
      :header="header_dataset"
      :body="body_dataset"
    />
  </div>
</template>

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
