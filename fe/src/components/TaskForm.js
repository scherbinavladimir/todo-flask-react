import {useEffect, useRef, useState} from "react";
import { toast } from 'react-toastify';

import api from "../api";

function TaskForm({task, setVisible, loadTasks}){
    const [formData, setFormData] = useState(task || {
        username: '',
        email: '',
        text: '',
    })
    const inputUsernameRef = useRef()

    useEffect(()=>{
        inputUsernameRef.current.focus()
    }, [])

    const handleChange = e => {
        let updatedFormData = {...formData}
        updatedFormData[e.target.name] = e.target.value
        setFormData(updatedFormData)
    }
    const submit = (e) => {
        e.preventDefault()
        console.log(formData)
        let promise
        if (task) {
            promise = api.updateTask(task.id, formData)
        } else {
            promise = api.createTask(formData)
        }
        promise
            .then(()=>{
                toast.success(`Task was ${task?'updated':'created'} successfully!`)
                setVisible(false)
                loadTasks()
            })
            .catch((err)=>{
                const message = err.response? err.response.data.message.text : err.toString()
                toast.error(message)
            })
    }
    const deleteTask = ()=>{
        if (!task) return
        api.deleteTask(task.id)
            .then(()=>{
                toast.success('Task was deleted successfully!')
                setVisible(false)
                loadTasks()
            })
            .catch(()=>toast.error('Somthing went wrong!'))
    }
    return(
        <div>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input ref={inputUsernameRef} value={formData.username} disabled={task} onChange={handleChange} name="username" required type="text" className="form-control" placeholder="your name"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input value={formData.email} disabled={task} onChange={handleChange} name="email" required type="email" className="form-control" placeholder="mail@example.com"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">What to do?</label>
                    <textarea value={formData.text} onChange={handleChange} name="text"  className="form-control" rows="3"></textarea>
                </div>
                {task?
                    <div>
                        <button type="submit" className="btn btn-warning w-100 mb-3">Save</button>
                        <button type="button" onClick={deleteTask} className="btn btn-danger w-100">Delete</button>
                    </div>
                :<button type="submit" className="btn btn-warning w-100">Create</button>}
            </form>
        </div>
    )
}
export default TaskForm