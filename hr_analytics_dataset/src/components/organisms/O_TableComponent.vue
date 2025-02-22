<template>
    <div class="my-3 me-2 rounded">
        <vue-good-table
            :columns="columns"
            :rows="rows"
            :pagination-options="{ enabled: true, perPage: 25, perPageDropdown: [14, 25, 50, 100, 200] }"
            :search-options="{ enabled: true }"
            :sort-options="{ 
                enabled: true, 
                initialSortBy: { field: 'FirstName', type: 'asc' } 
            }"
            class="custom-table"
        />
    </div>
</template>

<style scoped>
    .custom-table {
        max-width: 50vw;
        white-space: nowrap;
    }
</style>

  
<script>
    import { VueGoodTable } from "vue-good-table-next"
    import "vue-good-table-next/dist/vue-good-table-next.css"
    
    export default {
        components: { VueGoodTable },
        props: {
            header: {
                type: Array,
                required: true
            },
            body: {
                type: Array,
                required: true
            }
        },  
        computed: {
            columns() {
                return this.header
            },
            rows() {
                return this.body
            }
        }
    }
</script>
  