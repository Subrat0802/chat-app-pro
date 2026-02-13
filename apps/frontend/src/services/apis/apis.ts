const BASE_URL = "http://localhost:3001";

export const endpoint = {
    SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
    SIGNIN_API: BASE_URL + "/api/v1/auth/signin",
    ME: BASE_URL + "/api/v1/auth/me"
}


export const peopleEndpoint = {
    FIND_PEOPLE: BASE_URL + "/api/v1/chat/findPeople", 
    SEND_REQUEST: BASE_URL + "/api/v1/chat/sendRequest",
    GET_ALL_REQUESTS:BASE_URL + "/api/v1/chat/getAllRequest", //acceptRequest
    ACCEPT_REQUESTS: BASE_URL + "/api/v1/chat/acceptRequest",
    GET_ALL_FRIENDS: BASE_URL + "/api/v1/chat/getAllFriends", 
    OPEN_CONVO: BASE_URL + "/api/v1/chat/openConversation"
}




// reqRouter.post("/sendRequest", middleware, sendRequest)
// reqRouter.get("/getAllRequest", middleware, getAllRequest);
// reqRouter.post("/acceptRequest", middleware, acceptRequest);
// reqRouter.get("/getAllFriends", middleware, getAllFriends);
// reqRouter.post("/openConversation", middleware, openConversation);
// reqRouter.post("/sendMessage", middleware, sendMessage);
// reqRouter.get("/getMessages/:conversationId", middleware, getMessages);