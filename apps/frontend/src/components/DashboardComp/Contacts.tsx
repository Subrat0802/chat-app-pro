import { EllipsisVertical, User } from "lucide-react"
import { useEffect, useRef } from "react";
import { findPeople } from "../../services/apis/auth/sendRequest";

const Contacts = () => {
    const searchFrindRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<number | null>(null)

    const handleChange = async () => {
        const userName = searchFrindRef.current?.value?.trim() as string;
        if(!userName) return;

        if(debounceRef.current){
            clearTimeout(debounceRef.current);
        }
        
        debounceRef.current = setTimeout(async () => {
            // console.log(userName);
            const response = await findPeople(userName);
            if(!response){
                return;
            }
            console.log("response search people", response.data.response);
        }, 500);
    }


    useEffect(() => {
        const id = setTimeout(handleChange, 1000);

        return () => clearTimeout(id)
    }, [])

  return (
    <div className="p-3 bg-[#000000] h-screen flex flex-col">
        <div className=" w-full flex justify-between items-center py-3">
            <p className="test-font text-xl md:text-xl text-sky-600">Whatsup</p>
            <EllipsisVertical />
        </div>
        <div className=" w-full py-2">
            <input onChange={handleChange} ref={searchFrindRef} className="bg-neutral-secondary-medium text-md border border-default-medium text-heading  border-white/20 rounded focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body focus:outline-none focus:ring-0 focus:border-sky-600  transition-all duration-200" placeholder="Seacrh friends"/>
        </div>
        <div className="pt-2 flex-1 overflow-y-auto scroll-smooth bg-gray-800/10">
            <div className="flex justify-start gap-4 items-center py-2 hover:bg-gray-900 transition-all cursor-pointer duration-200 rounded-md px-3">
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