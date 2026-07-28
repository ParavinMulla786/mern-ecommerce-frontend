import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getMyProfileApi,
  updateProfileApi,
  changePasswordApi,
  getAllUsersApi,
  getUserByIdApi,
  updateUserApi,
  updateUserStatusApi,
  deleteUserApi,
} from "../api/userApi";

/* ======================================================
   Initial State
====================================================== */

const initialState = {
  profile: null,
  users: [],
  selectedUser: null,
  loading: false,
  success: false,
  error: false,
  message: "",
  totalUsers: 0,
  currentPage: 1,
  totalPages: 1,
};

/* ======================================================
   Get Logged In User Profile
====================================================== */

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getMyProfileApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Fetch Profile"
      );
    }
  }
);

/* ======================================================
   Update Profile
====================================================== */

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (profileData, thunkAPI) => {
    try {
      const response = await updateProfileApi(profileData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile Update Failed"
      );
    }
  }
);

/* ======================================================
   Get All Users
====================================================== */

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (params, thunkAPI) => {
    try {
      const response = await getAllUsersApi(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to Fetch Users"
      );
    }
  }
);

/* ======================================================
   Get User By ID
====================================================== */

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, thunkAPI) => {
    try {
      const response = await getUserByIdApi(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "User Not Found"
      );
    }
  }
);

/* ======================================================
   Update User Role
====================================================== */

export const changeUserRole = createAsyncThunk(
  "user/changeUserRole",
  async ({ userId, role }, thunkAPI) => {
    try {
      const response = await updateUserApi(userId, { role });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to Update Role"
      );
    }
  }
);

/* ======================================================
   Activate / Deactivate User
====================================================== */

export const changeUserStatus = createAsyncThunk(
  "user/changeUserStatus",
  async ({ userId, isActive }, thunkAPI) => {
    try {
      const response = await updateUserStatusApi(userId, isActive);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to Update Status"
      );
    }
  }
);

/* ======================================================
   Delete User
====================================================== */

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (userId, thunkAPI) => {
    try {
      const response = await deleteUserApi(userId);
      return {
        ...response,
        userId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete Failed"
      );
    }
  }
);

/* ======================================================
   Slice
====================================================== */

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ============================
         FETCH PROFILE
      ============================ */
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload.data;
        state.message = action.payload.message || "Profile Loaded";
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ============================
         UPDATE PROFILE
      ============================ */
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload.data;
        state.message = action.payload.message || "Profile Updated Successfully";
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ============================
         FETCH USERS
      ============================ */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.data || [];
        state.totalUsers = action.payload.totalUsers || 0;
        state.currentPage = action.payload.currentPage || 1;
        state.totalPages = action.payload.totalPages || 1;
        state.message = action.payload.message || "Users Loaded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ============================
         FETCH USER BY ID
      ============================ */
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.selectedUser = action.payload.data;
        state.message = action.payload.message || "User Loaded";
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ============================
         CHANGE USER ROLE
      ============================ */
      .addCase(changeUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedUser = action.payload.data;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
        if (state.selectedUser && state.selectedUser._id === updatedUser._id) {
          state.selectedUser = updatedUser;
        }
        state.message = action.payload.message || "User Role Updated";
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ============================
         CHANGE USER STATUS
      ============================ */
      .addCase(changeUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedUser = action.payload.data;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
        if (state.selectedUser && state.selectedUser._id === updatedUser._id) {
          state.selectedUser = updatedUser;
        }
        state.message = action.payload.message || "User Status Updated";
      })
      .addCase(changeUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ============================
         DELETE USER
      ============================ */
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = state.users.filter(
          (user) => user._id !== action.payload.userId
        );
        state.totalUsers = state.totalUsers > 0 ? state.totalUsers - 1 : 0;
        state.message = action.payload.message || "User Deleted Successfully";
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

/* ======================================================
   Actions
====================================================== */

export const { clearUserState, clearSelectedUser } = userSlice.actions;

/* ======================================================
   Selectors
====================================================== */

export const selectUserState = (state) => state.user;
export const selectProfile = (state) => state.user.profile;
export const selectUsers = (state) => state.user.users;
export const selectSelectedUser = (state) => state.user.selectedUser;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserSuccess = (state) => state.user.success;
export const selectUserError = (state) => state.user.error;
export const selectUserMessage = (state) => state.user.message;
export const selectTotalUsers = (state) => state.user.totalUsers;
export const selectCurrentPage = (state) => state.user.currentPage;
export const selectTotalPages = (state) => state.user.totalPages;

/* ======================================================
   Reducer
====================================================== */

export default userSlice.reducer;