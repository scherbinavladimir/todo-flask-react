import {createStore} from 'redux'

const defaultState = {
    authToken: localStorage.getItem('authToken') || null,
    username: localStorage.getItem('username') || null
}

const reducer = (state=defaultState, action)=> {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem('authToken', action.payload.authToken)
            localStorage.setItem('username', action.payload.username)
            return {...state, authToken: action.payload.authToken, username: action.payload.username}
        case "LOGOUT":
            localStorage.removeItem('authToken')
            localStorage.removeItem('username')
            return {...state, authToken: null, username: null}
        default:
            return state
    }
}

const store = createStore(reducer)

export default store