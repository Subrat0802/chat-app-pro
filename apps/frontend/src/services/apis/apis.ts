const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const endpoint = {
    SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
    SIGNIN_API: BASE_URL + "/api/v1/auth/signin",
    ME: BASE_URL + "/api/v1/auth/me"
}


export const peopleEndpoint = {
    FIND_PEOPLE: BASE_URL + "/api/v1/chat/findPeople", 
    SEND_REQUEST: BASE_URL + "/api/v1/chat/sendRequest",
}




// reqRouter.post("/sendRequest", middleware, sendRequest)
// reqRouter.get("/getAllRequest", middleware, getAllRequest);
// reqRouter.post("/acceptRequest", middleware, acceptRequest);
// reqRouter.get("/getAllFriends", middleware, getAllFriends);
// reqRouter.post("/openConversation", middleware, openConversation);
// reqRouter.post("/sendMessage", middleware, sendMessage);
// reqRouter.get("/getMessages/:conversationId", middleware, getMessages);