import {useEffect, useState} from "react";
import api from "../api";
import TaskItem from "./TaskItem";
import PaginationBar from "./UI/PaginationBar";
import MyModal from "./UI/MyModal";
import TaskForm from "./TaskForm";

function TaskList(){
    const [tasks, setTasks] = useState([])
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [lastPageNumber, setlastPageNumber] = useState(1)

    const [sortField, setSortField] = useState(undefined)
    const [sortDesc, setSortDesc] = useState(false)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const loadTasks = ()=>{
        api.getTaskList(currentPageNumber, 3, sortField, sortDesc)
            .then(data=>{
                setTasks( data.data )
                setlastPageNumber( data.total_page )
            })
    }

    const changePage = (pageNumber)=>{
        setCurrentPageNumber(pageNumber)
    }

    const handleSort = e => {
        const targetFieldName = e.target.getAttribute('name')
        console.log(targetFieldName)
        if (targetFieldName !== sortField){
            setSortDesc(false)
            setSortField(targetFieldName)
        } else {
            setSortDesc(!sortDesc)
        }
        loadTasks()
    }

    useEffect(()=>loadTasks(),[currentPageNumber])
    return(
        <div>
            <div className="d-flex my-3">
                <div
                    name="username"
                    onClick={handleSort}
                    className={`btn btn-sm btn-secondary me-2 ${sortField==='username'?'':'opacity-50'}`}
                > username <i className="bi bi-chevron-expand"></i>
                </div>
                <div
                    name="email"
                    onClick={handleSort}
                    className={`btn btn-sm btn-secondary me-2 ${sortField==='email'?'':'opacity-50'}`}
                > email <i className="bi bi-chevron-expand"></i>
                </div>
                <div
                    name="done"
                    onClick={handleSort}
                    className={`btn btn-sm btn-secondary me-2 ${sortField==='done'?'':'opacity-50'}`}
                > done <i className="bi bi-chevron-expand"></i>
                </div>
            </div>
            <div className="task-list">
                {tasks.map(task=><TaskItem key={task.id} task={task} loadTasks={loadTasks}/>)}
            </div>
            <div className={`d-flex justify-content-center ${!lastPageNumber || lastPageNumber<2?'d-none':''}`}>
                <PaginationBar
                    goToPage={changePage}
                    currentPageNumber={currentPageNumber}
                    lastPageNumber={lastPageNumber}
                />
            </div>
            <div>
                <button onClick={()=>setShowCreateModal(true)} className="btn btn-warning w-100">Create Task <i className="bi bi-plus-circle ms-1"></i></button>
                <MyModal visible={showCreateModal} setVisible={setShowCreateModal}>
                    <TaskForm setVisible={setShowCreateModal} loadTasks={loadTasks}/>
                </MyModal>
            </div>
        </div>
    )
}
export default TaskList