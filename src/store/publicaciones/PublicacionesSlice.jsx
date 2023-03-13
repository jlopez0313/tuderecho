import { createSlice } from '@reduxjs/toolkit';

export const publicacionSlice = createSlice({
    name: 'publicacion',
    initialState: {
        publis: [],
        publicacion: {},
        isLoading: false,
    },
    reducers: {
        setList: ( state, data ) => {
            state.publis = data.payload;
        },
        setLoading: ( state, data ) => {
            state.isLoading = data.payload;
        },
    }
})

export const { setList, setLoading } = publicacionSlice.actions