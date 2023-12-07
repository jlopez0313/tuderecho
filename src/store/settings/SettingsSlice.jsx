import { createSlice } from '@reduxjs/toolkit';
import { getSettings } from '@/helpers/helpers';

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        settings: getSettings()
    },
    reducers: {
        set: ( state, data ) => {
            state.settings = data.payload;
        }
    }
})

export const { set } = settingsSlice.actions