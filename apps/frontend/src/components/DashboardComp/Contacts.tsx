import { EllipsisVertical, User } from "lucide-react"
import { useRef } from "react";
import { findPeople } from "../../services/apis/auth/sendRequest";

const Contacts = () => {
    const searchFrindRef = useRef<HTMLInputElement>(null);

    const handleChange = async () => {
        const userName = searchFrindRef.current?.value as string
        if(!userName) return;
         
        const response = await findPeople(userName);
        console.log("response search people", response);
    }

  return (
    <div className="p-3 bg-[#000000] h-screen flex flex-col">
        <div className=" w-full flex justify-between items-center py-3">
            <p className="test-font text-xl md:text-xl text-sky-600">Whatsup</p>
            <EllipsisVertical />
        </div>
        <div className=" w-full py-2">
            <input onChange={handleChange} ref={searchFrindRef} className="bg-neutral-secondary-medium text-md border-2 border-default-medium text-heading  border-white/20 rounded-full focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Seacrh friends"/>
        </div>
        <div className="pt-2 flex-1 overflow-y-auto scroll-smooth bg-gray-800/10">
            <div className="flex justify-start gap-4 items-center py-2  rounded-md px-3">
                <div className="p-4 bg-gray-700 rounded-full">
                    <User />
                </div>
                <div className="text-white/70 font-semibold flex flex-col gap-0.5">
                    <p className="text-lg">Subrat Mishra</p>
                    <p>Hi</p>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Contacts