<template>
    <O_ColumnChartComponent 
        :series="chartData" 
        :labels="chartLabels" 
        :second_title="second_title" 
        :content="content"
    />
</template>

<script setup>
    import { ref, onMounted, defineProps } from "vue"
    import O_ColumnChartComponent from "../organisms/O_ColumnChartComponent.vue"
    import { readCsv } from "@/utils/data_prepare"

    const props = defineProps({
        second_title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },
        count_col: {
            type: String,
            required: true
        },
        group_col: {
            type: String,
            required: true
        },
        limit: {
            type: Number,
            required: false,
            default: 7
        }
    })

    const chartData = ref([])
    const chartLabels = ref([])

    onMounted(async () => {
        const filePath = "/src/assets/Messy_HR_Dataset_Detailed.csv"
        try {
            const data_raw = await readCsv(filePath, [props.count_col, props.group_col])

            // Count Label
            const countOccurrences = data_raw[props.count_col].reduce((acc, value) => {
                acc[value] = (acc[value] || 0) + 1
                return acc
            }, {})

            // Limit the Count Col for Label
            chartLabels.value = Object.entries(countOccurrences)
                .sort((a, b) => b[1] - a[1]) 
                .slice(0, props.limit) 
                .map(([value]) => value) 

            const groupedData = {}

            // Group Data
            data_raw[props.group_col].forEach((groupValue, index) => {
                const countValue = data_raw[props.count_col][index]

                if (!chartLabels.value.includes(countValue)) return

                if (!groupedData[groupValue]) {
                    groupedData[groupValue] = Object.fromEntries(
                        chartLabels.value.map(label => [label, 0])
                    )
                }
                groupedData[groupValue][countValue] += 1
            })

            chartData.value = Object.entries(groupedData).map(([group, counts]) => ({
                name: group,
                data: chartLabels.value.map(label => counts[label] || 0)
            }))
        } catch (error) {
            console.error("Failed to load CSV:", error)
        }
    })
</script>
