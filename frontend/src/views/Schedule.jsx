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
    Text,
} from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import { getAccessToken } from "../utils/auth";
import { getUsername } from "../utils/auth";
import { convertToISO8601 } from "../utils/time";
import { incrementHour } from "../utils/time";

function CategoryInput({ value, onChange }) {
    const categories = ["Quadra", "Churrasqueira", "Campo"];

    return (
        <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="" disabled>
                    Selecione a categoria
                </option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}

function DateInput({ value, onChange }) {
    return (
        <FormControl>
            <FormLabel>Data</FormLabel>
            <Input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </FormControl>
    );
}

function TimeInput({ value, onChange }) {
    // Define rounded times between 07:00 and 19:00
    const hours = [...Array(13).keys()].map((hour) => hour + 7);

    const hourOptions = hours.map(
        (hour) => `${hour < 10 ? "0" + hour : hour}:00`
    );

    const handleTimeChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <FormControl>
            <FormLabel>Hora</FormLabel>
            <Select value={value} onChange={handleTimeChange}>
                {hourOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}

function TypeInput({ value, onChange }) {
    return (
        <FormControl>
            <FormLabel>Modo</FormLabel>
            <RadioGroup value={value} onChange={onChange}>
                <Stack direction="row">
                    <Radio value="open">Aberto</Radio>
                    <Radio value="closed">Fechado</Radio>
                </Stack>
            </RadioGroup>
        </FormControl>
    );
}

function successAlert() {
    alert("Agendamento realizado com sucesso!");
}

function failAlert() {
    alert("Erro ao realizar agendamento!");
}

export default function Schedule() {
    const userId = getUsername();

    const [timeData, setTimeData] = useState({
        date: "",
        time: "",
    });

    const [areaData, setAreaData] = useState({
        name: "",
    });

    const [formData, setFormData] = useState({
        area_id: 1,
        user_id: userId,
        start_time: "",
        end_time: "",
        // type: "open",
    });

    formData.start_time = convertToISO8601(timeData.date, timeData.time);
    formData.end_time = convertToISO8601(
        timeData.date,
        incrementHour(timeData.time)
    );

    if (areaData.name === "Quadra") {
        formData.area_id = 1;
    }
    if (areaData.name === "Campo") {
        formData.area_id = 2;
    }
    if (areaData.name === "Churrasqueira") {
        formData.area_id = 3;
    }

    const handleAreaChange = (field) => (value) => {
        setAreaData({ ...areaData, [field]: value });
    };

    const handleTimeChange = (field) => (value) => {
        setTimeData({ ...timeData, [field]: value });
    };

    const handleChange = (field) => (value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        const url = "http://localhost:8000/schedules";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAccessToken()}`,
                },

                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Handle successful response
                console.log("Data submitted successfully!");
                successAlert();
            } else {
                // Handle errors
                console.error("Error submitting data");
                failAlert();
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <>
            <Navbar />
            <Center h="80vh" maxW="1200px" mx="auto">
                <VStack spacing={4}>
                    <Heading mb={8} fontSize={"4em"}>
                        Agendar
                    </Heading>
                    <CategoryInput
                        value={areaData.name}
                        onChange={handleAreaChange("name")}
                    />
                    <DateInput
                        value={timeData.date}
                        onChange={handleTimeChange("date")}
                    />
                    <TimeInput
                        value={timeData.time}
                        onChange={handleTimeChange("time")}
                    />
                    <Button colorScheme="teal" onClick={handleSubmit}>
                        Agendar
                    </Button>
                </VStack>
            </Center>
        </>
    );
}

// <TypeInput value={formData.type} onChange={handleChange("type")} />
