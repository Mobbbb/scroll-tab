<template>
    <div>
        <div class="mock_data_btn">
            <div class="scroll_num_wrap">({{topHeight}},{{height}})</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'test-btn',
    data() {
        return {
            height: window.windowHeight,
        }
    },
    computed: {
        ...mapState('tabModule', {
            topHeight: state => state.topHeight,
        }),
    },
    methods: {
        
    },
};
</script>

<style scoped>
    .turn_to_btn{
        width: 50px;
        height: 50px;
        border-radius: 50px;
        background: white;
        border: 1px solid red;
        position: fixed;
        right: 10px;
        bottom: 60px;
        z-index: 1000;
        text-align: center;
    }
    .mock_data_btn{
        width: 50px;
        height: 50px;
        border-radius: 50px;
        background: white;
        border: 1px solid red;
        position: fixed;
        left: 10px;
        bottom: 60px;
        z-index: 1000;
        text-align: center;
    }
    .sec_btn{
        position: absolute;
        left: 50px;
        bottom: 0;
    }
    .sec_btn li {
        border: 1px solid black;
        background: white;
    }
    .scroll_num_wrap{
        position: fixed;
        right: 0;
        bottom: 0;
    }
</style>
