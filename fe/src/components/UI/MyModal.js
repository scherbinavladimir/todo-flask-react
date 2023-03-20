import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

function MyModal({children, visible, setVisible}){


    return(
        <div>
        {visible ?
            <div className="position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center"
                 style={{backgroundColor: 'rgba(0,0,0,0.25)'}}
                 onClick={()=>setVisible(false)}>
                <div className="bg-dark p-4 rounded-3 text-white opacity-100 position-relative" onClick={e=>e.stopPropagation()}>
                    <div onClick={()=>setVisible(false)} className="position-absolute end-0 top-0 mt-2 me-3"><i className="bi bi-x-lg"></i></div>
                    <div className="modal-content opacity-1">
                        {children}
                    </div>
                </div>
            </div>
            :
            <div></div>
        }
        </div>
    )
}
export default MyModal