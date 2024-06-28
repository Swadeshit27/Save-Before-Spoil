
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login' 
import CsvUploader from './pages/CsvUploader'

function App() {

  return (
    <div className='w-full min-h-screen '>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/csvupload' element={<CsvUploader/>}/>
      </Routes>
    </div>
  )
}

export default App
