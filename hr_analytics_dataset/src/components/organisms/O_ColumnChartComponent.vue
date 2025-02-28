<template>
    <div class="card mb-4">
        <div id="chart">
            <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
        </div>
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
                        type: "bar",
                        stacked: true,
                        toolbar: {
                            show: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: "50%"
                        }
                    },
                    xaxis: {
                        categories: this.labels
                    },
                    legend: {
                        position: "bottom"
                    },
                }
            }
        }
    }
</script>

<style scoped>
    #chart {
        width: 100%;
        margin: auto;
    }
</style>
