import request from '@/utils/request'

export default {
    // 获取供应商列表数据
    getList() {
        return request({
            url: '/supplier/list',
            method: 'get'
        })
    },

    // 分页搜索方法
    // page 当前页码, size每页查询条数, searchMap条件查询的条件值
    search(page, size, searchMap) {
        return request({
            url: `/supplier/list/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },

    // 新增供应商
    add(pojo) {
        return request({
            url: '/supplier',
            method: 'post',
            data: pojo
        })
    },

    // 通过ID查询供应商信息
    getById(id) {
        return request({
            url: `/supplier/${id}`,
            method: 'get'
        })
    },

    // 更新供应商操作
    update(pojo) {
        return request({
            url: `/supplier/${pojo.id}`,
            method: 'put',
            data: pojo
        })
    },

    // 删除供应商
    deleteById(id) {
        return request({
            url: `/supplier/${id}`,
            method: 'delete'
        })
    }
}