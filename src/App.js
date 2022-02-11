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
          element={user ? <Home /> : <Navigate to="/mern-netflix/register" />}
        />
        <Route
          path="/mern-netflix/register"
          element={
            !user ? <Register /> : <Navigate to="/mern-netflix/mern-netflix" />
          }
        />
        <Route
          path="/mern-netflix/login"
          element={!user ? <Login /> : <Navigate to="/mern-netflix" />}
        />
        {user && (
          <>
            <Route
              path="/mern-netflix/series"
              element={<Home type="/mern-netflix/serie" />}
            />
            <Route
              path="/mern-netflix/movies"
              element={<Home type="/mern-netflix/movie" />}
            />
          </>
        )}
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
