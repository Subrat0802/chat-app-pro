import Contacts from "../components/DashboardComp/Contacts"
import Messages from "../components/DashboardComp/Messages"


const Dashboard = () => {

  
  return (
    <div className="w-full flex min-h-screen max-h-screen">
      <div className=" w-[4%] bg-sky-600/90 ">
        
      </div>
      <div className=" w-[31%] overflow-y-scroll">
        <Contacts />
      </div>
      <div className=" w-[65%]">
        <Messages />
      </div>
    </div>
  )
}

export default Dashboard