<template>
    <div class="member">
        <!-- :inline="true 表单一行显示 -->
        <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline">
            <el-form-item prop="cardNum">
                <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="会员名字"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select v-model="searchMap.payType" placeholder="支付类型">
                    <!-- 不要忘记 payTypeOptions 绑定到data中 -->
                    <el-option
                        v-for="option in payTypeOptions"
                        :key="option.type"
                        :label="option.name"
                        :value="option.type"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <!-- value-format 是指定绑定值的格式 -->
                <el-date-picker
                    style="width: 200px"
                    value-format="yyyy-MM-dd"
                    v-model="searchMap.birthday"
                    type="date"
                    placeholder="出生日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 数据列表
        :data 绑定渲染的数据
        border 表格边框
        type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽
        -->
        <el-table :data="list" height="380" border style="width: 100%">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
            <el-table-column prop="name" label="会员姓名" width="90"></el-table-column>
            <el-table-column prop="birthday" label="会员生日"></el-table-column>
            <el-table-column prop="phone" label="手机号码"></el-table-column>
            <el-table-column prop="integral" label="可用积分"></el-table-column>
            <el-table-column prop="money" label="开卡金额"></el-table-column>
            <el-table-column prop="payType" label="支付类型">
                <template slot-scope="scope">
                    <span>{{scope.row.payType | payTypeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="会员地址"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页功能 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>

        <!-- 弹出新增窗口 
        title 窗口的标题
        :visible.sync 当它true的时候，窗口会被弹出
        -->
        <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
            <el-form
                :rules="rules"
                ref="pojoForm"
                label-width="100px"
                label-position="right"
                style="width: 400px;"
                :model="pojo"
            >
                <el-form-item label="会员卡号" prop="cardNum">
                    <el-input v-model="pojo.cardNum"></el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="name">
                    <el-input v-model="pojo.name"></el-input>
                </el-form-item>
                <el-form-item label="会员生日" prop="birthday">
                    <!-- value-format 是指定绑定值的格式 -->
                    <el-date-picker
                        style="width: 200px"
                        value-format="yyyy-MM-dd"
                        v-model="pojo.birthday"
                        type="date"
                        placeholder="会员生日"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="pojo.phone"></el-input>
                </el-form-item>
                <el-form-item label="开卡金额" prop="money">
                    <el-input v-model="pojo.money"></el-input>
                </el-form-item>
                <el-form-item label="可用积分" prop="integral">
                    <el-input v-model="pojo.integral"></el-input>
                </el-form-item>
                <el-form-item label="支付类型" prop="payType">
                    <el-select v-model="pojo.payType" placeholder="支付类型" style="width: 110px">
                        <!-- 不要忘记 payTypeOptions 绑定到data中 -->
                        <el-option
                            v-for="option in payTypeOptions"
                            :key="option.type"
                            :label="option.name"
                            :value="option.type"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会员地址" prop="address">
                    <el-input type="textarea" v-model="pojo.address"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addData('pojoForm')">确 定</el-button>
                <!-- <el-button
                    type="primary"
                    @click="pojo.id === null ? addData('pojoForm'): updateData('pojoForm')"
                >确 定</el-button>-->
            </div>
        </el-dialog>
    </div>
</template>

<script>
import memberApi from "@/api/member";

// 支付类型
const payTypeOptions = [
    { type: "1", name: "现金" },
    { type: "2", name: "微信" },
    { type: "3", name: "支付宝" },
    { type: "4", name: "银行卡" }
];

export default {
    name: "member",
    data() {
        return {
            list: [], // 会员数据列表
            total: 0, // 总记录数
            currentPage: 1, // 当前页码
            pageSize: 20, // 每页显示10条数据,
            searchMap: {
                // 条件查询绑定的条件值
                cardNum: "", // 会员卡号
                name: "", // 会员姓名
                payType: "", // 支付类型
                birthday: "" // 出生日期
            },
            payTypeOptions, // 下拉框中，支付类型 payTypeOptions: payTypeOptions
            dialogFormVisible: false, // 控制对话框
            pojo: {
                // 提交的数据
                id: null,
                cardNum: "", // 会员卡号
                name: "", // 会员姓名
                birthday: "", // 会员生日
                phone: "", // 手机号码
                money: 0, // 开卡金额
                integral: 0, // 可用积分
                payType: "", // 支付类型
                address: "" // 会员地址
            },
            rules: {
                // 校验规则
                cardNum: [
                    { required: true, message: "卡号不能为空", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "姓名不能为空", trigger: "blur" }
                ],
                payType: [
                    {
                        required: true,
                        message: "支付类型不能为空",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        // 初始化获取列表数据
        this.fetchData();
    },
    // 过滤器
    filters: {
        payTypeFilter(type) {
            /* payTypeOptions.find(obj => {
                return obj.type === type
            }) */
            // 在过滤 器当中不能引用当前实例 this   this.payTypeOptions 错误的
            const payObj = payTypeOptions.find(obj => {
                return obj.type === type;
            });
            return payObj ? payObj.name : null;
        }
    },
    methods: {
        // 查询数据列表
        fetchData() {
            // 调用分页查询数据
            memberApi
                .search(this.currentPage, this.pageSize, this.searchMap)
                .then(res => {
                    const resp = res.data;
                    this.list = resp.data.rows;
                    this.total = resp.data.total;
                });

            // memberApi.getList().then(res => {
            //     this.list = res.data.data;
            // });
        },
        // 当每页显示条数改变后,被触发 , val 是最新的每页显示条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchData();
        },
        // 当页码改变后,被触发 , val 是最新的页面
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData();
        },
        // 重置按钮
        resetForm(formName) {
            // 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效
            this.$refs[formName].resetFields();
        },
        // 弹出新增窗口
        handleAdd() {
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
                // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
                this.$refs["pojoForm"].resetFields();
            });
        },
        // 提交会员表单数据
        addData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    memberApi.add(this.pojo).then(res => {
                        const resp = res.data;
                        if (resp.flag) {
                            // 新增成功，刷新列表数据
                            this.fetchData();
                            this.dialogFormVisible = false; // 关闭窗口
                        } else {
                            // 失败，来点提示信息
                            this.$message({
                                message: resp.message,
                                type: "warning"
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        // 编辑单条数据列表
        handleEdit(id) {},
        // 删除单条数据列表
        handleDelete(id) {}
    }
};
</script>

<style lang='scss' scoped>
.demo-form-inline {
    margin-top: 20px;
}
</style>