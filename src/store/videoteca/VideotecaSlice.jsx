import { createSlice } from '@reduxjs/toolkit';

export const videotecaSlice = createSlice({
    name: 'videoteca',
    initialState: {
        videoteca: [],
        video: {},
        isLoading: false,
    },
    reducers: {
        set: ( state, data ) => {
            state.videoteca = data.payload;
        },
        setLoading: ( state, data ) => {
            state.isLoading = data.payload;
        },
        video: ( state, data ) => {
            state.video = data.payload;
        }
    }
})

export const { set, video, setLoading } = videotecaSlice.actions