<template>
    <div id="app">
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'App',
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
