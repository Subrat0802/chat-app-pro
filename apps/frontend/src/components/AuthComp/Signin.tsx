/* eslint-disable @typescript-eslint/no-unused-expressions */
import Input from "@repo/ui/input";
import { useRef } from "react";
import { signin } from "../../services/apis/auth/auth";
import { useNavigate } from "react-router-dom";

const Signin = ({
  show,
  setShow,
}: {
  show: string;
  setShow: React.Dispatch<React.SetStateAction<"signin" | "signup">>;
}) => {
  const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
      const passwordRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        setShow("signup")
    }

    const handleSigninSubmit = async () => {

        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";
      
        const response = await signin({name:"", username: "", email, password});
      
          if (!response) {
            return;
          }
          emailRef.current && (emailRef.current.value = "");
          passwordRef.current && (passwordRef.current.value = "");

          navigate("/dashboard")
          
    }
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-full">
      {show === "signin" ? (
        <div className="flex flex-col w-[80%] justify-center items-center gap-3">
          <p className="">Sign in</p>
          <p>Access your chats instantly.</p>
          <Input
            type="text"
            style="primary"
            placeholder="Email or Username"
            ref={emailRef}
          />
          <Input
          ref={passwordRef}
            type="password"
            style="primary"
            placeholder="Password"
          />
          
          <button onClick={handleSigninSubmit} className="md:text-xl w-[80%] cursor-pointer hover:-translate-y-1 hover:border-transparent hover:shadow-xs transition-all duration-300 hover:shadow-sky-600 font-semibold p-2 md:p-4 border relative group">
            Signin
            <div className="z-10  absolute w-full  opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 bg-sky-600 border-sky-600 bottom-0 left-0"></div>
          </button>
          <p onClick={handleClick} className="group cursor-pointer">Dont have an account? <span className="group-hover:text-sky-600">Signup</span></p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Signin;
