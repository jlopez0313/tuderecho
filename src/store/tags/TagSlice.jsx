import { createSlice } from '@reduxjs/toolkit';

export const tagSlice = createSlice({
    name: 'tag',
    initialState: {
        tags: [],
        tag: {}
    },
    reducers: {
        set: ( state, data ) => {
            state.tags = data.payload;
        },
        tag: ( state, data ) => {
            state.tag = data.payload;
        }
    }
})

export const { set, tag } = tagSlice.actions