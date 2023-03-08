import { createSlice } from '@reduxjs/toolkit';

export const conferenciaSlice = createSlice({
    name: 'conferencia',
    initialState: {
        conferencias: [],
        conferencia: {},
        isLoading: false,
    },
    reducers: {
        set: ( state, data ) => {
            state.conferencias = data.payload;
        },
        setLoading: ( state, data ) => {
            state.isLoading = data.payload;
        },
        conferencia: ( state, data ) => {
            state.conferencia = data.payload;
        }
    }
})

export const { set, conferencia, setLoading } = conferenciaSlice.actions