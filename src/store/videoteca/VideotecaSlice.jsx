import { createSlice } from '@reduxjs/toolkit';

export const videotecaSlice = createSlice({
    name: 'videoteca',
    initialState: {
        videoteca: [],
        video: {}
    },
    reducers: {
        set: ( state, data ) => {
            state.videoteca = data.payload;
        },
        video: ( state, data ) => {
            state.video = data.payload;
        }
    }
})

export const { set, conferencia } = videotecaSlice.actions