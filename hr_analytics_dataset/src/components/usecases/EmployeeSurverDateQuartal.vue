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
            const data_raw = await readCsv(filePath, ['Survey Date'])
        
            const dates = data_raw['Survey Date'].filter(date => date).map(date => {
                const [day,month,year] = date.split('-').map(Number)

                return new Date(year, month-1, day)
            })
            if (dates.length === 0) {
                throw new Error("No valid dates found in CSV")
            }

            const getQuartalContext = (date) => {
                const year = date.getFullYear()
                const month = date.getMonth() + 1 
                const quartal = Math.ceil(month / 3)
                
                return `Q${quartal} ${year}`
            }

            const quartalCounts = {}
            dates.forEach(date => {
                const context = getQuartalContext(date)
                quartalCounts[context] = (quartalCounts[context] || 0) + 1
            })

            const groupedData = Object.entries(quartalCounts)
                .map(([context, total]) => {
                    const [_, quartal, year] = context.match(/Q(\d) (\d+)/)
                    return { context, total, year: parseInt(year), quartal: parseInt(quartal) }
                })
                .sort((a, b) => a.year - b.year || a.quartal - b.quartal)

            labels.value = groupedData.map(d => d.context)
            series.value = [{ name: "Total", data: groupedData.map(d => d.total) }]
        } catch (error) {
            console.error("Failed to load CSV:", error)
        }
    })
</script>
