<template>
    <div class="member">
        {{list}}
    </div>
</template>

<script>
import memberApi from '@/api/member'
export default {
    name: "member",
    data() {
        return {
            list: [], // 获取数据

        };
    },
    created(){
        // 初始化获取数据
        this.fetchData();
    },
    methods:{
        fetchData(){
            memberApi.getList().then((res)=>{
                const resp = res.data;
                this.list = resp.data;
            })
        }
    }
};
</script>

<style lang='scss' scoped>
</style>