import {
    // Image,
    Flex,
    Button,
    HStack,
    // Link,
    chakra,
    VStack,
    Text,
    useColorMode,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { WiMoonWaxingCrescent4 } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { IoMdHome } from "react-icons/io";
import React from "react";
import SideDrawer from "./SideDrawer";

import { getAccessToken } from "../utils/auth";
import { clearAccessToken } from "../utils/auth";
import { getUsername } from "../utils/auth";

function LoginStack() {
    const [name, setName] = useState(null);
    const [authenticated, setAuthenticated] = useState(!!getAccessToken()); // Check if user is authenticated

    useEffect(() => {
        const fetchName = async () => {
            try {
                const username = getUsername();
                const url = `http://localhost:8000/users/${username}`;
                const response = await fetch(url, {
                    // headers: {
                    //     Authorization: `Bearer ${getAccessToken()}`
                    // }
                });
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                } else {
                    console.error("Failed to fetch real name:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching real name:", error);
            }
        };

        if (authenticated) {
            fetchName();
        }
    }, [authenticated]);

    const handleLogout = () => {
        clearAccessToken(); // Clear access token from localStorage
        setAuthenticated(false); // Update authentication state
    };

    if (authenticated) {
        return (
            <VStack mr={8}>
                <Text>Bem-vindo {name}</Text>
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </VStack>
        );
    }
    return (
        <VStack mr={8}>
            <Link to="/register">Criar Conta</Link>
            <Link to="/login">Login</Link>
        </VStack>
    );
}

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    // const bg = { light: "gray.100", dark: "gray.900" }
    // const color = { light: "black", dark: "white" }

    return (
        <chakra.header id="header">
            <Flex w="100%" px="6" py="0" align="center" justify="space-between">
                <HStack>
                    <SideDrawer />
                    <Button>LOGO</Button>
                </HStack>

                <HStack as="nav" spacing="5">
                    <Link to="/"><IoMdHome size="2em"/></Link>
                </HStack>

                <HStack>
                    <LoginStack/>
                    <Button
                        onClick={toggleColorMode}
                        mb={4}
                        bg={"transparent"}
                        fontSize="30px"
                    >
                        {colorMode === "light" ? (
                            <WiMoonWaxingCrescent4 />
                        ) : (
                            <WiDaySunny />
                        )}
                    </Button>
                </HStack>
            </Flex>
        </chakra.header>
    );
}
