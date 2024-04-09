import { useState } from "react";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import Grid from "@mui/material/Unstable_Grid2";
import NewTaskButtonModal from "./NewTaskButtonModal";

const NewTaskButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Grid xs="auto">
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New task
      </Button>
      <NewTaskButtonModal open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default NewTaskButton;
