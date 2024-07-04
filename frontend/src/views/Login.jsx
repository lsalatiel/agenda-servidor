import { useState } from "react";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Center,
    Stack,
    Button,
    Heading,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CpfInput({ value, onChange, setIsInvalid }) {
    const handleInputChange = (e) => {
        let rawValue = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
        let formattedValue = rawValue;

        if (rawValue.length > 11) {
            rawValue = rawValue.slice(0, 11); // Limit to 11 digits
        }

        if (rawValue.length > 3) {
            formattedValue = rawValue.replace(/^(\d{3})(\d)/, '$1.$2');
        }
        if (rawValue.length > 6) {
            formattedValue = formattedValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }
        if (rawValue.length > 9) {
            formattedValue = formattedValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }

        setIsInvalid(rawValue.length !== 11); // Check if the raw value length is exactly 11 digits
        onChange(formattedValue);
    };

    return (
        <FormControl isInvalid={value.replace(/\D/g, '').length !== 11}>
            <FormLabel>CPF</FormLabel>
            <Input
                placeholder="000.000.000-00"
                value={value}
                onChange={handleInputChange}
            />
            {value.replace(/\D/g, '').length !== 11 && <FormErrorMessage>CPF must contain 11 digits</FormErrorMessage>}
        </FormControl>
    );
}

function PasswordInput({ value, onChange }) {
    return (
        <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input type="password" value={value} onChange={(e) => onChange(e.target.value)} />
        </FormControl>
    );
}

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [cpfIsInvalid, setCpfIsInvalid] = useState(false);
    const [loginError, setLoginError] = useState(null); // State to hold login error
    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (field) => (value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleLogin = async () => {
        const url = "http://localhost:8000/login";
        const data = new FormData();
        data.append("username", formData.username);
        data.append("password", formData.password);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: data,
            });
            if (response.ok) {
                const responseData = await response.json();
                const token = responseData.access_token; // Adjust according to your API response structure
                localStorage.setItem("accessToken", token); // Store token in localStorage
                localStorage.setItem("username", formData.username);
                // Redirect to the dashboard or another page on successful login
                navigate("/");
            } else {
                // Handle login error
                setLoginError("Failed to login. Please check your CPF and password.");
                console.error("Error during login:", response.statusText);
            }
        } catch (error) {
            // Handle network error
            setLoginError("Network error occurred. Please try again later.");
            console.error("Error during login:", error);
        }
    };

    const isFormValid = !cpfIsInvalid && formData.password.length > 0;

    return (
        <>
            <Navbar />
            <Center h="50vh" maxW="1200px" mx="auto">
                <Stack spacing={4}>
                    <Heading mb={8} fontSize={"3em"}>Login</Heading>
                    {loginError && (
                        <Alert status="error">
                            <AlertIcon />
                            {loginError}
                        </Alert>
                    )}
                    <CpfInput value={formData.username} onChange={handleChange("username")} setIsInvalid={setCpfIsInvalid} />
                    <PasswordInput value={formData.password} onChange={handleChange("password")} />
                    <Button colorScheme="teal" onClick={handleLogin} isDisabled={!isFormValid}>Login</Button>
                </Stack>
            </Center>
        </>
    );
}
