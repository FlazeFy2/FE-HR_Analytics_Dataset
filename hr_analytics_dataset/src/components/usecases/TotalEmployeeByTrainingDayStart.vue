<template>
    <O_ColumnChartComponent 
        :series="chartData" 
        :labels="chartLabels" 
        :second_title="second_title" 
        :content="content"
    />
</template>

<script setup>
    import { ref, onMounted } from "vue"
    import O_ColumnChartComponent from "../organisms/O_ColumnChartComponent.vue"
    import { readCsv } from "@/utils/data_prepare"

    const chartData = ref([])
    const chartLabels = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])

    const props = defineProps({
        second_title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },
    })

    onMounted(async () => {
        const filePath = "/src/assets/Messy_HR_Dataset_Detailed.csv"
        try {
            const data_raw = await readCsv(filePath, ['Training Date'])
            const dayCounts = { 'Sunday': 0, 'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 'Thursday': 0, 'Friday': 0, 'Saturday': 0 }

            data_raw['Training Date'].forEach(dt => {
                const months = {
                    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
                }
                let [day, month, year] = dt.split('-')
                year = '20' + year

                const new_format = `${year}-${months[month]}-${day}`
                const date = new Date(new_format)
                const day_name = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
                
                if (day_name in dayCounts) {
                    dayCounts[day_name] += 1
                }
            })

            chartData.value = [{
                name: "Total Employee",
                data: chartLabels.value.map(day_name => dayCounts[day_name] || 0)
            }]
        } catch (error) {
            console.error("Failed to load CSV:", error)
        }
    })
</script>
