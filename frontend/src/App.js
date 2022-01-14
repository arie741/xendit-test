import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Search from "./components/pages/Search";
import Subscribe from "./components/pages/Subscribe";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav className="bg-xendit">
            <ul className="flex flex-row container space-x-6 justify-end h-16">
              <li className="h-full pt-4 mr-auto">
                <NavLink to="/" className="text-xendit-lightest text-xl">
                  Universities
                </NavLink>
              </li>
              <li className="h-full pt-4">
                <NavLink
                  to="/subscribe"
                  className="text-xendit-lightest text-xl"
                >
                  Subscribe
                </NavLink>
              </li>
              <li className="h-full pt-4">
                <NavLink
                  to="/login"
                  className="text-xendit-lightest text-xl"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route exact path="/subscribe" element={<Subscribe />} />
            <Route exact path="/login" element={<div>Login</div>} />
            <Route exact path="/" element={<Search />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
