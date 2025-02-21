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
  const labels_department_type_comparison = ref([])
  const series_department_type_comparison = ref([])
  const labels_division_comparison = ref([])
  const series_division_comparison = ref([])
  const labels_race_comparison = ref([])
  const series_race_comparison = ref([])
  const labels_marital_comparison = ref([])
  const series_marital_comparison = ref([])

  onMounted(async () => {
    const filePath = "/src/assets/Messy_HR_Dataset_Detailed.csv" 
    try {
      const data_gender_raw = await readCsv(filePath,['GenderCode'])
      const data_employee_type_raw = await readCsv(filePath,['EmployeeType'])
      const data_title_raw = await readCsv(filePath,['Title'])
      const data_department_type_raw = await readCsv(filePath,['DepartmentType'])
      const data_division_raw = await readCsv(filePath,['Division'])
      const data_race_raw = await readCsv(filePath,['RaceDesc'])
      const data_marital_raw = await readCsv(filePath,['MaritalDesc'])

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

      // Exploratory Data Analysis (EDA) - Pie Char 5 Top Division With Most Employee
      const division_comparison = countWordFrequencies(data_division_raw['Division'],5)
      labels_division_comparison.value = Object.keys(division_comparison)
      series_division_comparison.value = Object.values(division_comparison)

      // Exploratory Data Analysis (EDA) - Pie Chart Department Type Comparison
      const department_type_comparison = countWordFrequencies(data_department_type_raw['DepartmentType'])
      labels_department_type_comparison.value = Object.keys(department_type_comparison)
      series_department_type_comparison.value = Object.values(department_type_comparison)

      // Exploratory Data Analysis (EDA) - Pie Chart Race Comparison
      const race_comparison = countWordFrequencies(data_race_raw['RaceDesc'])
      labels_race_comparison.value = Object.keys(race_comparison)
      series_race_comparison.value = Object.values(race_comparison)

      // Exploratory Data Analysis (EDA) - Pie Chart Marital Status Comparison
      const marital_comparison = countWordFrequencies(data_marital_raw['MaritalDesc'])
      labels_marital_comparison.value = Object.keys(marital_comparison)
      series_marital_comparison.value = Object.values(marital_comparison)
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

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <!-- Exploratory Data Analysis (EDA) - Pie Char 5 Top Division With Most Employee  -->
    <O_PieChartComponent 
      :series="series_division_comparison" 
      :labels="labels_division_comparison" 
      second_title="5 Top Division With Most Employee" 
      content="This show 5 division with most employee"
    />
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Department Type Comparison  -->
    <O_PieChartComponent 
      :series="series_department_type_comparison" 
      :labels="labels_department_type_comparison" 
      second_title="Department Type Comparison" 
      content="This show department type comparison"
    />
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Race Comparison  -->
    <O_PieChartComponent 
      :series="series_race_comparison" 
      :labels="labels_race_comparison" 
      second_title="Race Comparison" 
      content="This show race comparison"
    />
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Marital Status Comparison  -->
    <O_PieChartComponent 
      :series="series_marital_comparison" 
      :labels="labels_marital_comparison" 
      second_title="Marital Status Comparison" 
      content="This show marital status comparison"
    />
  </WelcomeItem>
</template>


