import { Link } from "react-router-dom"
import {Button} from "@repo/ui/button"

const Header = () => {
  return (
    <div className="flex justify-center fixed w-full bg-black text-white/80 ">
    <div className="flex justify-between items-center max-w-7xl mx-auto w-full py-3 ">
        <div className="flex gap-2 justify-center items-center">
            <p className="test-font text-3xl text-sky-600 ">Whatsup</p>
        </div>
        <div className="flex gap-3">
            <Link to={"/auth"}><Button children={"Login"} appName={""} /></Link>
            <p>Hello</p>
        </div>
    </div>
    </div>
  )
}

export default Header