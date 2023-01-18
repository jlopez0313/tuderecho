import {useState} from 'react'

export const useForm = ( initialState = {} ) => {
    const [formState, setFormState] = useState( initialState )

    const onSetFormState = ( newState ) => {
        setFormState(newState)
    }

    const onInputChange = (evt) => {
        const {name, value} = evt.target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onRadioChange = (evt) => {
        const {name, value} = evt.target;
        setFormState({
            ...formState,
            [name]: evt.target.checked ? value : initialState[name]
        })
    }

    const onResetForm = () => {
        setFormState( initialState )
    }

    return {
        ...formState,
        formState,
        onSetFormState,
        onRadioChange,
        onInputChange,
        onResetForm
    }
}
