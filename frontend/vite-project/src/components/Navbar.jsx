import { FiLogOut } from "react-icons/fi"
import logo from "../assets/logo.png"

function Navbar() {

    const handleLogout = () => {

        localStorage.removeItem("token")

        window.location.href = "/"

    }

    return (

        <div className="bg-[#1f2a37] flex justify-between items-center px-6 py-3">

            <img src={logo} alt="logo" className="h-8" />

            <FiLogOut
                className="text-white text-xl cursor-pointer"
                onClick={handleLogout}
            />

        </div>

    )
}

export default Navbar