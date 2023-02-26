import { createSlice } from '@reduxjs/toolkit';

export const conferenciaSlice = createSlice({
    name: 'conferencia',
    initialState: {
        conferencias: [],
        conferencia: {}
    },
    reducers: {
        set: ( state, data ) => {
            state.conferencias = data.payload;
        },
        conferencia: ( state, data ) => {
            state.conferencia = data.payload;
        }
    }
})

export const { set, conferencia } = conferenciaSlice.actions