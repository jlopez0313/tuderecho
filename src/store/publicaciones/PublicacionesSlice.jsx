import { createSlice } from '@reduxjs/toolkit';

export const publicacionSlice = createSlice({
    name: 'publicacion',
    initialState: {
        publis: [],
        tag: {}
    },
    reducers: {
        setList: ( state, data ) => {
            state.publis = data.payload;
        },
    }
})

export const { setList } = publicacionSlice.actions