const Signup = ({ show, setShow }: {
  show: string;
  setShow: React.Dispatch<React.SetStateAction<"signin" | "signup">>;
}) => {

    const handleClick = () => {
        setShow("signin")
    }

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-full relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size-[100px_100px]"></div>
      {show === "signup"? (
        <div className="flex  flex-col z-20">
          <p className="">Signup</p>
          <input
            className="border border-white/20 p-2 rounded-xl "
            placeholder="Full Name"
          />
          <input
            className="border border-white/20 p-2 rounded-xl "
            placeholder="Username"
          />
          <input
            className="border border-white/20 p-2 rounded-xl "
            placeholder="Email or Username"
          />
          <input
            className="border border-white/20 p-2 rounded-xl "
            placeholder="Password"
          />
          <button className="md:text-xl cursor-pointer hover:-translate-y-1 hover:border-transparent hover:shadow-xs transition-all duration-300 hover:shadow-sky-600 font-semibold p-2 md:p-4 border relative group">
            SignUp
            <div className="z-10  absolute w-full  opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 bg-sky-600 border-sky-600 bottom-0 left-0"></div>
          </button>
          <button onClick={handleClick}>Signin</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Signup;
