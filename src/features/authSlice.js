import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const LoginUser = createAsyncThunk("user/loginUser", async(user, thunkApi) =>{
    if(user.role === 'admin')
    {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/admin/login',{
                username: user.username,
                password: user.password
            }, {withCredentials: true} )
            return response.data;
        } catch (error) {
            if(error.response){
                const message = error.response.data.message;
                return thunkApi.rejectWithValue(message)
            }
        }
    }else{
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/login',{
                username: user.username,
                password: user.password
            }, {withCredentials: true} )
            return response.data;
        } catch (error) {
            if(error.response){
                const message = error.response.data.message;
                return thunkApi.rejectWithValue(message)
            }
        }
    }
});

export const getInfo = createAsyncThunk("user/getInfo", async(_, thunkApi) => {
    const state = thunkApi.getState();
    const user = state.auth.user;
    
    const role = user?.role;
    const token = user?.token;
    
    return { role, token };
});

export const LogOut = createAsyncThunk("user/LogOut", async() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    return {};
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(LoginUser.pending, (state) =>{
            state.isLoading = true;
        });

        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        
        builder.addCase(LoginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(LogOut.fulfilled, (state) => {
            state.user = null;
            state.isSuccess = false;
            state.isError = false;
            state.isLoading = false;
            state.message = "Logged out successfully";
        });

        // Tambahkan case untuk getInfo
        builder.addCase(getInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = {
                ...state.user,
                role: action.payload.role,
                token: action.payload.token
            };
        });

        builder.addCase(getInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});

export const {reset} = authSlice.actions;

export default authSlice.reducer;