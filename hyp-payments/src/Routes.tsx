import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom' 

import Dashboard from './pages/Dashboard'
import History from './pages/History'

const AppRoutes = () => (
  <BrowserRouter basename="payments">
    <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/history" element={<History />}/>
    </Routes>
  </BrowserRouter>
)

export default AppRoutes