import axios from "axios";
import store from "../store";

class Api {
    constructor(BASE_URL="") {
        this.BASE_URL = BASE_URL
    }
    _request(params, raiseErrorPopup=true) {
        if (!params.method) params.method = 'get'
        const state = store.getState()
        if (state.authToken){
            params.headers = {'Authorization': `Bearer ${state.authToken}`}
        }
        params.baseURL = this.BASE_URL
        return new Promise((resolve, reject) => {
            axios(params)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    }

    login(username, password){
        return this._request({
            method: 'post',
            url: '/api/login/',
            data: {username: username, password: password}
        })
    }
    getTaskList(page=1,perPage=3, orderby=undefined, desc=undefined){
        return this._request({
            url: '/api/task/',
            params: {
                page: page,
                limit: perPage,
                order_by: orderby,
                desc: desc
            }
        })
    }
    createTask(data){
        return this._request({
            method: 'post',
            url: '/api/task/',
            data: data,
        })
    }
    updateTask(taskId, data){
        return this._request({
            method: 'put',
            url: `/api/task/${taskId}/`,
            data: data,
        })
    }
    deleteTask(taskId){
        return this._request({
            method: 'delete',
            url: `/api/task/${taskId}/`,
        })
    }
}

const api = new Api()
export default api