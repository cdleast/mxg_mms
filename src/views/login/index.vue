<template>
    <div class="login">
        <el-form class="login-form" ref="form" :rules="rules" :model="form" label-width="80px">
            <h2 class="login-title">梦学谷会员管理系统</h2>
            <el-form-item label="账号：" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login"; // 导入调取接口api文档
export default {
    name: "login",
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: "帐号不能为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 提交表单给后台进行验证是否正确
                    login(this.form.username, this.form.password).then(res => {
                        const resp = res.data;
                        // console.log(resp, resp.flag, resp.data.token,resp.message);
                        // resp.flag为true表示登录成功
                        if (resp.flag) {
                            // 验证成功, 通过token去获取用户信息
                            getUserInfo(resp.data.token).then(res => {
                                // 获取到了用户的数据
                                const respUser = res.data;
                                if (respUser.flag) {
                                    console.log('userInfo', respUser.data)
                                    // 保存 token ，用户信息
                                    localStorage.setItem(
                                        "mxg-msm-user",
                                        JSON.stringify(respUser.data)
                                    );
                                    localStorage.setItem(
                                        "mxg-msm-token",
                                        resp.data.token
                                    );
                                    // 前往首页
                                    this.$router.push("/");
                                } else {
                                    this.$message({
                                        message: respUser.message,
                                        type: "warning"
                                    });
                                }
                            });
                        } else {
                            this.$message({
                                message: resp.message,
                                type: "warning"
                            });
                        }
                    });
                } else {
                    console.log("验证失败");
                    return false;
                }
            });
        }
    }
};
</script>

<style lang='scss' scoped>
.login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/login.jpg") no-repeat;
}
.login-form {
    width: 350px;
    background: rgba(255, 255, 255, 0.8);
    padding: 28px 65px 28px 28px;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.login-title {
    color: #303133;
    text-align: center;
    margin-bottom: 15px;
}
</style>