<script setup>
    import { ref, onMounted } from "vue"
    import { readCsv } from "@/utils/data_prepare"
    import A_TextComponent from "../atoms/A_TextComponent.vue";

    const contents = ref([])

    onMounted(async () => {
        const filePath = "/src/assets/Messy_HR_Dataset_Detailed.csv" 
        try {
            // Descriptive Statistic : Top 3 Best Employee and Employee With Lowest Score
            const data_raw = await readCsv(filePath,['FirstName','LastName','Training Outcome','Satisfaction Score','Engagement Score','Current Employee Rating','Performance Score'])
            const total_item = data_raw["Training Outcome"].length
            let scores = []

            // Count score
            for (let index = 0; index < total_item; index++) {
                const outcome = data_raw["Training Outcome"][index]
                const full_name = data_raw["FirstName"][index] + ' ' +data_raw["LastName"][index]
                const perf = data_raw["Performance Score"][index]
                const satisfaction_score = parseInt(data_raw["Satisfaction Score"][index])
                const engagement_score = parseInt(data_raw["Engagement Score"][index])
                const employee_rate_score = parseInt(data_raw["Current Employee Rating"][index])
                
                const outcome_score = {
                    "Failed": -1,
                    "Incomplete": 0,
                    "Completed": 1,
                    "Passed": 2
                }[outcome] || 0

                const perf_score = {
                    "PIP": -1,
                    "Needs Improvement": 0,
                    "Exceeds": 1,
                    "Fully Meets": 2
                }[perf] || 0

                let total_score = outcome_score + satisfaction_score + engagement_score + employee_rate_score + perf_score

                if (scores[full_name]) {
                    scores[full_name] += total_score
                } else {
                    scores[full_name] = total_score
                }
            }

            // Sort score
            let sorted_scores = Object.entries(scores)
                .map(([full_name, total_score]) => ({ full_name, total_score }))
                .sort((a, b) => b.total_score - a.total_score)

            const top3_highest = sorted_scores.slice(0, 3)
            const top3_lowest = sorted_scores.slice(-3)

            let top_3_up_str = top3_highest.map(el => `<b>${el.full_name} (${el.total_score})</b>`).join(', ');
            let top_3_low_str = top3_lowest.map(el => `<b>${el.full_name} (${el.total_score})</b>`).join(', ');
            
            contents.value = `Top 3 Best Employee Based on General Score are ${top_3_up_str} and the employee with lowest score are ${top_3_low_str}`
        } catch (error) {
            console.error("Failed to load CSV:", error)
        }
    })
</script>

<template>
  <A_TextComponent third_title="Top 3 Best Employee and Employee With Lowest Score" />
  <A_TextComponent :content="contents" />
</template>


