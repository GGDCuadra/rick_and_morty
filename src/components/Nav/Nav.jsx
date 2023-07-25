import SearchBar from "../SearchBar/SearchBar.jsx";
import styledNav from "./Nav.module.css"
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch, access, setAccess, onRandom }) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        setAccess(false);
        navigate("/")
    }
    return (
        <nav className={styledNav.nav}>
            <button onClick={handleLogOut} className={styledNav.btnNavLink}>Log Out</button>
            <button className={styledNav.btnNavLink}><NavLink className={styledNav.navlink} activeClassName={styledNav.active} to="/about">About</NavLink></button>
            <button className={styledNav.btnNavLink}><NavLink className={styledNav.navlink}  activeClassName={styledNav.active} to='/home'>Home</NavLink></button>
            <button className={styledNav.btnNavLink}><NavLink className={styledNav.navlink}  activeClassName={styledNav.active} to='/favorites'>Favorite</NavLink></button>
            <button onClick={onRandom}>Personaje random</button>
            <SearchBar onSearch={onSearch} />

        </nav>
    )
}
export default Navbar