import { Textarea, Text, Button, Box } from "@chakra-ui/react";

import React from "react";
import { useState } from "react";

export default function SuggestionBox() {
    let [value, setValue] = React.useState("");

    let handleInputChange = (e) => {
        let inputValue = e.target.value;
        setValue(inputValue);
    };

    const [message, setMessage] = useState("");
    
    const submitSuggestion = async() => {
        const url = "http://localhost:8000/suggestions";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ suggestion: value }),
            });
            if (response.ok) {
                setValue("");
                alert("Sugestão enviada com sucesso!");
            }
        }
        catch (err) {
            console.error(err);
            setMessage("Erro ao enviar sugestão");
            return;
        }
    };

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
            {message && (
                <Text mt={4} color="cyan">
                    {message}
                </Text>
            )}
        </>
    );
}
