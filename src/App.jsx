import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import { useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import App from './pages/App'
import Alumni from './pages/Alumni'
import Blogs from './pages/Blogs'
import Contact from './pages/Contact'
import Donate from './pages/Donate'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Sponsors from './pages/Sponsors'
import Team from './pages/Team'
import NotFound from './pages/NotFound'
import Admin from './components/Admin'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import PendingApproval from './components/PendingApproval'
import { AlertProvider } from './contexts/AlertContext'

//App Router with Layout wrapping regular pages and Admin page without layout
function AppRouter() {
  const navigate = useNavigate()
  return (
    <AlertProvider>
      <Routes>
      {/* Auth routes without layout */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login onLogin={() => navigate('/admin')} />} />
      <Route path="/pending-approval" element={<PendingApproval />} />
      {/* Removed confirm-email route - email confirmation not required anymore */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Regular routes with layout */}
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<App />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/team" element={<Team />} />
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      } />
    </Routes>
    </AlertProvider>
  )
}

export default AppRouter