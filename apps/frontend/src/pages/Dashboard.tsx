import { MessagesSquare, Settings, User, Users } from "lucide-react"
import Contacts from "../components/DashboardComp/Contacts"
import Messages from "../components/DashboardComp/Messages"
import { useDispatch } from "react-redux"
import { setActiveView } from "../services/redux/slices/uiStates"


const Dashboard = () => {

  const dispatch = useDispatch();
  return (
    <div className="w-full flex min-h-screen max-h-screen">
      <div className=" flex  md:flex-col items-center  pt-5 gap-3 md:bottom-0 w-[4%] bg-sky-600/90 ">
        <div onClick={() => {return dispatch(setActiveView("message"))}} className="p-3 rounded-full cursor-pointer text-white/50 bg-sky-400/30 h-fit">
          <MessagesSquare />
        </div>
        <div onClick={() => {return dispatch(setActiveView("profile"))}} className="p-3 rounded-full text-white/50 cursor-pointer bg-sky-400/30 h-fit">
          <User />
        </div>
        <div onClick={() => {return dispatch(setActiveView("requests"))}} className="p-3 rounded-full text-white/50 bg-sky-400/30 cursor-pointer h-fit">
          <Users />
        </div>
        <div onClick={() => {return dispatch(setActiveView("setting"))}} className="p-3 rounded-full text-white/50 bg-sky-400/30 h-fit cursor-pointer">
          <Settings />
        </div>

      </div>
      <div className="w-full md:w-[31%] overflow-y-scroll">
        <Contacts />
      </div>
      <div className=" w-0 md:w-[65%]">
        <Messages />
      </div>
    </div>
  )
}

export default Dashboard