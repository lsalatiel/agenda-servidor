import { useState } from "react";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    useColorMode,
    Center,
    Button,
    Stack,
} from "@chakra-ui/react";

function EmailInput() {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => setInput(e.target.value);

    const isError = input === "";

    return (
        <FormControl isInvalid={isError}>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="email@edu.ufes.br"
                type="email"
                value={input}
                onChange={handleInputChange}
            />
            {!isError ? (
                <FormHelperText> We'll never share your email. </FormHelperText>
            ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
        </FormControl>
    );
}

function PasswordInput() {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => setInput(e.target.value);

    const isError = input === "";

    return (
        <FormControl isInvalid={isError}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={input} onChange={handleInputChange} />
            {!isError ? (
                <FormHelperText></FormHelperText>
            ) : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
        </FormControl>
    );
}

function Login() {
    // const { colorMode, toggleColorMode } = useColorMode();

    // let text = colorMode === "light" ? "dark" : "light";
    // <Button onClick={toggleColorMode}></Button>
    return (
        <Center h="100vh" maxW="1200px" mx="auto">
            <Stack spacing={4}>
                <EmailInput />
                <PasswordInput />
            </Stack>
        </Center>
    );
}

export default Login;
