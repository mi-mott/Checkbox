import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
import { TaskType } from "../../Components/Task/Task";

interface searchBarSliceType {
    open: boolean;
    modal: boolean;
    isLoading: boolean;
    options: Array<TaskType>;
    chosenOption: TaskType;
}

const initialState: searchBarSliceType = {
    open: false, 
    modal: false,
    isLoading: false,
    options: [],
    chosenOption: {
        id: -1,
        name: "",
        description: "",
        create_date: dayjs(),
        due_date: dayjs(),
    }
}

const newTaskEditorSlice = createSlice({
    name: "searchBar",
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setModal: (state, action: PayloadAction<boolean>) => {
            state.modal = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setOptions: (state, action: PayloadAction<Array<TaskType>>) => {
            state.options = action.payload
        },
        pickOption: (state, action: PayloadAction<TaskType>) => {
            state.chosenOption = action.payload
        },
    }
});

export const { setOpen, setModal, setLoading, setOptions, pickOption } = newTaskEditorSlice.actions;
export default newTaskEditorSlice.reducer;