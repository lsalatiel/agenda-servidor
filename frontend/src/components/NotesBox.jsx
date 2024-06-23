import { Box, Heading, Text, HStack, VStack, Image } from "@chakra-ui/react"

import React from "react"

export default function NotesBox() {
    return (
        <>
            <Box p="20px" bg="gray" borderRadius={10} mb={10}>
                <Heading fontSize="30px">Avisos</Heading>
                <Text p="10px">1. O agendamento da area dos servidores para esse semestre encerra dia 17/07 junto ao encerramento do periodo 2024/1</Text>
                <Text p="10px">2. Reunião com a equipe de limpeza no dia 15/10</Text>
                <Text p="10px">3. Reunião com a equipe de segurança no dia 20/10</Text>
            </Box>
        </>
    )
}
