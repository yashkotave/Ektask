import { useState } from "react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="pt-20 px-5 flex justify-center items-center min-h-screen bg-gray-50">

      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border border-gray-200">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center">
          Admin{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Login
          </span>
        </h1>

        <p className="text-gray-600 text-center mt-2">
          Enter your admin credentials to continue.
        </p>

        <form className="mt-8 space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
              />

              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 text-lg rounded-xl hover:opacity-90 transition shadow-md"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}
