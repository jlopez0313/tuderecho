import { createSlice } from '@reduxjs/toolkit';

export const publicacionSlice = createSlice({
    name: 'publicacion',
    initialState: {
        publis: [],
        post: {},
        isLoading: false,
    },
    reducers: {
        setList: ( state, data ) => {
            state.publis = data.payload;
        },
        setLoading: ( state, data ) => {
            state.isLoading = data.payload;
        },
        setPubli: ( state, data ) => {
            state.post = data.payload;
        },
    }
})

export const { setList, setPubli, setLoading, update } = publicacionSlice.actions