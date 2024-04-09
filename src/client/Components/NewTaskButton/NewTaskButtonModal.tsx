import { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Textarea from "@mui/joy/Textarea";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { newTask } from "../../../server/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../state/tasks/tasksSlice";
import { RootState } from "../../state/store";
import {
  resetNewTaskEditorState,
  setNewTaskEditorDesc,
  setNewTaskEditorDueDate,
  setNewTaskEditorName,
} from "../../state/newTaskEditor/newTaskEditorSlice";
import {
  activateNewSnackbar,
  setLatestActionName,
} from "../../state/snackBar/snackBarSlice";

interface NewTaskButtonModalType {
  open: boolean;
  setOpen: Function;
}

const NewTaskButtonModal = (props: NewTaskButtonModalType) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();

  const { name, description, due_date } = useSelector(
    (state: RootState) => state.newTaskEditor
  );

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Create new task</DialogTitle>
        <DialogContent>Fill in the information of the task.</DialogContent>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await newTask(name, description, due_date);

            if (response.ok) {
              dispatch(setLatestActionName(name));
              dispatch(activateNewSnackbar(true));
              dispatch(resetNewTaskEditorState());
            }

            const { id } = await response.json();

            dispatch(
              addTask({
                id,
                name,
                description,
                create_date: dayjs(),
                due_date,
              })
            );

            setOpen(false);
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    dispatch(setNewTaskEditorName(e.target.value));
                  }
                }}
                autoFocus
                required
                endDecorator={
                  <Typography level="body-xs" sx={{ ml: "auto" }}>
                    {50 - name.length} character(s) left
                  </Typography>
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Type the task description here"
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= 255) {
                    dispatch(setNewTaskEditorDesc(e.target.value));
                  }
                }}
                minRows={10}
                maxRows={10}
                endDecorator={
                  <Typography level="body-xs" sx={{ ml: "auto" }}>
                    {255 - description.length} character(s) left
                  </Typography>
                }
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={due_date}
                  onChange={(newValue) => {
                    dispatch(setNewTaskEditorDueDate(newValue || dayjs()));
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default NewTaskButtonModal;
