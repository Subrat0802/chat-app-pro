import { toast } from "sonner";
import { apiConnector } from "../apiConnect";
import { peopleEndpoint } from "../apis";

const { FIND_PEOPLE, SEND_REQUEST } = peopleEndpoint;

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

    // Handle specific error cases
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


