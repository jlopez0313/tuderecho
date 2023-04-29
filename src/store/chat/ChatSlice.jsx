import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        socket: null,
        onlineUsers: []
    },
    reducers: {
        setSocket: ( state, data ) => {
            state.socket = data.payload;
        },
        setConectados: ( state, data ) => {
            state.onlineUsers = data.payload;
        },
    }
})

export const { setSocket, setConectados } = chatSlice.actions
