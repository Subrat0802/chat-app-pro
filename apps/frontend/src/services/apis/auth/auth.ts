import axios from "axios";
import { toast } from "sonner";
import { apiConnector } from "../apiConnect";
import { endpoint } from "../apis";

const { SIGNUP_API, SIGNIN_API, ME } = endpoint;

interface SignupProps {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const signup = async ({name, username, email, password}: SignupProps) => {
  try {
    const response = await apiConnector("POST", SIGNUP_API, {name, username, email, password});
    if (response.status === 200 || response.status === 201) {
      toast.success("Account created successfully");
      return true;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.errors[0].path ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Signup failed";

      toast.error("Invalid "+message);
      console.error("Signup error:", error.response?.data);
    } else {
      toast.error("Something went wrong");
      console.error(error);
    }

    return false;
  }
};



export const signin = async ({email, password}: SignupProps) => {
  try {
    const response = await apiConnector("POST", SIGNIN_API, {email, password});
    if (response.status === 200 || response.status === 201) {
      toast.success("Signin succesfull");
      return response.data.user;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.errors[0].path ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Signin failed";

      toast.error("Invalid "+message);
      console.error("Signin error:", error.response?.data);
    } else {
      toast.error("Something went wrong");
      console.error(error);
    }

    return false;
  }
};


export const getMe = async () => {
  try {
    const response = await apiConnector("GET", ME);
    return response.data; 
  } catch (error) {
    console.log(error);
    throw error;
  }
};