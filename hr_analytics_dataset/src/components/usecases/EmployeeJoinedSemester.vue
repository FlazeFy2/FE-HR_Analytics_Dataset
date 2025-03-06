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
            const data_raw = await readCsv(filePath, ['StartDate'])
            
            const dates = data_raw['StartDate']
                .filter(date => date)
                .map(date => new Date(date))

            if (dates.length === 0) {
                throw new Error("No valid dates found in CSV")
            }

            const getSemesterContext = (date) => {
                const year = date.getFullYear()
                const month = date.getMonth() + 1 
                return month <= 6 ? `Semester 1 - ${year}` : `Semester 2 - ${year}`
            }

            const semesterCounts = {}
            dates.forEach(date => {
                const context = getSemesterContext(date)
                semesterCounts[context] = (semesterCounts[context] || 0) + 1
            })

            const groupedData = Object.entries(semesterCounts)
                .map(([context, total]) => {
                    const [_, semester, year] = context.match(/Semester (\d) - (\d+)/)
                    return { context, total, year: parseInt(year), semester: parseInt(semester) }
                })
                .sort((a, b) => a.year - b.year || a.semester - b.semester)

            labels.value = groupedData.map(d => d.context)
            series.value = [{ name: "Total", data: groupedData.map(d => d.total) }]
        } catch (error) {
            console.error("Failed to load CSV:", error)
        }
    })
</script>
