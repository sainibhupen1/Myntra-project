import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import "./Header.scss";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
// import Footer from "../Footer/Footer";
import myntra from "../../assets/myntra_logo.webp";
import sr from "../../assets/A.png";

import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const navigate = useNavigate();
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const { cartCount, showCart, setShowCart } = useContext(Context);

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>

            {isAuthenticated ? (
              <li>
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Log Out
                </button>
              </li>
            ) : (
              <li>
                <button id="login" onClick={() => loginWithRedirect()}>
                  Log In
                </button>
              </li>
            )}

            {isAuthenticated && (
              <li>
                <p>{user.name[4]}</p>
              </li>
            )}
          </ul>

          <div className="center" onClick={() => navigate("/")}>
            <img id="myntra" src={myntra} alt="" />
            <p>- CLONE -</p>
            <img id="sr" src={sr} alt="" />
          </div>
          <div className="right">
            <TbSearch onClick={() => setSearchModal(true)} />
            <AiOutlineHeart />
            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {searchModal && <Search setSearchModal={setSearchModal} />}
      {showCart && <Cart setShowCart={setShowCart} />}
    </>
  );
};

export default Header;
