import SearchBar from "../SearchBar/SearchBar.jsx";
import styledNav from "./Nav.module.css"
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch, access, setAccess }) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        setAccess(false);
        navigate("/")
    }
    return (
        <nav className={styledNav.nav}>
            <button onClick={handleLogOut} className={styledNav.btnNavLink}>Log Out</button>
            <button className={styledNav.btnNavLink}><Link className={styledNav.btnLink}to="/about">About</Link></button>
            <button className={styledNav.btnNavLink}><Link className={styledNav.btnLink} to='/home'>Home</Link></button>
            <button className={styledNav.btnNavLink}><Link className={styledNav.btnLink} to='/favorites'>Favorite</Link></button>
            <SearchBar onSearch={onSearch} />

        </nav>
    )
}
export default Navbar