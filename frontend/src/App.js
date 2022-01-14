import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Search from "./components/pages/Search";
import Subscribe from "./components/pages/Subscribe";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import NavBar from "./components/NavBar";
import Register from "./components/pages/Register";
import Favorites from "./components/pages/Favorites";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar/>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route exact path="/subscribe" element={<Subscribe />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/favorite" element={<Favorites/>} />
            <Route exact path="/" element={<Search />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
