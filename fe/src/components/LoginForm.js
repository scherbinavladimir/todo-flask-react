import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import Api from "../api";
import api from "../api";
import {toast} from "react-toastify";

function LoginForm({closeModal}){

    const inputUsernameRef = useRef()

    useEffect(()=>{
        inputUsernameRef.current.focus()
    }, [])

    const dispatch = useDispatch()
    const authToken = useSelector(state => state.authToken)
    const username = useSelector(state => state.username)

    const [inputUsername, setInputUsername] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const submit = e =>{
        e.preventDefault()
        api.login(inputUsername, inputPassword)
            .then(data=>{
                dispatch({
                    type: "LOGIN",
                    payload: {
                        authToken: data.access_token,
                        username: inputUsername,
                }})
                closeModal()
            })
            .catch(error=>toast.error('Username or password is not correct!'))
    }

    return(
        <form onSubmit={submit}>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                    value={inputUsername}
                    onChange={e=>setInputUsername(e.target.value)}
                    ref={inputUsernameRef}
                    type="text" className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    value={inputPassword}
                    onChange={e=>setInputPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    required
                />
            </div>
            <button type="submit" className="btn btn-secondary w-100">Log In</button>
        </form>
    )
}
export default LoginForm