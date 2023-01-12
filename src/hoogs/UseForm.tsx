import {useState} from 'react'

export const UseForm = ( initialState = {} ) => {
    const [formState, setFormState] = useState( initialState )

    const onInputChange = (evt: any) => {
        const {name, value} = evt.target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onResetForm = () => {
        setFormState( initialState )
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }
}
