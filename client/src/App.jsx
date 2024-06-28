
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login' 

function App() {

  return (
    <div className='w-full min-h-screen '>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
