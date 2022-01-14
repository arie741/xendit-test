import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
function NavBar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState();
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

  return (
    <nav className="bg-xendit">
      <ul className="flex flex-row container space-x-6 justify-end h-16">
        <li className="h-full pt-4 mr-auto">
          <NavLink to="/" className="text-xendit-lightest text-xl">
            Universities
          </NavLink>
        </li>
        <li className="h-full pt-4">
          <NavLink to="/subscribe" className="text-xendit-lightest text-xl">
            Subscribe
          </NavLink>
        </li>
        {!isLogin ? (
          <>
            <li className="h-full pt-4">
              <NavLink to="/login" className="text-xendit-lightest text-xl">
                Login
              </NavLink>
            </li>
            <li className="h-full pt-4">
              <NavLink to="/register" className="text-xendit-lightest text-xl">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="h-full pt-4">
              <NavLink to="/favorite" className="text-xendit-lightest text-xl">
                Favorites
              </NavLink>
            </li>
            <li className="h-full pt-4">
              <div
                onClick={() => logout()}
                className="cursor-pointer text-xendit-lightest text-xl"
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

export default NavBar;
