import './App.css'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserProfile from './components/UserProfile'
import { UsersProvider } from './utils/UserContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <UsersProvider>

    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user/:id' element={<UserProfile />} />
        {/* <Route path='/delete/:id' element={<DeleteUserPopup />} /> */}
      </Routes>
    </Router>
    <ToastContainer />
    </UsersProvider>
  )
}

export default App
