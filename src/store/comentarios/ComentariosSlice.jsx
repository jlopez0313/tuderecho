import { createSlice } from '@reduxjs/toolkit';

export const comentariosSlice = createSlice({
    name: 'publicacion',
    initialState: {
        comentarios: [],
        comentario: {},
        isLoading: false,
    },
    reducers: {
        setList: ( state, data ) => {
            state.comentarios = data.payload;
        },
        setLoading: ( state, data ) => {
            state.isLoading = data.payload;
        },
    }
})

export const { setList, setLoading } = comentariosSlice.actions