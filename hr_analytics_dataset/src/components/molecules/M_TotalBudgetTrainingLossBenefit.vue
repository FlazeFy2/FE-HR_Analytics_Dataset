<script setup>
  import { ref, onMounted } from "vue"
  import { readCsv } from "@/utils/data_prepare"
  import A_TextComponent from "../atoms/A_TextComponent.vue";

  const contents = ref([])

  onMounted(async () => {
    const filePath = "/src/assets/Messy_HR_Dataset_Detailed.csv" 
    try {
      // Descriptive Statistic : Total Budget Training Loss and Benefit By Training Outcome
      const data_raw = await readCsv(filePath,['Training Outcome','Training Cost'])
      const total_item = data_raw["Training Outcome"].length
      let total_benefit_cost = 0
      let total_loss_cost = 0
      let total_person_success = 0
      let total_person_failed = 0

      for (let index = 0; index < total_item; index++) {
        const outcome = data_raw["Training Outcome"][index]
        const cost = parseFloat(data_raw["Training Cost"][index])

        if (outcome === "Failed") {
          total_person_failed++
          total_loss_cost += cost
        } else if (outcome === "Passed" || outcome === "Completed") {
          total_person_success++
          total_benefit_cost += cost
        }
      }

      const average_failed = (total_loss_cost / total_person_failed).toFixed(2)
      const average_success = (total_benefit_cost / total_person_success).toFixed(2)
      total_benefit_cost = total_benefit_cost.toFixed(2)
      total_loss_cost = total_loss_cost.toFixed(2)

      contents.value = `Total Company Money's Loss By Failed Training is <b>$${total_loss_cost}</b> from <b>$${total_person_failed}</b> person The average cost per-Failed person is <b>$${average_failed}</b> 
      Total Budget Spending on Success Training is <b>$${total_benefit_cost}</b> from <b>${total_person_success}</b> person The average cost per-Succeed person is <b>$${average_success}</b>`
    } catch (error) {
      console.error("Failed to load CSV:", error)
    }
  })
</script>

<template>
  <A_TextComponent third_title="Total Budget Training Loss and Benefit By Training Outcome" />
  <A_TextComponent :content="contents" />
</template>


