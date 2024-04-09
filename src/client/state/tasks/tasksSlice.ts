import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../Components/Task/Task";
import { Dayjs } from "dayjs";

interface tasksState {
    tasks: Array<TaskType>;
}

interface UpdateTaskType {
    id: number;
    name: string;
    description: string;
    due_date: Dayjs;
}

const initialState: tasksState = {
    tasks: [],
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Array<TaskType>>) => {
            state.tasks = action.payload;
        },
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(t => t.id != action.payload);
        },
        updateTask: (state, action: PayloadAction<UpdateTaskType>) => {
            state.tasks = state.tasks.map(s => {
                if (s.id === action.payload.id) {
                    return {
                        ...s,
                        name: action.payload.name,
                        description: action.payload.description,
                        due_date: action.payload.due_date
                    }
                } else {
                    return s
                }
            })
        }
    }
})

export const { setTasks, addTask, deleteTask, updateTask} = tasksSlice.actions;
export default tasksSlice.reducer;