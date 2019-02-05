<script>
    import filters from '@components/filters';
    import graph from '@components/graph';

    export default {
        name: 'module',
        components: {
            filters, graph
        },
        computed: {
            filter() {
                return this.$store.state.filter;
            }
        }
    }
</script>


<template>
    <div class="module">
        <filters/>
        <graph :filter="filter"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .module {
        height: 100%;

        .filters {
            height: 90px;
        }

        .graph {
            height: calc(100% - 90px);
        }
    }
</style>