import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        focus: false,
        read: false,
    },
    reducers: {
        setFocus: ( state, data ) => {
            state.focus = data.payload;
        },
        setRead: ( state, data ) => {
            state.read = data.payload;
        }
    }
})

export const { setFocus, setRead } = chatSlice.actions