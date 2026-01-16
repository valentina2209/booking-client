import { useState } from "react";

function useForm(initialValue) {
    const [values, setValues] = useState(initialValue)

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues((prev) => ({ ...prev, [name]: value }))
    }
    return {
        values,
        handleChange,
        setValues
    }
}

export default useForm;