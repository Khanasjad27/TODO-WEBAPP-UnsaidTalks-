import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import logo from "../assets/logo.png"
import api from "../services/api"

function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleSignup = async (e) => {

    e.preventDefault()

    if (!name || !email || !password) {
      alert("All fields are required")
      return
    }

    try {

      await api.post("/api/user/signup", {
        username: name,
        email,
        password
      })

      alert("Signup successful! Please login.")

      navigate("/")

    } catch (error) {

      alert(error.response?.data?.message || "Signup failed. Please try again.")
        console.log("Signup error:", error)
    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">

      <div className="bg-[#1f2a37] text-white w-[380px] p-8 rounded-xl shadow-2xl">


        <div className="flex justify-center mb-6">
          <img src={logo} alt="UnsaidTalks" className="h-12" />
        </div>

        <h2 className="text-center text-2xl font-semibold mb-2">
          Create new account
        </h2>

        <p className="text-center text-sm text-gray-300 mb-6">
          Already have an account?
          <Link to="/" className="text-orange-400 ml-1">
            Sign in
          </Link>
        </p>

        <form onSubmit={handleSignup} className="space-y-4">

          {/* NAME */}

          <div className="relative">

            <FiUser className="absolute top-3 left-3 text-gray-400" />

            <input
              type="text"
              placeholder="Full name"
              className="w-full pl-10 p-2 rounded bg-gray-100 text-black focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          {/* EMAIL */}

          <div className="relative">

            <FiMail className="absolute top-3 left-3 text-gray-400" />

            <input
              type="email"
              placeholder="Email"
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

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded font-medium transition"
          >
            Register
          </button>

        </form>

      </div>

    </div>

  )
}

export default SignUp