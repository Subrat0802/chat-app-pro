import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="flex justify-center fixed w-full bg-black/50 backdrop-blur-sm z-20  text-white/80 overflow-hidden">
    <div className="flex justify-between items-center max-w-7xl px-2 md:px-0 mx-auto w-full py-3 ">
        <div className="flex gap-2 justify-center items-center">
            <p className="test-font text-xl md:text-3xl text-sky-600 ">Whatsup</p>
        </div>
        <div className="flex gap-3">
            <Link to={"/auth"}><button className="md:text-xl cursor-pointer hover:-translate-y-1 hover:border-transparent hover:shadow-xs transition-all duration-300 hover:shadow-sky-600 font-semibold p-2 md:p-4 border relative group">
              LOGIN
            <div className="z-10  absolute w-full  opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 bg-sky-600 border-sky-600 bottom-0 left-0">
            </div>
            </button> 
            </Link>
        </div>
    </div>
    </div>
  )
}

export default Header