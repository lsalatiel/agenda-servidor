import {
    // Image,
    Flex,
    Button,
    HStack,
    // Link,
    chakra,
    VStack,
    useColorMode,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { WiMoonWaxingCrescent4 } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import React from "react";
import SideDrawer from "./SideDrawer";

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
                    <Link>Home</Link>
                </HStack>

                <HStack>
                    <VStack mr={8}>
                        <Link to="/register">Criar Conta</Link>
                        <Link to="/login">Login</Link>
                    </VStack>
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
