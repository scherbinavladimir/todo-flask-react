import MyHeader from './components/MyHeader'
import TaskList from "./components/TaskList";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div data-bs-theme="dark" className="App h-100">
     <MyHeader/>
     <div className="container content">
         <TaskList/>
         <div className="d-flex flex-column align-items-center justify-content-center my-3 opacity-75" style={{fontSize: 14}}>
             <div className="fst-italic">© Vladimir Shcherbina, 2023</div>
             <div><a className="text-white" href="mailto:vvschrus@gmail.com">vvschrus@gmail.com</a></div>
         </div>
     </div>
    <ToastContainer theme="dark"/>
    </div>
  );
}

export default App;
