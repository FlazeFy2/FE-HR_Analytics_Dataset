<template>
    <O_LineChartComponent :series="series" :labels="labels" />
</template>

<script setup>
    import { ref, onMounted } from "vue"
    import { readCsv } from "@/utils/data_prepare"
    import O_LineChartComponent from "@/components/organisms/O_LineChartComponent.vue"

    const series = ref([])
    const labels = ref([])

    onMounted(async () => {
        const filePath = "/src/assets/Messy_HR_Dataset_Detailed.csv"
        try {
            const data_raw = await readCsv(filePath, ['DOB'])
            const generationOrder = ["Silent Generation", "Baby Boomers", "Gen X", "Millennials", "Gen Z", "Gen Alpha"]

            const dates = data_raw['DOB'].filter(date => date).map(date => {
                const [day, month, year] = date.split('-').map(Number)

                return new Date(year, month-1,day)
            })
            if (dates.length === 0) {
                throw new Error("No valid dates found in CSV")
            }

            const getGenContext = (date) => {
                const year = date.getFullYear()
                
                if(year >= 2013){
                    return "Gen Alpha"
                } else if(year >= 1997){
                    return "Gen Z"
                } else if(year >= 1981){
                    return "Millennials"
                } else if(year >= 1965){
                    return "Gen X"
                } else if(year >= 1946){
                    return "Baby Boomers"
                } else if(year >= 1928){
                    return "Silent Generation"
                } else {
                    return "Unknown"
                }
            }

            const generationCounts = {}
            dates.forEach(date => {
                const context = getGenContext(date)
                generationCounts[context] = (generationCounts[context] || 0) + 1
            })

            const groupedData = Object.entries(generationCounts)
                .map(([context, total]) => ({ context, total }))
                .sort((a, b) => generationOrder.indexOf(a.context) - generationOrder.indexOf(b.context))

            labels.value = groupedData.map(d => d.context)
            series.value = [{ name: "Total", data: groupedData.map(d => d.total) }]
        } catch (error) {
            console.error("Failed to load CSV:", error)
        }
    })
</script>
