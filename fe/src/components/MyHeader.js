import MyModal from "./UI/MyModal";
import {useState} from "react";
import LoginForm from "./LoginForm";
import {useDispatch, useSelector} from "react-redux";

function MyHeader() {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const dispatch = useDispatch()
    const authToken = useSelector(state => state.authToken)
    const username = useSelector(state => state.username)

    return (
        <header className="w-100 d-flex align-items-center bg-black fixed-top">
            <MyModal visible={showLoginModal} setVisible={setShowLoginModal}>
                <LoginForm closeModal={()=>setShowLoginModal(false)}/>
            </MyModal>
            <div className="container d-flex justify-content-between">
                <div className="fs-2 fw-bold fst-italic">ToDo</div>
                <div>
                {authToken
                ?
                    <div className="d-flex align-items-center">
                        <span className="me-3 fs-4 fw-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>
                            <span className="ms-2">{username}</span>
                        </span>
                        <button onClick={()=>dispatch({type: "LOGOUT"})} type="button" className="btn btn-secondary">Log Out</button>
                    </div>
                :
                    <button onClick={()=>setShowLoginModal(true)} type="button" className="btn btn-secondary">Log In</button>
                }
                </div>
            </div>
        </header>
    )
}
export default MyHeader