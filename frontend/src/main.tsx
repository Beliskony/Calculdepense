
import { createRoot } from 'react-dom/client'
import { Route,Routes, BrowserRouter } from 'react-router-dom'
import './index.css'
import Acceuil from './pages/Acceuil'
import Dashboard from './pages/Dashboard'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
         <Routes>
             <Route path='/' element={<Acceuil />} />
             <Route path='/dashboard' element={<Dashboard />} />
         </Routes>
  </BrowserRouter>
)
