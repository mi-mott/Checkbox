import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Chip from "@mui/material/Chip";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import EditTaskButton from "../EditTaskButton/EditTaskButton";
import dayjs, { Dayjs } from "dayjs";
import { completeTask } from "../../../server/fetchApi";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../state/tasks/tasksSlice";
import { setEditorState } from "../../state/taskEditor/taskEditorSlice";
import {
  activateCompleteSnackbar,
  setLatestActionName,
} from "../../state/snackBar/snackBarSlice";

export interface TaskType {
  id: number;
  name: string;
  description: string;
  create_date: Dayjs;
  due_date: Dayjs;
}

const formatDate = (due_date: Dayjs) => {
  const hours = due_date.diff(dayjs(), "hour");

  if (Math.abs(hours) < 1) {
    const mins = due_date.diff(dayjs(), "minute");
    return `${mins < 0 ? "" : "in"} ${Math.abs(mins)} minute${
      Math.abs(mins) > 1 ? "s" : ""
    } ${mins < 0 ? "ago" : ""}`;
  } else if (Math.abs(hours) >= 1 && Math.abs(hours) < 24) {
    return `${hours < 0 ? "" : "in"} ${Math.abs(hours)} hour${
      Math.abs(hours) > 1 ? "s" : ""
    } ${hours < 0 ? "ago" : ""}`;
  } else {
    const day = due_date.diff(dayjs(), "day");
    return `${day < 0 ? "" : "in"} ${Math.abs(day)} day${
      Math.abs(day) > 1 ? "s" : ""
    } ${day < 0 ? "ago" : ""}`;
  }
};

const getUrgencyChip = (due_date: Dayjs) => {
  const days = due_date.diff(dayjs(), "days");
  if (days > 7) {
    return (
      <Chip
        icon={<CheckCircleIcon />}
        color="primary"
        label="Not urgent"
        variant="outlined"
        size="small"
        sx={{
          fontSize: 11,
        }}
      />
    );
  } else if (days > 0 && days <= 7) {
    return (
      <Chip
        icon={<ErrorOutlineIcon />}
        color="warning"
        label="Urgent"
        variant="outlined"
        size="small"
        sx={{
          fontSize: 11,
        }}
      />
    );
  } else {
    return (
      <Chip
        icon={<DangerousIcon />}
        color="error"
        label="Overdue"
        variant="outlined"
        size="small"
        sx={{
          fontSize: 11,
        }}
      />
    );
  }
};

export const Task = (props: TaskType) => {
  const { id, name, description, create_date, due_date } = props;
  const dispatch = useDispatch();

  const handleOpenEditor = () => {
    dispatch(
      setEditorState({
        id,
        name,
        description,
        create_date,
        due_date,
      })
    );
  };

  return (
    <Grid xs="auto">
      <Card
        variant="outlined"
        sx={{
          width: 320,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack>
            <Typography
              sx={{
                fontSize: 11,
              }}
            >
              Created on {create_date.format("ddd")},{" "}
              {create_date.format("MMM")} {create_date.format("D")} at{" "}
              {create_date.format("h")} {create_date.format("a")}
            </Typography>
          </Stack>
          <Typography>{getUrgencyChip(due_date)}</Typography>
        </Box>
        <CardContent>
          <Stack direction="row" gap="10px">
            <Typography level="title-lg">{name}</Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: 11,
            }}
          >
            Due on {due_date.format("ddd")}, {due_date.format("MMM")}{" "}
            {due_date.format("D")} at {due_date.format("h")}{" "}
            {due_date.format("a")} {formatDate(due_date)}
          </Typography>
          <Typography level="body-sm">{description}</Typography>
        </CardContent>
        <CardActions
          buttonFlex="0 1 120px"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EditTaskButton handleOpenEditor={handleOpenEditor} />
          <Button
            variant="solid"
            color="primary"
            startDecorator={<DomainVerificationIcon />}
            onClick={() => {
              completeTask(id);
              dispatch(deleteTask(id));
              dispatch(setLatestActionName(name));
              dispatch(activateCompleteSnackbar(true));
            }}
          >
            Complete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
