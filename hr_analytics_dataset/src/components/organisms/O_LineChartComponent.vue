<template>
    <div class="card mb-4">
        <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
        <A_TextComponent :second_title="second_title" />
        <hr>
        <A_TextComponent :content="content" />
    </div>
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
                        type: "line",
                        height: 350
                    },
                    xaxis: {
                        categories: this.labels 
                    },
                    stroke: {
                        curve: "smooth"
                    },
                    markers: {
                        size: 5
                    },
                    legend: {
                        position: "bottom"
                    },
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: '100%'
                                },
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
