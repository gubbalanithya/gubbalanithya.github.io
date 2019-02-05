<script>
    import module from '@components/module';

    export default {
        name: 'app',
        components: {
            module
        },
        methods: {

        }
    }
</script>


<template>
    <div class="app">
        <module/>
    </div>
</template>


<style lang="scss">
    @import '@styles/index.scss';
    @import '@styles/variables.scss';

    body {
        background: #ddd;
    }

    h1 {
        height: 80px;
        font-size: 24px;
        text-align: center;
        margin: 0;
        padding: 40px;
        border-bottom: $border;
    }

    .app {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: calc(100% - 80px);
    }
</style>