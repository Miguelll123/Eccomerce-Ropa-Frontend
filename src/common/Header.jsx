
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/ChatGPT Image 10 dic 2025, 14_34_06.png";
import "../common/Header.css";
const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "About" },
];

const NAV_LINKS_RIGHT = {href:"/login", label:"Account"}

export default function Header() {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-main">
        <nav className="nav-left">
          <button onClick={() => setIsCategoryOpen(true)}>///</button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link
          to="/logo"
          className="logo"
        >
          <img src={logo} alt="Miguelitos" />
        </Link>

        {/* Lado derecho */}
        <nav className="nav-right">
          <Link to={NAV_LINKS_RIGHT.href} className="ACCOUNT">
            {NAV_LINKS_RIGHT.label}
          </Link>

          <button onClick={() => setIsCartOpen(true)}>CART</button>
          <div className="search">
            <input
              placeholder="Buscar.."
              onKeyDown={(e) => {
                if (e.key === "Enter") console.log(e.target.value);
              }}
            />
            <button aria-label="Buscar">🔍</button>
          </div>
        </nav>
      </div>
    </header>
  );
}