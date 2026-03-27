import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { apiRequest } from "../../api/api"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const response = await apiRequest("auth", "/login", {
        method: "POST",
        body: { email, password },
      });


      if (response && response.token) {
        localStorage.setItem("token", response.token);
        

        navigate("/", { replace: true });
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {

      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-dark min-h-screen flex items-center justify-center font-display antialiased p-4">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        <div className="w-full bg-[#1C3340] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-white/5 p-7">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center w-44 h-44 object-contain">
              <img src={assets.logo2} alt="Chillify's logo" />
            </div>
          </div>

          <h2 className="text-white text-2xl font-bold text-center mb-6">Welcome Back</h2>

          {}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-5 text-center">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-slate-200 text-sm font-semibold leading-normal">
                Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5f768c] text-xl">
                  mail
                </span>
                <input
                  className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-700 bg-slate-800/50 focus:border-primary h-12 pl-12 pr-4 placeholder:text-slate-500 text-base font-normal transition-all"
                  placeholder="Enter your email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-200 text-sm font-semibold leading-normal">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5f768c] text-xl">
                  lock
                </span>
                <input
                  className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-700 bg-slate-800/50 focus:border-primary h-12 pl-12 pr-4 placeholder:text-slate-500 text-base font-normal transition-all"
                  placeholder="Enter your password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-3 space-y-5">
              <button 
                type="submit"
                disabled={loading}
                className={`flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-hover text-white text-base font-bold transition-colors shadow-md shadow-primary/10 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="truncate">{loading ? "Logging in..." : "Login"}</span>
              </button>

              <div className="text-center">
                <p className="text-slate-400 text-sm font-medium">
                  Don't have an account?
                  <Link
                    className="text-primary hover:text-hover font-bold ml-1 transition-colors"
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;