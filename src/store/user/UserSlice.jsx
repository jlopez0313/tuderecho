import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        register: ( state, data ) => {
            state.user = data.payload;
        }
    }
})

export const { register } = userSlice.actions