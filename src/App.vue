<template>
    <div id="app">
        <Main></Main>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Main from './view/main.vue';

export default {
    name: 'App',
    components: {
        Main,
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState('mainModule', {
            searchContentStatus: state => state.searchContentStatus,
            showTestBtn: state => state.showTestBtn,
        }),
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style scoped>
    #app{
        height: 100%;
    }
</style>
