<template>
    <A_TextComponent :second_title="second_title" />
    <div id="chart">
        <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
    </div>
    <A_TextComponent :content="content" />
</template>
  
<script>
    import VueApexCharts from "vue3-apexcharts"
    import A_TextComponent from "@/components/atoms/A_TextComponent.vue"
    
    export default {
        components: {
            apexchart: VueApexCharts,
            A_TextComponent
        },
        props: {
            series: {
                type: Array,
                required: true
            },
            labels: {
                type: Array,
                required: true
            },
            second_title: {
                type: String,
                default: ""
            },
            content: {
                type: String,
                default: ""
            }
        },
        computed: {
            chartOptions() {
            return {
                chart: {
                    width: 380,
                    type: "pie"
                },
                labels: this.labels,
                responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
                ]
            }
            }
        }
    }
</script>
  
<style scoped>
    #chart {
        max-width: 100%;
        margin: auto;
    }
</style>
  