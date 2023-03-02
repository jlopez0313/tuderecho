import {useState} from 'react'

export const useForm = ( initialState = {} ) => {
    const [formState, setFormState] = useState( initialState )
    
    const onSetFormState = ( newState ) => {
        setFormState(newState)
    }

    const onInputChange = (evt, key = null) => {
        const {name, value} = evt.target;
        if ( key ) {
            setFormState({
                ...formState,
                [name]: {
                    ...formState[name],
                    [key]: value
                }
            })
        } else {
            setFormState({
                ...formState,
                [name]: value
            })
        }
    }

    const onRadioChange = (evt, key = null) => {
        const {name, value} = evt.target;
        if ( key ) {
            setFormState({
                ...formState,
                [name]: {
                    ...formState[name],
                    [key]: evt.target.checked ? value : initialState[name][key]
                }
            })
        } else {
            setFormState({
                ...formState,
                [name]: evt.target.checked ? value : initialState[name]
            })
        }
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
