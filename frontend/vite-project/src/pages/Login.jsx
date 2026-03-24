import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import logo from "../assets/logo.png"
import api from "../services/api"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }

    try {

      const res = await api.post("/api/user/login", {
        email,
        password
      })

      localStorage.setItem("token", res.data.token)

      navigate("/dashboard")

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login failed. Please try again."
      )

    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">

      <div className="bg-[#1f2a37] text-white w-[380px] p-8 rounded-xl shadow-2xl">

        {/* LOGO */}

        <div className="flex justify-center mb-6">
          <img src={logo} alt="UnsaidTalks" className="h-12" />
        </div>

        <h2 className="text-center text-2xl font-semibold mb-2">
          Login
        </h2>

        <p className="text-center text-sm text-gray-300 mb-6">
          Don't have an account?
          <Link to="/signup" className="text-orange-400 ml-1">
            Register here
          </Link>
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}

          <div className="relative">

            <FiMail className="absolute top-3 left-3 text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 p-2 rounded bg-gray-100 text-black focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* PASSWORD */}

          <div className="relative">

            <FiLock className="absolute top-3 left-3 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 p-2 rounded bg-gray-100 text-black focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* TOGGLE ICON */}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded font-medium transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  )

}

export default Login