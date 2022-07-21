
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavBar'

function Header() {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>User App</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/manage">
                        Manage
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">
                        Log In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
}

export default Header;