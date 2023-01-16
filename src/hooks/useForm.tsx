import {useState} from 'react'

export const useForm = ( initialState : any= {} ) => {
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

    const onRadioChange = (evt: any) => {
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
