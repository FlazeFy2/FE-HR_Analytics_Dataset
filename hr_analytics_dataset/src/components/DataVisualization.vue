<script setup>
  import WelcomeItem from './WelcomeItem.vue'
  import DocumentationIcon from './icons/IconDocumentation.vue'
  import { ref, onMounted } from "vue"
  import { readCsv } from "@/utils/data_prepare"
  import { countWordFrequencies } from "@/utils/analyze"
  import O_PieChartComponent from "@/components/organisms/O_PieChartComponent.vue"

  const labels_title = ref([])
  const series_title = ref([])
  const labels_employee_type_comparison = ref([])
  const series_employee_type_comparison = ref([])
  const labels_gender_comparison = ref([])
  const series_gender_comparison = ref([])

  onMounted(async () => {
    const filePath = "/src/assets/Messy_HR_Dataset_Detailed.csv" 
    try {
      const data_gender_raw = await readCsv(filePath,['GenderCode'])
      const data_employee_type_raw = await readCsv(filePath,['EmployeeType'])
      const data_title_raw = await readCsv(filePath,['Title'])

      // Exploratory Data Analysis (EDA) - Pie Chart Gender Comparison
      const gender_comparison = countWordFrequencies(data_gender_raw['GenderCode'])
      labels_gender_comparison.value = Object.keys(gender_comparison)
      series_gender_comparison.value = Object.values(gender_comparison)

      // Exploratory Data Analysis (EDA) - Pie Chart Employee Type Comparison
      const employee_type_comparison = countWordFrequencies(data_employee_type_raw['EmployeeType'])
      labels_employee_type_comparison.value = Object.keys(employee_type_comparison)
      series_employee_type_comparison.value = Object.values(employee_type_comparison)

      // Exploratory Data Analysis (EDA) - Pie Chart 5 Most Title 
      const title_comparison = countWordFrequencies(data_title_raw['Title'],5)
      labels_title.value = Object.keys(title_comparison)
      series_title.value = Object.values(title_comparison)
    } catch (error) {
      console.error("Failed to load CSV:", error)
    }
  })
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Gender Comparison -->
    <O_PieChartComponent 
      :series="series_gender_comparison" 
      :labels="labels_gender_comparison" 
      second_title="Gender Comparison" 
      content="This compare total employee by its gender"
    />
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <!-- Exploratory Data Analysis (EDA) - Pie Chart 5 Most Title  -->
    <O_PieChartComponent 
      :series="series_title" 
      :labels="labels_title" 
      second_title="7 Most Title" 
      content="This show 5 most title employee"
    />
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Employee Type Comparison -->
    <O_PieChartComponent 
      :series="series_employee_type_comparison" 
      :labels="labels_employee_type_comparison" 
      second_title="Employee Type Comparison" 
      content="This show employee type comparison"
    />
  </WelcomeItem>
</template>


