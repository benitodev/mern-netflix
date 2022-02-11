import Home from "./components/home/Home";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route
          path="/mern-netflix"
          element={user ? <Home /> : <Navigate to="register" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/mern-netflix" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/mern-netflix" />}
        />
        {user && (
          <>
            <Route path="/series" element={<Home type="serie" />} />
            <Route path="/movies" element={<Home type="movie" />} />
          </>
        )}
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
