import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <Link
                to="/dashboard"
                className="logo"
            >
                Task Manager
            </Link>

            <div className="nav-right">

                <span>
                    Hello, {user?.name}
                </span>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;