import { Dayjs } from "dayjs";

export const completeTask = async (taskId: number) => {
    const response = await fetch("/deleteTask", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: taskId,
      }),
    });

    return response;
  };

interface NewTaskType {
    taskName: string;
    taskDesc: string;
    dueDate: Dayjs
}

export const newTask = async (taskName: string, taskDesc: string, dueDate: Dayjs) => {
    const response = await fetch("/newTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: taskName,
          taskDesc: taskDesc,
          dueDate: dueDate,
        }),
      });

    return response
}

export const editTask = async (taskName: string, taskDesc: string, dueDate: Dayjs, taskId: number) => {
  const response = await fetch("/updateTask", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName: taskName,
        taskDesc: taskDesc,
        dueDate: dueDate,
        taskId: taskId,
      }),
    });

  return response
}

export const fetchByTaskName = async (taskName: string) => {
  const response = await fetch(`/fetchByTaskName?taskName=${taskName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

  return response
}