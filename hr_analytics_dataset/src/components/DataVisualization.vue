<script setup>
  import { ref, onMounted } from "vue"
  import { readCsv } from "@/utils/data_prepare"
  import { countWordFrequencies } from "@/utils/analyze"
  import O_PieChartComponent from "@/components/organisms/O_PieChartComponent.vue"
  import O_TreeMapComponent from "@/components/organisms/O_TreeMapComponent.vue"
  import A_TextComponent from "@/components/atoms/A_TextComponent.vue"
  import TotalEmployeePerGroupAndContext from "@/components/usecases/TotalEmployeePerGroupAndContext.vue"
  import TotalEmployeePerGenGroupAndContext from "@/components/usecases/TotalEmployeePerGenGroupAndContext.vue"
  import EmployeeJoinedSemester from "./usecases/EmployeeJoinedSemester.vue"
  import EmployeeExitSemester from "./usecases/EmployeeExitSemester.vue"
  import EmployeeGeneration from "./usecases/EmployeeGeneration.vue"
  import EmployeeSurverDateQuartal from "./usecases/EmployeeSurverDateQuartal.vue"
  import TotalEmployeeByTrainingDayStart from "./usecases/TotalEmployeeByTrainingDayStart.vue"

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
  const labels_performance_score_comparison = ref([])
  const series_performance_score_comparison = ref([])
  const labels_training_program_name_comparison = ref([])
  const series_training_program_name_comparison = ref([])
  const labels_training_type_comparison = ref([])
  const series_training_type_comparison = ref([])
  const labels_training_outcome_comparison = ref([])
  const series_training_outcome_comparison = ref([])
  const series_title_tree = ref([])
  const series_division_tree = ref([])
  const series_state_tree = ref([])

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
      const data_performance_score_raw = await readCsv(filePath,['Performance Score'])
      const data_training_program_name_raw = await readCsv(filePath,['Training Program Name'])
      const data_training_type_raw = await readCsv(filePath,['Training Type'])
      const data_training_outcome_raw = await readCsv(filePath,['Training Outcome'])
      const data_state_raw = await readCsv(filePath,['State'])

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

      // Exploratory Data Analysis (EDA) - Pie Chart Performance Score Comparison
      const performance_score_comparison = countWordFrequencies(data_performance_score_raw['Performance Score'])
      labels_performance_score_comparison.value = Object.keys(performance_score_comparison)
      series_performance_score_comparison.value = Object.values(performance_score_comparison)

      // Exploratory Data Analysis (EDA) - Pie Chart Training Program Name Comparison
      const training_program_name_comparison = countWordFrequencies(data_training_program_name_raw['Training Program Name'])
      labels_training_program_name_comparison.value = Object.keys(training_program_name_comparison)
      series_training_program_name_comparison.value = Object.values(training_program_name_comparison)

      // Exploratory Data Analysis (EDA) - Pie Chart Training Type Comparison
      const training_type_comparison = countWordFrequencies(data_training_type_raw['Training Type'])
      labels_training_type_comparison.value = Object.keys(training_type_comparison)
      series_training_type_comparison.value = Object.values(training_type_comparison)

      // Exploratory Data Analysis (EDA) - Pie Chart Training Outcome Comparison
      const training_outcome_comparison = countWordFrequencies(data_training_outcome_raw['Training Outcome'])
      labels_training_outcome_comparison.value = Object.keys(training_outcome_comparison)
      series_training_outcome_comparison.value = Object.values(training_outcome_comparison)

      // Exploratory Data Analysis (EDA) - Tree Map 20 Most Title
      const most_title_tree = countWordFrequencies(data_title_raw['Title'],20)
      series_title_tree.value = [
        {
          data: Object.entries(most_title_tree).map(([key, value]) => ({
            x: key,
            y: value
          }))
        }
      ]

      // Exploratory Data Analysis (EDA) - Tree Map 20 Most Title
      const most_division_tree = countWordFrequencies(data_division_raw['Division'],20)
      series_division_tree.value = [
        {
          data: Object.entries(most_division_tree).map(([key, value]) => ({
            x: key,
            y: value
          }))
        }
      ]

      // Exploratory Data Analysis (EDA) - Tree Map State Comparison
      const most_state_tree = countWordFrequencies(data_state_raw['State'],20)
      series_state_tree.value = [
        {
          data: Object.entries(most_state_tree).map(([key, value]) => ({
            x: key,
            y: value
          }))
        }
      ]
    } catch (error) {
      console.error("Failed to load CSV:", error)
    }
  })
</script>

