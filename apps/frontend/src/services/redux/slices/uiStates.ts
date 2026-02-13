import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    activeView: string,
    loading: boolean
}

const initialState: UiState = {
    activeView: "message",
    loading: true
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setActiveView(state, action: PayloadAction<string>) {
            state.activeView = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    }
})

export const { setActiveView, setLoading } = uiSlice.actions;
export default uiSlice.reducer;