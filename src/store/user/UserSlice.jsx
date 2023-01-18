import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        usuarios: [],
        user: {}
    },
    reducers: {
        setLista:  ( state, data ) => {
            state.usuarios = data.payload;
        },
        register: ( state, data ) => {
            state.user = data.payload;
        }
    }
})

export const { setLista, register } = userSlice.actions