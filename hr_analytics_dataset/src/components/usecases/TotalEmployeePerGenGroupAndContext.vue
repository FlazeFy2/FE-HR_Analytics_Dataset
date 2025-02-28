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
    const chartLabels = ref(['Gen Z', 'Millennials', 'Gen X', 'Baby Boomers', 'Silent Generation'])

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
        limit: {
            type: Number,
            required: false,
            default: 7
        }
    })

    onMounted(async () => {
        const filePath = "/src/assets/Messy_HR_Dataset_Detailed.csv"
        try {
            const data_raw = await readCsv(filePath, ['DOB', props.count_col])
            data_raw['Gen Group'] = data_raw['DOB'].map(dt => {
                const [day, month, year] = dt.split('-').map(Number) 
                const birthYear = year

                if (birthYear >= 1997) {
                    return "Gen Z"
                } else if (birthYear >= 1981) {
                    return "Millennials"
                } else if (birthYear >= 1965) {
                    return "Gen X"
                } else if (birthYear >= 1946) {
                    return "Baby Boomers"
                } else {
                    return "Silent Generation"
                }
            })

            const groupedData = {}

            data_raw[props.count_col].forEach((ctx, index) => {
                const gen = data_raw['Gen Group'][index]

                if (!groupedData[ctx]) {
                    groupedData[ctx] = { "Gen Z": 0, "Millennials": 0, "Gen X": 0, "Baby Boomers": 0, "Silent Generation": 0 }
                }
                if (gen in groupedData[ctx]) {
                    groupedData[ctx][gen] += 1 
                }
            })

            chartData.value = Object.entries(groupedData).map(([ctx, genData]) => ({
                name: ctx,
                data: chartLabels.value.map(gen => genData[gen] || 0)
            }))
        } catch (error) {
            console.error("Failed to load CSV:", error)
        }
    })
</script>
