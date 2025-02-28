<template>
    <div class="card mb-4 p-3">
        <A_TextComponent :second_title="target_col"/>
        <hr>
        <div class="row">
            <div class="col">
                <A_TextComponent third_title="Max"/>
            </div>
            <div class="col text-end">
                <A_TextComponent :third_title="max"/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <A_TextComponent third_title="Min"/>
            </div>
            <div class="col text-end">
                <A_TextComponent :third_title="min"/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <A_TextComponent third_title="Range"/>
            </div>
            <div class="col text-end">
                <A_TextComponent :third_title="range"/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <A_TextComponent third_title="Mean"/>
            </div>
            <div class="col text-end">
                <A_TextComponent :third_title="mean"/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <A_TextComponent third_title="Mode"/>
            </div>
            <div class="col text-end">
                <A_TextComponent :third_title="mode"/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <A_TextComponent third_title="Variance"/>
            </div>
            <div class="col text-end">
                <A_TextComponent :third_title="variance"/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <A_TextComponent third_title="Standard Deviance"/>
            </div>
            <div class="col text-end">
                <A_TextComponent :third_title="std"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, defineProps } from "vue"
    import A_TextComponent from "@/components/atoms/A_TextComponent.vue"
    import { readCsv } from "@/utils/data_prepare";
    import { countMax, countMin, countMean, countMode, countVariance, countStd } from "@/utils/analyze";
    
    const props = defineProps({
        target_col: {
            type: String,
            required: true
        }
    })

    const max = ref(null)
    const min = ref(null)
    const range = ref(null)
    const mean = ref(null)
    const mode = ref(null)
    const variance = ref(null)
    const std = ref(null)

    onMounted(async () => {
        const filePath = "/src/assets/Messy_HR_Dataset_Detailed.csv"
        try {
            const data_raw = await readCsv(filePath, [props.target_col])
            max.value = countMax(data_raw[props.target_col])
            min.value = countMin(data_raw[props.target_col])
            range.value = max.value - min.value
            mean.value = countMean(data_raw[props.target_col])
            mode.value = countMode(data_raw[props.target_col])
            console.log(countMode(data_raw[props.target_col]))
            variance.value = countVariance(data_raw[props.target_col])
            std.value = countStd(data_raw[props.target_col])

            console.log(data_raw)
        } catch (error) {
            console.error("Failed to load CSV:", error)
        }
    })
</script>