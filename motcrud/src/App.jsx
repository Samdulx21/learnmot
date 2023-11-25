import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UsersPeople from './pages/users_admin/UsersPeople'
import UsersHome from './pages/UsersHome'
import UsersSettings from './pages/UsersSettings'
import UsersEdit from './components/users_crud/UsersEdit'
import AcademicLoad from './pages/academic_load/AcademicLoad'
import HomePage from './pages/HomePages'
import RegisterUser from './components/ResgisterUser'
import Login from './components/Login'
import Contact from './components/contact_me/Contact'
import {RequireToken} from './components/Auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/contact' element={ <Contact /> } />
        <Route path='/register' element={ <RegisterUser /> } />
        <Route path='/home/users' 
          element={ 
            <RequireToken>
              <UsersHome /> 
            </RequireToken> 
          } />
        <Route path='/check/users' 
          element={ 
            <RequireToken>
              <UsersPeople /> 
            </RequireToken>
          } /> 
        <Route path='/settings/users' 
          element={ 
            <RequireToken>
              <UsersSettings />
            </RequireToken>
          } />  
        <Route path='/academic/loads' 
          element={ 
            <RequireToken>
              <AcademicLoad />
            </RequireToken>
          } />
        <Route path='/requests/complaints/claims' 
          element={ 
            <RequireToken>
              <AcademicLoad />
            </RequireToken>
          } />
        <Route path='/edit/users' 
          element={ 
            <RequireToken>
              <UsersEdit /> 
            </RequireToken>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App