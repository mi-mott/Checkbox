import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../Components/Task/Task";
import dayjs, { Dayjs } from "dayjs";

const initialState: TaskType = {
    id: -1,
    name: '',
    description: '',
    create_date: dayjs(),
    due_date: dayjs()
}

const editorSlice = createSlice({
    name: "taskEditor",
    initialState,
    reducers: {
        setEditorState: (state, action: PayloadAction<TaskType>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.description = action.payload.description;
            state.create_date = action.payload.create_date;
            state.due_date = action.payload.due_date;
        },
        setEditorName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEditorDesc: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setEditorDueDate: (state, action: PayloadAction<Dayjs>) => {
            state.due_date = action.payload;
        }
    }
});

export const { setEditorState, setEditorName, setEditorDesc, setEditorDueDate } = editorSlice.actions;
export default editorSlice.reducer;