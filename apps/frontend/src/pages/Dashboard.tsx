import { MessagesSquare, Settings, User, Users } from "lucide-react"
import Contacts from "../components/DashboardComp/Contacts"
import Messages from "../components/DashboardComp/Messages"
import { useDispatch, useSelector } from "react-redux"
import { setActiveView } from "../services/redux/slices/uiStates"
import type { RootState } from "../main"
import { useEffect, useState } from "react"

const Dashboard = () => {
  const dispatch = useDispatch();
  const hasConversation = !!useSelector(
    (state: RootState) => state.msgState.currentConversation
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 600); 
    };

    checkScreen(); 
    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  return (
    <div className="w-full flex min-h-screen max-h-screen relative lg:static">


      {<div className={`${hasConversation && isMobile ? "opacity-0": "opacity-100"} flex absolute lg:static w-full bottom-0 justify-around lg:justify-start lg:items-center lg:flex-col items-center py-3 lg:pt-5 gap-3 lg:w-[4%] bg-sky-600/90 z-20`}>
        <div onClick={() => dispatch(setActiveView("message"))} className="lg:p-3 rounded-full cursor-pointer text-white/50 lg:bg-sky-400/30 h-fit">
          <MessagesSquare />
        </div>
        <div onClick={() => dispatch(setActiveView("profile"))} className="lg:p-3 rounded-full text-white/50 cursor-pointer lg:bg-sky-400/30 h-fit">
          <User />
        </div>
        <div onClick={() => dispatch(setActiveView("requests"))} className="lg:p-3 rounded-full text-white/50 lg:bg-sky-400/30 cursor-pointer h-fit">
          <Users />
        </div>
        <div onClick={() => dispatch(setActiveView("setting"))} className="lg:p-3 rounded-full text-white/50 lg:bg-sky-400/30 h-fit cursor-pointer">
          <Settings />
        </div>
      </div>}


      <div className={`overflow-y-scroll overflow-x-hidden transition-all duration-200 lg:w-[31%] ${hasConversation ? "hidden lg:block" : "w-full"}`}>
        <Contacts />
      </div>


      <div className={`lg:w-[65%] transition-all duration-200 ${hasConversation ? "fixed inset-0 z-10 w-full lg:relative lg:inset-auto" : "w-0 opacity-0 lg:opacity-100 lg:w-[65%]"}`}>
        <Messages />
      </div>

    </div>
  )
}

export default Dashboard


