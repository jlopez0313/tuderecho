import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        register: ( state, payload ) => {
            state.user = payload;
        }
    }
})

export const { register } = userSlice.actions