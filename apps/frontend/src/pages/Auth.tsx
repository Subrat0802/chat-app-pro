import { useState } from "react";
import Signin from "../components/AuthComp/Signin";
import Signup from "../components/AuthComp/Signup";

const Auth = () => {
  const [show, setShow] = useState<"signin" | "signup">("signin");

  return (
    <div className="w-full min-h-screen pt-16 flex justify-center items-center">
      <div className="max-w-7xl w-full flex h-[80dvh] overflow-hidden">

        <div className="w-1/2 relative">
          <div className={`
              absolute inset-0 bg-[#0f0f0f]
              transition-all duration-700 ease-in-out
              ${show === "signup"
                  ? "translate-x-0 opacity-100 z-10"
                  : "-translate-x-full opacity-0 z-0"}
            `}
          >Signin page</div>
          <Signin show={show} setShow={setShow} />
        </div>

        <div className="w-1/2 relative">
          <div className={`absolute inset-0 bg-[#0f0f0f]
              transition-all duration-700 ease-in-out
              ${show === "signin"
                  ? "translate-x-0 opacity-100 z-10"
                  : "translate-x-full opacity-0 z-0"
              }
            `}
          >
            Signup Page
          </div>
          <Signup show={show} setShow={setShow} />
        </div>

      </div>
    </div>
  );
};

export default Auth;
