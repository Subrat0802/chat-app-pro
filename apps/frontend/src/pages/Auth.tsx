import { useState } from "react";
import Signin from "../components/AuthComp/Signin";
import Signup from "../components/AuthComp/Signup";

const Auth = () => {
  const [show, setShow] = useState<"signin" | "signup">("signin");

  return (
    <div className="w-full min-h-screen pt-16 flex justify-center items-center bg-black">
      <div className="max-w-7xl w-full flex h-[80dvh] overflow-hidden rounded-3xl shadow-2xl shadow-sky-500/20 bg-zinc-900 border border-zinc-800">

        {/* Left Side - Signin */}
        <div className="w-1/2 relative">
          {/* Animated Background Panel */}
          <div className={`
              absolute inset-0 bg-linear-to-br from-sky-600 to-sky-800 rounded-3xl
              transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${show === "signup"
                  ? "translate-x-0 opacity-100 scale-100 z-10"
                  : "-translate-x-full opacity-0 scale-95 z-0"}
            `}
          >
            <div className={`
              flex flex-col justify-center items-center h-full w-full gap-4 px-12 text-white
              transition-all duration-500 delay-150
              ${show === "signup" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <p className="text-5xl font-bold tracking-tight">Create your account</p>
              <p className="text-lg font-medium opacity-90 leading-relaxed">
                Join the conversation. Chat securely with people who matter.
              </p>
              <p className="text-base opacity-80 leading-relaxed">
                No spam. No noise. Just real conversations.
              </p>
            </div>
          </div>
          
          {/* Signin Component */}
          <div className={`
            absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${show === "signin" 
              ? "opacity-100 scale-100 z-10" 
              : "opacity-0 scale-95 z-0 pointer-events-none"}
          `}>
            <Signin show={show} setShow={setShow} />
          </div>
        </div>

        {/* Right Side - Signup */}
        <div className="w-1/2 relative">
          {/* Animated Background Panel */}
          <div className={`
              absolute inset-0 bg-linear-to-br from-sky-600 to-sky-800 rounded-3xl
              transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${show === "signin"
                  ? "translate-x-0 opacity-100 scale-100 z-10"
                  : "translate-x-full opacity-0 scale-95 z-0"
              }
            `}
          >
            <div className={`
              flex flex-col justify-center items-center h-full w-full gap-4 px-12 text-white
              transition-all duration-500 delay-150
              ${show === "signin" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-5xl font-bold tracking-tight">Welcome back</p>
              <p className="text-lg font-medium opacity-90 leading-relaxed">
                Sign in to continue your conversations and stay connected.
              </p>
              <p className="text-base opacity-80 leading-relaxed">
                Secure, fast, and private messaging — just the way it should be.
              </p>
            </div>
          </div>
          
          {/* Signup Component */}
          <div className={`
            absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${show === "signup" 
              ? "opacity-100 scale-100 z-10" 
              : "opacity-0 scale-95 z-0 pointer-events-none"}
          `}>
            <Signup show={show} setShow={setShow} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;