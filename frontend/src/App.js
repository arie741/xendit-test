import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import Subscribe from "./components/pages/Subscribe";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav className="bg-xendit">
            <ul className="flex flex-row container space-x-10 h-16">
              <li className="h-full pt-4">
                <NavLink to="/" className='text-xendit-lightest text-xl'>Home</NavLink>
              </li>
              <li className="h-full pt-4">
                <NavLink to="/search" className='text-xendit-lightest text-xl'>Search</NavLink>
              </li>
              <li className="h-full pt-4">
                <NavLink to="/subscribe" className='text-xendit-lightest text-xl'>Subscribe</NavLink>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route exact path="/subscribe" element={<Subscribe />}/>
            <Route exact path="/search" element={<Search />}/>
            <Route exact path="/" element={<Home/>} />
            <Route exact path='*' element={<div>404 not found</div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
