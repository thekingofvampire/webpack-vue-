<template>
    <div>
        <p>
            {{msg}}
        </p>
        <div class="test">
            aaaa
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: "this is index."
            };
        }
    };
</script>
<style lang="less" scoped>
    div {
        font-size: 40px;
        color: blue;
        .test {
            color: lightblue;
        }
    }
</style>


