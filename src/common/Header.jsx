
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ChatGPT Image 10 dic 2025, 14_34_06.png";
import Login from "../app/components/Login";
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
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                navigate(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Logo */}
        <a
          href="/"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <img src={logo} alt="Miguelitos" />
        </a>

        {/* Lado derecho */}
        <nav className="nav-right">
         <a key={NAV_LINKS_RIGHT.href}
        href={NAV_LINKS_RIGHT.href}
        className="ACCOUNT"
        onClick={(e)=>{
            e.preventDefault();
            navigate(NAV_LINKS_RIGHT.href)
        }}
        >
            {NAV_LINKS_RIGHT.label}
        </a>
        
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