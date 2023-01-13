import {useState} from 'react'

export const useForm = ( initialState = {} ) => {
    const [formState, setFormState] = useState( initialState )

    const onSetFormState = ( newState: {} ) => {
        setFormState(newState)
    }

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
        onSetFormState,
        onInputChange,
        onResetForm
    }
}
