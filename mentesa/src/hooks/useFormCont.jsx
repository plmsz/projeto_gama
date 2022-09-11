import { useState } from 'react'

const useFormCont = (initialState) => { 
    const [ form, setForm ] = useState(initialState)

    const inputChange = (event) => {
        const { value, name } = event.target
        setForm({ ...form, [name]: value })
    }

    const clear = () => {
        setForm(initialState)
    }

    return { form, inputChange, clear, setForm }

}

export default useFormCont
// Hooks = Este Hooks é chamado toda vez que for usar o formulario useForm.
// Clear = limpa um texto após o usuario digitar
// InputChange = Só acontecerá uma determinada ação ou mudança a partir um clique dentro do campo input.