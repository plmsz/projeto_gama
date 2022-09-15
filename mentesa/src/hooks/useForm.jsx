import { useState } from 'react'

const useForm = (initialState) => {
    const [inputForm, setInputForm] = useState(initialState)

    const onChangeInput = (event) => {
        const { value, name } = event.target
        setInputForm({ ...inputForm, [name]: value })
    }

    const clear = () => {
        setInputForm(initialState)
    }

    return { inputForm, onChangeInput, setInputForm, clear }

}

export default useForm