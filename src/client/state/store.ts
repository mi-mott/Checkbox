import {configureStore } from "@reduxjs/toolkit";
import tasksReducer from './tasks/tasksSlice';
import taskEditorReducer from './taskEditor/taskEditorSlice';
import newTaskEditorSlice from './newTaskEditor/newTaskEditorSlice';
import searchBar from './searchBar/searchBarSlice';
import snackBar from './snackBar/snackBarSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        taskEditor: taskEditorReducer,
        newTaskEditor: newTaskEditorSlice,
        searchBar: searchBar,
        snackBar: snackBar
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;