import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UsersSettings from './pages/users/UsersSettings'
import UsersPeople from './pages/users/UsersPeople'
import UsersHome from './pages/users/UsersHome'
import UsersEdit from './components/users_crud/UsersEdit'
import HomePage from './pages/Homepages'
import Login from './components/login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/home/users' element={ <UsersHome /> } />
        <Route path='/check/users' element={ <UsersPeople /> } /> 
        <Route path='/settings/users' element={ <UsersSettings /> } />
        <Route path='/edit/users' element={ <UsersEdit /> } />
        <Route path='/login' element={ <Login /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App