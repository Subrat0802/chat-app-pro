/* eslint-disable @typescript-eslint/no-unused-expressions */
import Input from "@repo/ui/input";
import { useRef } from "react";
import { signup } from "../../services/apis/auth/auth";

const Signup = ({ show, setShow }: {
  show: string;
  setShow: React.Dispatch<React.SetStateAction<"signin" | "signup">>;
}) => {

  const nameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setShow("signin")
  }

  const handleSignupSubmit = async () => {

    const name = nameRef.current?.value || "";
    const username = userNameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const response = await signup({name, username, email, password});

    if (!response) {
      return;
    }
    nameRef.current && (nameRef.current.value = "");
    userNameRef.current && (userNameRef.current.value = "");
    emailRef.current && (emailRef.current.value = "");
    passwordRef.current && (passwordRef.current.value = "");
    setShow("signin")
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-full relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size-[100px_100px]"></div>
      {show === "signup"? (
        <div className="flex flex-col w-[80%] z-30 justify-center items-center gap-3">
          {/* <p className="">Sign up</p> */}
          <Input
            type="text"
            style="primary"
            placeholder="Full Name"
            ref={nameRef}
          />
          <Input
            type="text"
            style="primary"
            placeholder="Username"
            ref={userNameRef}
          />
          <Input
            type="text"
            style="primary"
            placeholder="Email"
            ref={emailRef}
          />
          <Input
            type="password"
            style="primary"
            placeholder="Password"
            ref={passwordRef}
          />
          
          <button
            onClick={handleSignupSubmit}
            className="md:text-xl w-[80%] cursor-pointer hover:-translate-y-1 hover:border-transparent hover:shadow-xs transition-all duration-300 hover:shadow-sky-600 font-semibold p-2 md:p-4 border relative group">
              Signin
            <div className="z-10  absolute w-full  opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 bg-sky-600 border-sky-600 bottom-0 left-0"></div>
          </button>
          <p onClick={handleClick} className="group cursor-pointer">Already have account? <span className="group-hover:text-sky-600">Signin</span></p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Signup;
