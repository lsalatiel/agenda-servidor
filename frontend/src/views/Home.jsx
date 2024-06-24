import React from "react";
import {
    Box,
    Heading,
    Text,
    HStack,
    VStack,
    Image,
    Link,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import SuggestionBox from "../components/SuggestionBox";
import NotesBox from "../components/NotesBox";

export default function Home() {
    return (
        <>
            <Navbar />
            <Box p="60px">
                <Heading fontSize="45px" mb={8}>
                    Agenda Servidor
                </Heading>
                <NotesBox />
                <HStack>
                    <VStack spacing={8} maxW={"2xl"} mx={"auto"}>
                        <SuggestionBox />
                    </VStack>
                    <VStack>
                        <Text fontSize={"xl"}>Como chegar?</Text>
                        <Link
                            href="https://www.google.com/maps/place/Quadra+dos+Servidores+-+UFES/@-20.2717157,-40.3045165,15z/data=!4m2!3m1!1s0x0:0xa70dbe805fdc7d6c?sa=X&ved=1t:2428&hl=pt-BR&ictx=111"
                            isExternal
                        >
                            <Image
                                src="https://miro.medium.com/v2/resize:fit:1400/0*Gg9k4of-IcDQtGZ8"
                                alt="Quadra dos servidores"
                                boxSize="300px"
                                borderRadius="md"
                                objectFit="cover"
                            ></Image>
                        </Link>
                    </VStack>
                </HStack>
            </Box>
        </>
    );
}
