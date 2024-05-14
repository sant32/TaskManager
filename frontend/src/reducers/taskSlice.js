import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Backend URL
const backendUrl = "http://localhost:5000";

// Thunk to fetch tasks from the backend
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    console.log("Fetching tasks...");
    const response = await axios.get(`${backendUrl}/api/tasks`);
    console.log("Fetched tasks:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw error;
  }
});

// Thunk to delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      await axios.delete(`${backendUrl}/api/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      console.error("Error deleting task:", error.message);
      throw error;
    }
  }
);

// Thunk to add a new task
export const addTask = createAsyncThunk("tasks/addTask", async (taskName) => {
  try {
    const response = await axios.post(`${backendUrl}/api/tasks/add`, {
      name: taskName,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error.message);
    throw error;
  }
});

// Thunk to update an existing task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskData }) => {
    try {
      await axios.put(`${backendUrl}/api/tasks/update/${taskId}`, taskData);
      return { taskId, taskData };
    } catch (error) {
      console.error("Error updating task:", error.message);
      throw error;
    }
  }
);

// Initial state of the tasks slice
const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

// Slice for managing tasks state
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTasks.pending, (state) => {
        console.log("Fetching tasks is pending...");
        state.status = "loading";
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const { taskId, taskData } = action.payload;

        state.tasks = state.tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, ...taskData };
          }

          return task;
        });
      });
  },
});

export default taskSlice.reducer;
