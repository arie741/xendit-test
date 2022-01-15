import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";

function MobileNav({ isLogin, logout }) {
  return (
    <nav>
      <ul className="block md:hidden container pb-3">
        <li className="py-3">
          <NavLink to="/subscribe" className="text-xendit-lightest text-xl">
            Subscribe
          </NavLink>
        </li>
        {!isLogin ? (
          <>
            <li className="py-3">
              <NavLink to="/login" className="text-xendit-lightest text-xl">
                Login
              </NavLink>
            </li>
            <li className="py-3">
              <NavLink to="/register" className="text-xendit-lightest text-xl text-gray-700 bg-orange-500 px-3 py-2 rounded">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="py-3">
              <NavLink to="/favorites" className="text-xendit-lightest text-xl">
                Favorites
              </NavLink>
            </li>
            <li className="py-3">
              <div
                onClick={() => logout()}
                className="cursor-pointer text-xl text-gray-700 bg-red-500 px-3 py-2 rounded text-center"
              >
                Logout
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

function MainNav({ isLogin, logout }) {
  return (
    <>
      <li className="h-full pt-4 hidden md:block">
        <NavLink to="/subscribe" className="text-xendit-lightest text-xl">
          Subscribe
        </NavLink>
      </li>
      {!isLogin ? (
        <>
          <li className="h-full pt-4 hidden md:block">
            <NavLink to="/login" className="text-xendit-lightest text-xl">
              Login
            </NavLink>
          </li>
          <li className="h-full pt-4 hidden md:block">
            <NavLink
              to="/register"
              className="text-xl text-gray-700 bg-orange-500 px-3 py-2 rounded"
            >
              Register
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="h-full pt-4 hidden md:block">
            <NavLink to="/favorite" className="text-xendit-lightest text-xl">
              Favorites
            </NavLink>
          </li>
          <li className="h-full pt-2 hidden md:block">
            <div
              onClick={() => logout()}
              className="cursor-pointer text-xl text-gray-700 bg-red-500 px-3 py-2 rounded"
            >
              Logout
            </div>
          </li>
        </>
      )}
    </>
  );
}

function NavBar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("xendit-email")) {
      setIsLogin(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem("xendit-email");
    setIsLogin(false);
    window.location.reload();
    navigate("/");
  }

  function openMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <nav className="bg-xendit">
      <ul className="flex flex-row container space-x-6 justify-end h-16">
        <li className="h-full pt-4 mr-auto">
          <NavLink to="/" className="text-xendit-lightest text-xl">
            Universities
          </NavLink>
        </li>
        <MainNav
          isLogin={isLogin}
          logout={logout}
        />
        <li className="h-full pt-4 block md:hidden">
          <div
            onClick={() => openMobileMenu()}
            className="cursor-pointer text-xendit-lightest text-xl border border-2 border-gray-300 rounded p-1"
          >
            <FiAlignJustify />
          </div>
        </li>
      </ul>

      {mobileMenuOpen && <MobileNav isLogin={isLogin} logout={logout} />}
    </nav>
  );
}

export default NavBar;
