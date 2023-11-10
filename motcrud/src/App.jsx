import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UsersSettings from './pages/users/UsersSettings'
import UsersPeople from './pages/users/UsersPeople'
import UsersHome from './pages/users/UsersHome'
import UsersEdit from './components/users_crud/UsersEdit'
import AcademicLoad from './pages/academic_load/AcademicLoad'
import HomePage from './pages/Homepages'
import Login from './components/Login'
import {RequireToken} from './components/Auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/home/users' 
          element={ 
            <RequireToken>
              <UsersHome /> 
            </RequireToken> } />
        {/* <Route path='/check/users' element={ <UsersPeople /> } /> 
        <Route path='/settings/users' element={ <UsersSettings /> } />
        <Route path='/academic/loads' element={ <AcademicLoad /> } />
        <Route path='/edit/users' element={ <UsersEdit /> } /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App