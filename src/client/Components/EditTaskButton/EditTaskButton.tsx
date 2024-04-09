import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import EditTaskButtonModal from "./EditTaskButtonModal";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/joy/IconButton";

interface EditTaskButtonType {
  handleOpenEditor: Function;
}

const EditTaskButton = (props: EditTaskButtonType) => {
  const { handleOpenEditor } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Grid xs="auto">
      <IconButton
        variant="outlined"
        onClick={() => {
          setOpen(true);
          handleOpenEditor();
        }}
        color="neutral"
        sx={{ mr: "auto" }}
      >
        <EditIcon />
      </IconButton>
      <EditTaskButtonModal open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default EditTaskButton;
