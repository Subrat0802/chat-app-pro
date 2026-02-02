import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface User {
    name: string,
    username: string,
    email: string,
    id: string
}

interface UserState {
    user: User | null,
    loading: boolean
}

const initialState: UserState = {
    user: null,
    loading: true
} 

const userSlice = createSlice({
    name: "userState",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.loading = false;
        },
        logOut(state) {
            state.user = null;
            state.loading = false;
        }
    }
})



export const {setUser, logOut} = userSlice.actions;
export default userSlice.reducer;