import MyHeader from './components/MyHeader'
import TaskList from "./components/TaskList";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div data-bs-theme="dark" className="App h-100">
     <MyHeader/>
     <div className="container content">
         <TaskList/>
     </div>
    <ToastContainer theme="dark"/>
    </div>
  );
}

export default App;
