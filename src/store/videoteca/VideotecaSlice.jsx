import { createSlice } from '@reduxjs/toolkit';

export const videotecaSlice = createSlice({
    name: 'videoteca',
    initialState: {
        refresh: false
    },
    reducers: {
        setRefresh: ( state, data ) => {
            state.refresh = data.payload;
        }
    }
})

export const { setRefresh } = videotecaSlice.actions