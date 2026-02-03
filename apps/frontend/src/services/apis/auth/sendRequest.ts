import { apiConnector } from "../apiConnect"
import { peopleEndpoint } from "../apis"

const { FIND_PEOPLE } = peopleEndpoint

export const findPeople = async (userName: string) => {
    try{
        const response = await apiConnector("GET", FIND_PEOPLE, null, {}, {userName})
        console.log(response);
    }catch(error){
        console.log(error);
    }
}

