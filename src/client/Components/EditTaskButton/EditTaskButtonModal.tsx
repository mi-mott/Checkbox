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
import dayjs, { Dayjs } from "dayjs";
import { editTask } from "../../../server/fetchApi.js";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../state/tasks/tasksSlice.js";
import { RootState } from "../../state/store.js";
import {
  setEditorDesc,
  setEditorDueDate,
  setEditorName,
} from "../../state/taskEditor/taskEditorSlice.js";
import {
  activateEditSnackbar,
  setLatestActionName,
} from "../../state/snackBar/snackBarSlice.js";

interface EditTaskButtonModalType {
  open: boolean;
  setOpen: Function;
}

const EditTaskButtonModal = (props: EditTaskButtonModalType) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const { id, name, description, due_date } = useSelector(
    (state: RootState) => state.taskEditor
  );

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Create new task</DialogTitle>
        <DialogContent>Fill in the information of the task.</DialogContent>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            // Optimistic updates, unfortunately i don't have enough time to finish optimistic updates
            // This is just a really unsafe way of doing it without being able to go to previous state
            dispatch(
              updateTask({
                id,
                name,
                description,
                due_date,
              })
            );

            const response = await editTask(name, description, due_date, id);

            if (response.ok) {
              dispatch(setLatestActionName(name));
              dispatch(activateEditSnackbar(true));
              setOpen(false);
            }
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    dispatch(setEditorName(e.target.value));
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
                placeholder="Type in here…"
                value={description}
                onChange={(e) => dispatch(setEditorDesc(e.target.value))}
                minRows={2}
                maxRows={4}
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
                    dispatch(setEditorDueDate(newValue || dayjs()));
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

export default EditTaskButtonModal;
