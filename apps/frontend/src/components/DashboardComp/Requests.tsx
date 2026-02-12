import { useEffect, useState } from "react"
import { acceptRequest, getAllRequests } from "../../services/apis/auth/sendRequest";
import { User } from "lucide-react";

interface User {
  id: string;
  username: string;
  name?: string;
  email: string;
  avatar?: string;
}

interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: string;
  createdAt: string;
  sender: User;
}

const Requests = () => {
    const [users, setUsers] = useState<FriendRequest[] | null>(null);
    const [loading, setLoading] = useState(true);
    // console.log("GET ALL REQUEST", users);
    useEffect(() => {
        const getUsersRequest = async () => {
            setLoading(true);
            const repsonse = await getAllRequests();
            setUsers(repsonse);
            setLoading(false);
        }
        getUsersRequest();
    }, []);

    if(loading) {
        return <p>Loading...</p>
    }

  return (
    <div>
        {
            users == null ? <p>No requests</p> : <div>
                {
                    users.map((el) => {
                        return <div className="w-full items-center gap-4 relative flex p-3 rounded-sm bg-gray-900" key={el.sender.id}>
                            <div className="p-3 bg-gray-950 rounded-full flex justify-center items-center">
                                <User />
                            </div>
                            <div>
                            <p className="">{el.sender.username}</p>
                            <p  className="text-white/50">{el.sender.name}</p>
                            </div>
                            <div className="right-0 absolute flex gap-2 mr-3">
                                <p onClick={() => {return acceptRequest(el.id)}} className=" bg-sky-600 rounded-full px-3 cursor-pointer transition-all duration-200 hover:bg-sky-500 py-2 text-sm">Accept</p>
                                <p onClick={() => {}} className=" bg-sky-600 rounded-full px-3 cursor-pointer transition-all duration-200 hover:bg-sky-500 py-2 text-sm">Decline</p>
                            </div>
                            
                        </div>
                    })
                }
            </div>
        }
    </div>
  )
}

export default Requests