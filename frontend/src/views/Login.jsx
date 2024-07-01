import { useState } from "react";

import {
    FormControl,
    FormLabel,
    Input,
    Center,
    Stack,
    Button,
    Heading,
} from "@chakra-ui/react";

import Navbar from "../components/Navbar";

function EmailInput() {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => setInput(e.target.value);

    const isError = input === "";

    return (
        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="email@edu.ufes.br"
                type="email"
                value={input}
                onChange={handleInputChange}
            />
        </FormControl>
    );
}

function PasswordInput() {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => setInput(e.target.value);

    const isError = input === "";

    return (
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={input} onChange={handleInputChange} />
        </FormControl>
    );
}

export default function Login() {
    return (
        <>
            <Navbar />
            <Center h="50vh" maxW="1200px" mx="auto">
                <Stack spacing={4}>
                    <Heading mb={8} fontSize={"3em"}>Login</Heading>
                    <EmailInput />
                    <PasswordInput />
                    <Button colorScheme="teal">Login</Button>
                </Stack>
            </Center>
        </>
    );
}
