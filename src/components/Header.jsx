import { NavLink, Link } from "react-router-dom";
import style from "./Header.module.css";
import useScrollDirection from "../hooks/useScrollDirection"


export default function Header() {
    const scrollDirection = useScrollDirection();
    return (
        <header className={`${style.header} ${scrollDirection === "down" ? style.hide : style.show}`}>
            <Link to="/" className={style.logo}>
                <img src="logo_art.png" alt="logo L'arte del '900" />
            </Link>
            <nav className={style.nav}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/artists">Artisti</NavLink>
                <NavLink to="/works">Opere</NavLink>
                <NavLink to="/movements">Movimenti</NavLink>
            </nav>
        </header>
    )
}