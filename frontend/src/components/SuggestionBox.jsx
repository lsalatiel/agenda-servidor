import { Textarea, Text, Button, Box } from "@chakra-ui/react"

import React from "react"

export default function SuggestionBox() {
    let [value, setValue] = React.useState("")

    let handleInputChange = (e) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }

    const submitSuggestion = () => {
        console.log(value)
        setValue("")
    }

    return (
        <>
            <Text>Deixe sua sugestão aqui:</Text>
            <Textarea
                value={value}
                onChange={handleInputChange}
                placeholder="Escreva sua sugestão aqui..."
                size="sm"
                minHeight="200px"
                minWidth="400px"
            />
            <Button onClick={submitSuggestion}>Enviar</Button>
        </>
    )
}
