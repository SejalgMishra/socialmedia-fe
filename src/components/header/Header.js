import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import Logo from "../../assests/social-media.png";

const Header = () => {
  return (
    <div className="header bg-light fixed z-30 w-[1300px]">
      <nav
        className="navbar navbar-expand-lg navbar-light 
            bg-light justify-between items-center"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            alignContent: "center",
          }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: "40px", height: "40px" }}
          />
          <h3 className=" text-center mb-4 text-xl font-serif" onClick={() => window.scrollTo({top : 0})}>SociableX</h3>
        </div>

        {/* <Link to="/" className="logo">
                    <h1 className="navbar-brand text-uppercase p-0 m-0"
                    onClick={() => window.scrollTo({top: 0})}>
                        V-Network
                    </h1>
                </Link> */}

        <Search />

        <Menu />
      </nav>
    </div>
  );
};

export default Header;
