import { createSlice } from '@reduxjs/toolkit';

export const comunidadesSlice = createSlice({
    name: 'comunidad',
    initialState: {
        refresh: false
    },
    reducers: {
        setRefresh: ( state, data ) => {
            state.refresh = data.payload;
        }
    }
})

export const { setRefresh } = comunidadesSlice.actions