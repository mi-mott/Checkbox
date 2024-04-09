import { useEffect, useState } from "react";
import FormControl from "@mui/joy/FormControl";
import Autocomplete from "@mui/joy/Autocomplete";
import CircularProgress from "@mui/joy/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import dayjs from "dayjs";
import Snackbar from "@mui/joy/Snackbar";
import Stack from "@mui/material/Stack";
import RecommendIcon from "@mui/icons-material/Recommend";
import Typography from "@mui/joy/Typography";
import { fetchByTaskName } from "../../../server/fetchApi";
import { useDebouncedCallback } from "use-debounce";
import { Task, TaskType } from "../Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Container } from "@mui/material";
import {
  setOpen,
  setModal,
  setLoading,
  setOptions,
  pickOption,
} from "../../state/searchBar/searchBarSlice";

export default function AsyncTaskSearchBar() {
  const dispatch = useDispatch();

  const { open, modal, isLoading, options, chosenOption } = useSelector(
    (state: RootState) => state.searchBar
  );

  useEffect(() => {
    (async () => {
      const response = await fetch("/fetchTasks");
      const { results } = await response.json();
      dispatch(setOptions(results));
    })();
  }, []);

  const debounced = useDebouncedCallback(async (value: string) => {
    setLoading(true);
    const response = await fetchByTaskName(value);
    const { results } = await response.json();
    dispatch(setOptions(results));
    dispatch(setLoading(false));
  }, 500);

  return (
    <Grid xs="auto">
      <FormControl id="asynchronous-demo">
        <Autocomplete
          sx={{ width: 360 }}
          disableClearable
          placeholder="Search for a task"
          open={open}
          onOpen={() => {
            dispatch(setOpen(true));
          }}
          onClose={() => {
            dispatch(setOpen(false));
          }}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={options}
          loading={isLoading}
          endDecorator={
            isLoading ? (
              <CircularProgress
                size="sm"
                sx={{ bgcolor: "background.surface" }}
              />
            ) : null
          }
          onChange={(_, value) => {
            // This is okay because the value cannot be picked if there are no options
            const typedValue = {
              ...value,
              create_date: dayjs(value?.create_date),
              due_date: dayjs(value?.due_date),
            } as TaskType;
            dispatch(pickOption(typedValue));
            setModal(true);
          }}
          onInputChange={async (e) => {
            setLoading(true);
            const target = e.target as HTMLInputElement;
            const value = target.value;
            await debounced(value);
          }}
        />
      </FormControl>
      <Modal open={modal} onClose={() => setModal(false)}>
        <ModalDialog>
          <Task {...chosenOption} />
        </ModalDialog>
      </Modal>
    </Grid>
  );
}
