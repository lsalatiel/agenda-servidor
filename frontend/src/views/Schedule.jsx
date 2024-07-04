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
            <Input type="date" value={value} onChange={(e) => onChange(e.target.value)} />
        </FormControl>
    );
}

function TimeInput({ value, onChange }) {
    // Define rounded times between 07:00 and 19:00
    const hours = [...Array(13).keys()].map(hour => hour + 7);

    const hourOptions = hours.map(hour => `${hour < 10 ? '0' + hour : hour}:00`);

    const handleTimeChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <FormControl>
            <FormLabel>Hora</FormLabel>
            <Select value={value} onChange={handleTimeChange}>
                {hourOptions.map(option => (
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
    const swapDate = (date) => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${year}-${day}-${month}`;
    };

    const userId = getUsername();

    const [timeData, setTimeData] = useState({
        date: "",
        time: "",
    });

    const [areaData, setAreaData] = useState({
        name: "",
    });

    const handleAreaChange = (field) => (value) => {
        setAreaData({ ...areaData, [field]: value });
    };

    const handleTimeChange = (field) => (value) => {
        setTimeData({ ...timeData, [field]: value });
    };

    const handleSubmit = async () => {
        const url = "http://localhost:8000/schedules";
        const newSchedule = {
            area_id: areaData.name === "Quadra" ? 1 : areaData.name === "Campo" ? 2 : areaData.name === "Churrasqueira" ? 3 : 1,
            user_id: userId,
            start_time: convertToISO8601(swapDate(timeData.date), timeData.time),
            end_time: convertToISO8601(swapDate(timeData.date), incrementHour(timeData.time))
        };

        try {
            const response = await fetch("http://localhost:8000/schedules", {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch schedules for validation");
            }
            const existingSchedules = await response.json();

            const isDuplicate = existingSchedules.some(schedule =>
                schedule.area_id === newSchedule.area_id &&
                schedule.start_time === swapDate(newSchedule.start_time) &&
                schedule.end_time === swapDate(newSchedule.end_time)
            );

            if (isDuplicate) {
                alert("Esse agendamento já existe. Por favor, escolha outro horário.");
                return;
            }

            const postResponse = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify(newSchedule)
            });

            if (postResponse.ok) {
                console.log("Data submitted successfully!");
                successAlert();
            } else {
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
                    <Heading mb={8} fontSize={"4em"}>Agendar</Heading>
                    <CategoryInput value={areaData.name} onChange={handleAreaChange("name")} />
                    <DateInput value={timeData.date} onChange={handleTimeChange("date")} />
                    <TimeInput value={timeData.time} onChange={handleTimeChange("time")} />
                    <Button colorScheme="teal" onClick={handleSubmit}>Agendar</Button>
                </VStack>
            </Center>
        </>
    );
}

// <TypeInput value={formData.type} onChange={handleChange("type")} />
