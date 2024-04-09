import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

interface NewTaskEditorType {
    name: string;
    description: string;
    due_date: Dayjs;
}

const initialState: NewTaskEditorType = {
    name: '',
    description: '',
    due_date: dayjs()
}

const newTaskEditorSlice = createSlice({
    name: "newTaskEditor",
    initialState,
    reducers: {
        setNewTaskEditorName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setNewTaskEditorDesc: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setNewTaskEditorDueDate: (state, action: PayloadAction<Dayjs>) => {
            state.due_date = action.payload;
        },
        resetNewTaskEditorState : (state) => {
            state.name = '',
            state.description = '',
            state.due_date = dayjs()
        }
    }
});

export const { setNewTaskEditorName, setNewTaskEditorDesc, setNewTaskEditorDueDate, resetNewTaskEditorState } = newTaskEditorSlice.actions;
export default newTaskEditorSlice.reducer;