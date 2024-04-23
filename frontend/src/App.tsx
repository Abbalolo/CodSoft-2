import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./Pages/Dashboard";
import Footer from "./components/Footer";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";

import { UserContextProvider } from "./context/UserContext";
import { SearchProvider } from "./context/SearchContext";
import ProjectDetails from "./Pages/project/ProjectDetails";
import MyProjects from "./Pages/project/MyProjects";
import Profile from "./Pages/user/Profile";
import Home from "./Pages/Home";




function App() {
  return (
    <UserContextProvider>
      <SearchProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/*  */}
            <Route path="/projects/project/:projectId" element={<ProjectDetails />} />
            <Route path="/my-project" element={<MyProjects />} />
            <Route path="/profile/:userId" element={<Profile />} />
            
          </Routes>
          <Footer />
        </BrowserRouter>
      </SearchProvider>
    </UserContextProvider>
  );
}

export default App;
