import './App.css'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserProfile from './components/UserProfile'
import { UsersProvider } from './utils/UserContext';

import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <UsersProvider>

    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user/:id' element={<UserProfile />} />
       
      </Routes>
    </Router>
  
    </UsersProvider>
  )
}

export default App
