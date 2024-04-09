import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface snackBarSliceType {
    editSnackbar: boolean;
    completeSnackbar: boolean;
    addSnackbar: boolean;
    latestActionName: string;
}

const initialState: snackBarSliceType = {
    editSnackbar: false,
    completeSnackbar: false,
    addSnackbar: false,
    latestActionName: ''
}

const newTaskEditorSlice = createSlice({
    name: "searchBar",
    initialState,
    reducers: {
        activateEditSnackbar: (state, action: PayloadAction<boolean>) => {
            state.editSnackbar = action.payload;
        },
        activateCompleteSnackbar: (state, action: PayloadAction<boolean>) => {
            state.completeSnackbar = action.payload;
        },
        activateNewSnackbar: (state, action: PayloadAction<boolean>) => {
            state.addSnackbar = action.payload;
        },
        setLatestActionName: (state, action: PayloadAction<string>) => {
            state.latestActionName = action.payload;
        }
    }
});

export const { activateEditSnackbar, activateCompleteSnackbar, activateNewSnackbar, setLatestActionName } = newTaskEditorSlice.actions;
export default newTaskEditorSlice.reducer;