<template>
  <div class="d-flex justify-content-between">
    <A_TextComponent second_title="Pie Chart" />
    <button class="btn btn-link rounded-pill" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePieStats" aria-expanded="false" aria-controls="collapseExample">Show Content</button>
  </div>
  <div class="collapse show ps-3" id="collapsePieStats">
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Gender Comparison -->
    <O_PieChartComponent 
      :series="series_gender_comparison" 
      :labels="labels_gender_comparison" 
      second_title="Gender Comparison" 
      content="This compare total employee by its gender"
    />

    <!-- Exploratory Data Analysis (EDA) - Pie Chart 5 Most Title  -->
    <O_PieChartComponent 
      :series="series_title" 
      :labels="labels_title" 
      second_title="7 Most Title" 
      content="This show 5 most title employee"
    />

    <!-- Exploratory Data Analysis (EDA) - Pie Chart Employee Type Comparison -->
    <O_PieChartComponent 
      :series="series_employee_type_comparison" 
      :labels="labels_employee_type_comparison" 
      second_title="Employee Type Comparison" 
      content="This show employee type comparison"
    />

    <!-- Exploratory Data Analysis (EDA) - Pie Char 5 Top Division With Most Employee  -->
    <O_PieChartComponent 
      :series="series_division_comparison" 
      :labels="labels_division_comparison" 
      second_title="5 Top Division With Most Employee" 
      content="This show 5 division with most employee"
    />
    
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Department Type Comparison  -->
    <O_PieChartComponent 
      :series="series_department_type_comparison" 
      :labels="labels_department_type_comparison" 
      second_title="Department Type Comparison" 
      content="This show department type comparison"
    />
  
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Race Comparison  -->
    <O_PieChartComponent 
      :series="series_race_comparison" 
      :labels="labels_race_comparison" 
      second_title="Race Comparison" 
      content="This show race comparison"
    />
    
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Marital Status Comparison  -->
    <O_PieChartComponent 
      :series="series_marital_comparison" 
      :labels="labels_marital_comparison" 
      second_title="Marital Status Comparison" 
      content="This show marital status comparison"
    />

    <!-- Exploratory Data Analysis (EDA) - Pie Chart Performance Score Comparison  -->
    <O_PieChartComponent 
      :series="series_performance_score_comparison" 
      :labels="labels_performance_score_comparison" 
      second_title="Performance Score Comparison" 
      content="This show performance comparison"
    />

    <!-- Exploratory Data Analysis (EDA) - Pie Chart Training Program Name Comparison  -->
    <O_PieChartComponent 
      :series="series_training_program_name_comparison" 
      :labels="labels_training_program_name_comparison" 
      second_title="Training Program Name" 
      content="This show training program name comparison"
    />
  
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Training Type Comparison  -->
    <O_PieChartComponent 
      :series="series_training_type_comparison" 
      :labels="labels_training_type_comparison" 
      second_title="Training Type" 
      content="This show training type comparison"
    />
    
    <!-- Exploratory Data Analysis (EDA) - Pie Chart Training Outcome Comparison  -->
    <O_PieChartComponent 
      :series="series_training_outcome_comparison" 
      :labels="labels_training_outcome_comparison" 
      second_title="Training Outcome" 
      content="This show training outcome comparison"
    />
  </div>

  <div class="d-flex justify-content-between">
    <A_TextComponent second_title="Column Chart" />
    <button class="btn btn-link rounded-pill" type="button" data-bs-toggle="collapse" data-bs-target="#collapseColumnStats" aria-expanded="false" aria-controls="collapseExample">Show Content</button>
  </div>
  <div class="collapse ps-3" id="collapseColumnStats">
    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Status By Its Type -->
    <TotalEmployeePerGroupAndContext
      second_title="Total Employee Per Status By Its Type" 
      content="This chart shows the total employee group by its employee status and employee type"
      count_col="EmployeeType"
      group_col="EmployeeStatus"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Department By Its Type -->
    <TotalEmployeePerGroupAndContext
      second_title="Total Employee Per Type By Its Department" 
      content="This chart shows the total employee group by its department and employee type"
      count_col="EmployeeType"
      group_col="DepartmentType"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Gender By Its Department -->
    <TotalEmployeePerGroupAndContext
      second_title="Total Employee Per Gender By Its Department" 
      content="This chart shows the total employee group by its gender and department"
      count_col="DepartmentType"
      group_col="GenderCode"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Deparment By Its Performance Score -->
    <TotalEmployeePerGroupAndContext
      second_title="Total Employee Per Deparment By Its Performance Score" 
      content="This chart shows the total employee group by its performance score and department"
      count_col="Performance Score"
      group_col="DepartmentType"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Training Outcome By Its Training Program -->
    <TotalEmployeePerGroupAndContext
      second_title="Total Employee Per Training Outcome By Its Training Program" 
      content="This chart shows the total employee group by its training program and training outcome"
      count_col="Training Program Name"
      group_col="Training Outcome"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Training Type By Its Training Program -->
    <TotalEmployeePerGroupAndContext
      second_title="Total Employee Per Training Type By Its Training Program" 
      content="This chart shows the total employee group by its training program and training type"
      count_col="Training Program Name"
      group_col="Training Type"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Department By Its Training Program -->
    <TotalEmployeePerGroupAndContext
      second_title="Total Employee Per Department By Its Training Program" 
      content="This chart shows the total employee group by its training program and department"
      count_col="Training Program Name"
      group_col="DepartmentType"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Employee Type By Its Training Program -->
    <TotalEmployeePerGroupAndContext
      second_title="Total Employee Per Employee Type By Its Training Program" 
      content="This chart shows the total employee group by its training program and employee type"
      count_col="Training Program Name"
      group_col="EmployeeType"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Performance Score By Its Marital Status -->
    <TotalEmployeePerGroupAndContext
      second_title="Total Employee Per Performance Score By Its Marital Status" 
      content="This chart shows the total employee group by its marital status and performance score"
      count_col="MaritalDesc"
      group_col="Performance Score"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Employee Type By Its Gen Group -->
    <TotalEmployeePerGenGroupAndContext
      second_title="Total Employee Per Employee Type By Its Gen Group" 
      content="This chart shows the total employee group by its gen group and employee type"
      count_col="EmployeeType"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Race By Its Gen Group -->
    <TotalEmployeePerGenGroupAndContext
      second_title="Total Employee Per Race By Its Gen Group" 
      content="This chart shows the total employee group by its gen group and race"
      count_col="RaceDesc"
    />

    <!-- Exploratory Data Analysis (EDA) - Stacked Bar Chart Total Employee Per Marital Status By Its Gen Group -->
    <TotalEmployeePerGenGroupAndContext
      second_title="Total Employee Per Marital Status By Its Gen Group" 
      content="This chart shows the total employee group by its gen group and marital status"
      count_col="MaritalDesc"
    />

    <!-- Exploratory Data Analysis (EDA) - Bar Chart Total Employee By Training Start Day -->
    <TotalEmployeeByTrainingDayStart
      second_title="Total Employee By Training Start Day" 
      content="This chart shows the total employee by training start day"
    />
  </div>

  <div class="d-flex justify-content-between">
    <A_TextComponent second_title="Tree Map" />
    <button class="btn btn-link rounded-pill" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTreeStats" aria-expanded="false" aria-controls="collapseExample">Show Content</button>
  </div>
  <div class="collapse ps-3" id="collapseTreeStats">
    <!-- Exploratory Data Analysis (EDA) - Tree Map Most 20 Title -->
    <O_TreeMapComponent 
      :series="series_title_tree" 
      second_title="20 Most Title" 
      content="This show 20 most title in the company"
    />

    <!-- Exploratory Data Analysis (EDA) - Tree Map Most 20 Division -->
    <O_TreeMapComponent 
      :series="series_division_tree" 
      second_title="20 Most Divison" 
      content="This show 20 most division in company"
    />

    <!-- Exploratory Data Analysis (EDA) - Tree Map Most 20 State -->
    <O_TreeMapComponent 
      :series="series_state_tree" 
      second_title="20 Most State" 
      content="This show 20 most state in company"
    />
  </div>

  <div class="d-flex justify-content-between">
    <A_TextComponent second_title="Line Chart" />
    <button class="btn btn-link rounded-pill" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLineChart" aria-expanded="false" aria-controls="collapseExample">Show Content</button>
  </div>
  <div class="collapse ps-3" id="collapseLineChart">
    <!-- Exploratory Data Analysis (EDA) - Total Employee Join By Semester -->
    <EmployeeJoinedSemester
      second_title="Total Employee Join By Semester" 
      content="This show total employee joined in company by semester"
    />

    <!-- Exploratory Data Analysis (EDA) - Total Employee Exit By Semester -->
    <EmployeeExitSemester
      second_title="Total Employee Exit By Semester" 
      content="This show total employee exit from company by semester"
    />

    <!-- Exploratory Data Analysis (EDA) - Total Employee By Generation -->
    <EmployeeGeneration
      second_title="Total Employee By Generation" 
      content="This show total employee by generation born"
    />

    <!-- Exploratory Data Analysis (EDA) - Total Employee By Survey Date -->
    <EmployeeSurverDateQuartal
      second_title="Total Employee By Survey Date" 
      content="This show total employee by survey date"
    />
  </div>
</template>


