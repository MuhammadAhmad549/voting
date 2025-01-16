import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import PartyVote from './pages/vote';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import About from './pages/About';
import Navbar from './Components/Navbar';
import AdminDashboard from './pages/AdminPage';
import AdminLogin from './Components/AdminLogin';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About us/>}/>
          <Route path="/vote/:partyId" element={<PartyVote />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
