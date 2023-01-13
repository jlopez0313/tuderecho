import { createSlice } from '@reduxjs/toolkit';

export const tagSlice = createSlice({
    name: 'tag',
    initialState: {
        tags: [],
        tag: {}
    },
    reducers: {
        set: ( state, data: any ) => {
            state.tags = data.payload;
        },
        tag: ( state, data: any ) => {
            state.tag = data.payload;
        }
    }
})

export const { set, tag } = tagSlice.actions