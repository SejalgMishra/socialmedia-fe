import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
// import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from "../profile/Avatar";
import axiosInstance from "../../utilis/AxiosInstance";
import { data } from "autoprefixer";
// import NotifyModal from '../NotifyModal'

const Menu = () => {
  const [drop, setDrop] = useState(false);
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  console.log(useSelector((state) => state));
  const isActive = (pn) => {
    if (pn === pathname) return "text-blue-900";
  };

  const handleOpen = () => {
    setDrop(!drop);
  };

  return (
    <div className="menu">
      <nav>
        <ul className="navbar-nav flex-row">
          {navLinks.map((link, index) => (
            <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
              <Link className="nav-link" to={link.path}>
                <span className="material-icons  text-blue-500 hover:bg-yellow-200 hover:rounded-full w-full">
                  {link.icon}
                </span>
              </Link>
            </li>
          ))}

          <li className="nav-item " style={{ opacity: 1 }}>
            <span
              className="nav-link position-relative"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="material-icons  text-red-500">
                {/* style={{color: notify.data.length > 0 ? 'crimson' : ''}} */}
                favorite
              </span>

              {/* <span className="notify_length">{notify.data?.length}</span> */}
            </span>

            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
              style={{ transform: "translateX(75px)" }}
            >
              {/* <NotifyModal /> */}
            </div>
          </li>

          <li className="nav-item dropdown" style={{ opacity: 1 }}>
            <span
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="false"
              aria-expanded="false"
              onClick={handleOpen}
            >
              <Avatar src={auth.user?.avatar} size="h-8 w-8 rounded-full" />
            </span>
            {drop && (
              <div
                className=" absolute bg-inherit right-0 "
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item"
                  to={`/profile/${auth.user._id}`}
                >
                  Profile
                </Link>

                <label
                  htmlFor="theme"
                  className="dropdown-item"
                  onClick={() =>
                    dispatch({
                      type: "NOTIFY",
                      payload: !theme,
                    })
                  }
                >
                  {theme ? "Light mode" : "Dark mode"}
                </label>

                <div className="dropdown-divider"></div>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;

//onClick={() => dispatch(logout())}
