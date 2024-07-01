import { useState } from "react";

import {
    FormControl,
    FormLabel,
    Input,
    Center,
    Stack,
    VStack,
    RadioGroup,
    Radio,
    Select,
    Button,
    Heading,
} from "@chakra-ui/react";

import Navbar from "../components/Navbar";

function CategoryInput() {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

    const categories = [
        "Quadra",
        "Churrasqueira",
        "Campo",
    ];

    return (
        <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Select value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                    {category}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}

function DateInput() {
    return (
        <FormControl>
            <FormLabel>Data</FormLabel>
            <Input type="date" />
        </FormControl>
    );
}

function TimeInput() {
    return (
        <FormControl>
            <FormLabel>Hora</FormLabel>
            <Input type="time" />
        </FormControl>
    );
}

function TypeInput() {
    return (
        <FormControl>
            <FormLabel>Modo</FormLabel>
            <RadioGroup defaultValue="individual">
                <Stack direction="row">
                    <Radio value="open">Aberto</Radio>
                    <Radio value="closed">Fechado</Radio>
                </Stack>
            </RadioGroup>
        </FormControl>
    );
}

export default function Schedule() {
    return (
        <>
            <Navbar />
            <Center h="80vh" maxW="1200px" mx="auto">
                <VStack spacing={4}>
                    <Heading mb={8} fontSize={"4em"}>Agendar</Heading>
                    <CategoryInput />
                    <TypeInput />
                    <DateInput />
                    <TimeInput />
                    <Button colorScheme="teal">Agendar</Button>
                </VStack>
            </Center>
        </>
    );
}
