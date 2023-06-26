import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../AppState";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { AddCountry } from "./Button";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const Nav = (props) => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const menu = () => (
    <>
      <header>
        <div className="menu">
          <ul>
            <li className="active">
              <a href="/">
                <HomeIcon sx={{ fontSize: 48 }} />
                <div>Project: Pick a Country</div>
              </a>
            </li>
            {state.token ? (
              <>
                <li>
                  <AddCountry />
                </li>
                <li className="active btn-logout">
                  <Link
                    to="/"
                    onClick={() => {
                      dispatch({ type: "logout" });
                      navigate("/");
                    }}
                  >
                    <LogoutIcon sx={{ fontSize: 48 }} />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div class="arrow">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </li>
                <li className="active btn-login">
                  <Link to="/auth/login">
                    <VpnKeyIcon sx={{ fontSize: 48 }} />
                    <div>Login/Cadastrar-se</div>
                  </Link>
                </li>

                {/* <label className="btn-login" style={{color: "#fff", fontSize: "35px"}}>{">>>>>>"}</label> */}
              </>
            )}
          </ul>
        </div>
      </header>
    </>
  );

  return menu();
};

export default Nav;
