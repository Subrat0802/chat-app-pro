import { toast } from "sonner";
import { apiConnector } from "../apiConnect";
import { peopleEndpoint } from "../apis";

const { FIND_PEOPLE, SEND_REQUEST, GET_ALL_REQUESTS, ACCEPT_REQUESTS, GET_ALL_FRIENDS, OPEN_CONVO } = peopleEndpoint;

export const findPeople = async (userName: string) => {
  try {
    if (!userName || userName.trim() === "") {
      toast.error("Please enter a username to search");
      return null;
    }

    const response = await apiConnector(
      "GET",
      FIND_PEOPLE,
      null,
      {},
      { userName },
    );

    if (!response?.data) {
      toast.error("Failed to fetch users");
      return null;
    }

    return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error finding people:", error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to search for users";

    toast.error(errorMessage);
    return null;
  }
};

export const sendRequest = async (receiverId: string) => {
  try {
    if (!receiverId || receiverId.trim() === "") {
      toast.error("Invalid user selected");
      return { success: false };
    }

    const response = await apiConnector("POST", SEND_REQUEST, { receiverId });

    if (!response?.data) {
      toast.error("No response from server");
      return { success: false };
    }

    if (!response.data.success) {
      const errorMessage = response.data.message || "Request not sent";
      toast.error(errorMessage);
      return { success: false };
    }

    toast.success(response.data.message || "Request sent!");
    return { success: true };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error sending request:", error);

    if (error?.response?.status === 404) {
      toast.error(error.response.data?.message || "User not found");
    } else if (error?.response?.status === 403) {
      toast.error("You don't have permission to send this request");
    } else if (error?.response?.status === 500) {
      toast.error("Server error. Please try again later");
    } else if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error?.message) {
      toast.error(error.message);
    } else {
      toast.error("Failed to send request. Please try again");
    }

    return { success: false };
  }
};




export const getAllRequests = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_REQUESTS);
    console.log("GET_ALL_REQUESTS", response);

    if (!response?.data) {
      toast.error("Failed to fetch friend requests");
      return null;
    }

    if (!response.data.success) {
      toast.error(response.data.message || "Failed to fetch requests");
      return null;
    }
    return response.data.response || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching friend requests:", error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to load friend requests";

    toast.error(errorMessage);
    return null;
  }
};


export const acceptRequest = async (requestId: string) => {
  try{
    const response = await apiConnector("POST", ACCEPT_REQUESTS, {requestId});
    console.log("Request accepted", response);
  }catch(error){
    console.log("error", error);
  }
}


export const getAllFriends = async () => {
  try{
    const response = await apiConnector("GET", GET_ALL_FRIENDS)
    console.log("get all friends", response);

    return response.data.friends;
  }catch(error){
    console.log("Error get all friends", error);
  }
}


export const openConvo = async (friendId: string) => {
  try{
    const response = await apiConnector("POST", OPEN_CONVO, {friendId})
    console.log("OPN CONVO", response.data);
    return response.data
  }catch(error){
    console.log(error);
  }
}