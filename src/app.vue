<template>
    <div id="app">
        <img src="../static/63651-20161225230059667-596669627.png" alt="">
        <div class="aaa">{{msg}}
            <p>test</p>
        </div>
        <router-view/>
    </div>
</template>
<script>
    import Vue from "vue";
    export default {
        name: "app",
        data() {
            return {
                msg: "hello vue !!"
            };
        },
        created() {
            console.log("$");
            console.log($);
        }
    };
</script>
<style lang="less">
    #app {
        text-align: center;
    }
    img {
        width: 200px;
    }
    p {
        color: #ccc;
        font-size: 24px;
    }
    .aaa {
        font-size: 40px;
        color: red;
    }
</style>

