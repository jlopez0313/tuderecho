import { createSlice } from '@reduxjs/toolkit';

export const conferenciasSlice = createSlice({
    name: 'conferencia',
    initialState: {
        refresh: false
    },
    reducers: {
        setRefresh: ( state, data ) => {
            state.refresh = data.payload;
        }
    }
})

export const { setRefresh } = conferenciasSlice.actions