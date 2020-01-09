<template>
    <div class="header">
        <router-link to="/">
            <img class="logo" src="@/assets/images/logo.png" width="25px" />
            <span class="company">梦学谷会员管理系统</span>
        </router-link>

        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                下拉菜单
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-fold" command="b">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: "layout-header",
    data() {
        return {};
    },
    methods: {
        handleCommand(command) {
            this.$message("click on item " + command);
        }
    }
};
</script>

<style lang='scss' scoped>
.logo {
    vertical-align: middle;
    padding: 0px 10px 0 40px;
}
.company {
    position: absolute;
    color: white;
}
/* 下拉菜单  */
.el-dropdown {
    float: right;
    margin-right: 40px;
}
.el-dropdown-link {
    color: white;
    cursor: pointer;
}
</style>