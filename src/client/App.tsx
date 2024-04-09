import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import TaskSearchBar from "./Components/TaskSearchBar/TaskSearchBar";
import NewTaskButton from "./Components/NewTaskButton/NewTaskButton";
import dayjs from "dayjs";
import Snackbar from "@mui/joy/Snackbar";
import RecommendIcon from "@mui/icons-material/Recommend";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import { Task } from "./Components/Task/Task";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { setTasks } from "./state/tasks/tasksSlice";
import {
  activateCompleteSnackbar,
  activateEditSnackbar,
  activateNewSnackbar,
} from "./state/snackBar/snackBarSlice";

const App = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { editSnackbar, completeSnackbar, addSnackbar, latestActionName } =
    useSelector((state: RootState) => state.snackBar);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await fetch("/fetchTasks");
      const { results } = await response.json();
      dispatch(
        setTasks(
          results.map((d: any) => {
            return {
              ...d,
              create_date: dayjs(d.create_date),
              due_date: dayjs(d.due_date),
            };
          })
        )
      );
    })();
  }, []);

  return (
    <Container fixed>
      <Stack spacing={2}>
        <Grid container spacing={{ xs: 1 }}>
          <TaskSearchBar />
          <NewTaskButton />
        </Grid>
        <Grid container spacing={{ xs: 1 }}>
          {tasks.map((task) => {
            return <Task {...task} />;
          })}
        </Grid>
      </Stack>
      <Snackbar
        autoHideDuration={3000}
        open={completeSnackbar}
        size="md"
        color="success"
        onClose={(_, reason) => {
          if (reason === "clickaway") {
            return;
          }
          dispatch(activateCompleteSnackbar(false));
        }}
      >
        <Stack direction="row" gap="10px">
          <RecommendIcon />
          <Typography>
            Task {latestActionName} has been marked as complete!
          </Typography>
        </Stack>
      </Snackbar>
      <Snackbar
        autoHideDuration={3000}
        open={editSnackbar}
        size="md"
        color="success"
        onClose={(_, reason) => {
          if (reason === "clickaway") {
            return;
          }
          dispatch(activateEditSnackbar(false));
        }}
      >
        <Stack direction="row" gap="10px">
          <RecommendIcon />
          <Typography>Task {latestActionName} has been edited!</Typography>
        </Stack>
      </Snackbar>
      <Snackbar
        autoHideDuration={3000}
        open={addSnackbar}
        size="md"
        color="success"
        onClose={(_, reason) => {
          if (reason === "clickaway") {
            return;
          }
          dispatch(activateNewSnackbar(false));
        }}
      >
        <Stack direction="row" gap="10px">
          <RecommendIcon />
          <Typography>Task {latestActionName} has been added!</Typography>
        </Stack>
      </Snackbar>
    </Container>
  );
};

export { App };
