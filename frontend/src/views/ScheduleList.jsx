import { useState, useEffect } from "react";
import { Center, VStack, Box, Heading, List, ListItem, useColorMode, Text } from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";  // import the default styles
import "../CalendarStyles.css";  // import your custom styles

import Navbar from "../components/Navbar";
import { getAccessToken } from "../utils/auth";
import { formatDateTime } from "../utils/time";

const fetchSchedules = async () => {
    const response = await fetch("http://localhost:8000/schedules", {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch schedules");
    }
    return response.json();
};

const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 19; hour++) {
        slots.push(`${hour < 10 ? '0' : ''}${hour}:00`);
    }
    return slots;
};

const CalendarView = () => {
    const [date, setDate] = useState(new Date());
    const [schedules, setSchedules] = useState([]);
    const [daySchedules, setDaySchedules] = useState([]);
    const { colorMode } = useColorMode();  // Get the current color mode

    useEffect(() => {
        const loadSchedules = async () => {
            try {
                const data = await fetchSchedules();
                setSchedules(data);
            } catch (error) {
                console.error("Failed to load schedules:", error);
            }
        };

        loadSchedules();
    }, []);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        const selectedDay = selectedDate.toISOString().split("T")[0];
        const filteredSchedules = schedules.filter(schedule =>
            schedule.start_time.startsWith(selectedDay)
        );
        setDaySchedules(filteredSchedules);
    };

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const timeSlots = generateTimeSlots();

    return (
        <>
            <Navbar />
            <Center h="130vh" maxW="1200px" mx="auto">
                <VStack spacing={4} w="100%">
                    <Heading mb={8} fontSize={"4em"}>Consulta</Heading>
                    <Box className={colorMode === "dark" ? "react-calendar--dark" : "react-calendar--light"}>
                        <Calendar 
                            onChange={handleDateChange} 
                            value={date} 
                            minDate={new Date()}
                            maxDate={maxDate}
                        />
                    </Box>
                    <Box mt={4} w="100%">
                        <Heading fontSize="2xl" mb={10}>Agendamentos para {formatDateTime(date).formattedDate}</Heading>
                        <List spacing={5} alignItems="flex-start">
                            {timeSlots.map(timeSlot => {
                                const schedule = daySchedules.find(schedule => {
                                    const startTime = new Date(schedule.start_time).toTimeString().slice(0, 5);
                                    return startTime === timeSlot;
                                });

                                return (
                                    <ListItem key={timeSlot}>
                                        <Text>
                                            {timeSlot}: {schedule ? `${schedule.area_id === 1 ? "Quadra" : schedule.area_id === 2 ? "Campo" : "Churrasqueira"} - ${formatDateTime(schedule.start_time).formattedTime} a ${formatDateTime(schedule.end_time).formattedTime} - ${schedule.user.name}` : "Disponivel"}
                                        </Text>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </VStack>
            </Center>
        </>
    );
};

export default CalendarView;
