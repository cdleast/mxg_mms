import request from '@/utils/request'


// 提交表单给后台进行验证是否正确
export function login(username, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

// 获取到了用户的数据
export function getUserInfo(token) {
    return request({
        url: `/user/info/${token}`,
        method: 'get'
    })
}


// 退出系统
export function logout(token) {
    return request({
        url: `/user/logout`,
        method: 'post',
        data: {
            token
        }
    })
}