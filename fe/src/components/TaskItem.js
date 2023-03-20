import {useSelector} from "react-redux";
import api from "../api";
import MyModal from "./UI/MyModal";
import TaskForm from "./TaskForm";
import {useState} from "react";

function TaskItem({task, loadTasks}){
    const authToken = useSelector(state => state.authToken)

    const [showEditModal, setShowEditModal] = useState(false)
    const setCheck = (e) => {
        api.updateTask(task.id, {...task, done: !task.done})
            .then(()=>e.target.checked=!task.done)
        loadTasks()
    }

    return(
        <div className="task-item-wrap pb-3">
        <div className="task-item h-100 w-100 rounded-3 bg-secondary p-2 d-flex justify-content-start checkbox-wrapper-11">
            <div className="position-relative h-100 d-flex align-items-center ms-2 me-3 checkbox-wrapper-26">
                {authToken?
                    <div
                        onClick={()=>setShowEditModal(true)}
                        className="position-absolute top-0 start-50 translate-middle-x"><i className="bi bi-pencil"></i>
                    </div>:''
                }
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={task.done}
                    onChange={setCheck}
                    disabled={!authToken}
                    id={`checkbox-${task.id}`}
                />
                <label htmlFor={`checkbox-${task.id}`}>
                    <div className="tick_mark"></div>
                </label>
            </div>
            <div className="h-100 w-100 d-flex flex-column overflow-hidden position-relative">
                <div className="d-flex w-100 justify-content-between opacity-50">
                    <div className="me-3 fw-bold ">{task.username}</div>
                    <div className="text-truncate">{task.email}</div>
                </div>
                <div className="fs-1 flex-fill overflow-scroll"><div>{task.text}</div></div>
                {task.updated?
                    <div className="position-absolute bottom-0 end-0 fst-italic opacity-75">
                        <span className="badge bg-dark">edit by admin</span>
                    </div>:''
                }
            </div>
        </div>
            {authToken?
                <MyModal visible={showEditModal} setVisible={setShowEditModal}>
                    <TaskForm task={task} setVisible={setShowEditModal} loadTasks={loadTasks}/>
                </MyModal>
                : <div></div>
            }
        </div>
    )
}
export default TaskItem