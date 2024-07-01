import { useState } from "react";

import {
    FormControl,
    FormLabel,
    Input,
    Center,
    Stack,
    RadioGroup,
    Radio,
    Select,
    Button
} from "@chakra-ui/react";

import Navbar from "../components/Navbar";

function CpfInput() {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        // Filter out non-numeric characters
        const numericValue = value.replace(/\D/g, '');
        // Limit the input to 11 characters
        if (numericValue.length <= 11) {
            setInput(numericValue);
        }
    };

    return (
        <FormControl>
            <FormLabel>CPF</FormLabel>
            <Input
                placeholder="000.000.000-00"
                value={input}
                onChange={handleInputChange}
            />
        </FormControl>
    );
}

function NameInput() {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => setInput(e.target.value);

    return (
        <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
                placeholder="Your name"
                value={input}
                onChange={handleInputChange}
            />
        </FormControl>
    );
}

function EmailInput() {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => setInput(e.target.value);

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

    return (
        <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input type="password" value={input} onChange={handleInputChange} />
        </FormControl>
    );
}

function TypeInput() {
    const [value, setValue] = useState("student");

    const handleInputChange = (value) => setValue(value);

    return (
        <FormControl as="fieldset">
            <FormLabel as="legend">Você é:</FormLabel>
            <RadioGroup onChange={handleInputChange} value={value}>
                <Stack direction="row">
                    <Radio value="student">Estudante</Radio>
                    <Radio value="teacher">Servidor</Radio>
                </Stack>
            </RadioGroup>
        </FormControl>
    );
}

function CourseInput() {
    const [selectedCourse, setSelectedCourse] = useState("");

    const handleCourseChange = (e) => setSelectedCourse(e.target.value);

    const courses = [
        "Administração - Bacharelado",
        "Arquitetura e Urbanismo - Bacharelado",
        "Arquivologia - Bacharelado",
        "Artes Plásticas - Bacharelado",
        "Artes Visuais - Licenciatura",
        "Biblioteconomia - Bacharelado",
        "Ciência da Computação - Bacharelado",
        "Ciências Biológicas - Bacharelado e Licenciatura",
        "Ciências Contábeis - Bacharelado",
        "Ciências Econômicas - Bacharelado",
        "Ciências Sociais - Bacharelado e Licenciatura",
        "Cinema e Audiovisual ",
        "Comunicação Social em Jornalismo - Bacharelado",
        "Comunicação Social em Publicidade e Propaganda - Bacharelado",
        "Design ",
        "Direito - Bacharelado",
        "Educação Física – Bacharelado",
        "Educação Física – Licenciatura",
        "Engenharia Ambiental - Bacharelado",
        "Engenharia Civil - Bacharelado",
        "Engenharia de Computação - Bacharelado",
        "Engenharia de Produção - Bacharelado",
        "Engenharia Elétrica - Bacharelado",
        "Engenharia Mecânica - Bacharelado",
        "Estatística - Bacharelado",
        "Filosofia - Bacharelado e Licenciatura",
        "Física - Bacharelado e Licenciatura",
        "Gemologia - Bacharelado",
        "Geografia - Bacharelado e Licenciatura",
        "História - Bacharelado e Licenciatura",
        "Letras Inglês - Licenciatura",
        "Letras Libras - Bacharelado em Tradução e Interpretação",
        "Letras Português - Licenciatura",
        "Letras Português / Italiano - Licenciatura",
        "Letras Português / Espanhol - Licenciatura",
        "Letras Português / Francês - Licenciatura",
        "Licenciatura em Educação do Campo – Linguagens ",
        "Licenciatura em Educação do Campo – Ciências Humanas e Sociais ",
        "Maruípe: Enfermagem e Obstetrícia",
        "Maruípe: Farmácia",
        "Maruípe: Fisioterapia",
        "Maruípe: Fonoaudiologia",
        "Maruípe: Medicina",
        "Maruípe: Nutrição",
        "Maruípe: Odontologia",
        "Maruípe: Terapia Ocupacional",
        "Matemática - Bacharelado e Licenciatura",
        "Música – Bacharelado",
        "Música – Licenciatura",
        "Oceanografia - Bacharelado",
        "Pedagogia - Licenciatura",
        "Psicologia - Bacharelado",
        "Química - Bacharelado e Licenciatura",
        "Serviço Social - Bacharelado",
        "Outro...",
    ];

    return (
        <FormControl>
            <FormLabel>Curso</FormLabel>
            <Select placeholder="Selecione seu curso" value={selectedCourse} onChange={handleCourseChange}>
                {courses.map((course, index) => (
                    <option key={index} value={course}>
                    {course}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}

export default function Register() {
    return (
        <>
            <Navbar />
            <Center h="100vh" maxW="1200px" mx="auto">
                <Stack spacing={4}>
                    <CpfInput />
                    <NameInput />
                    <EmailInput />
                    <PasswordInput />
                    <TypeInput />
                    <CourseInput />
                    <Button colorScheme="teal">Register</Button>
                </Stack>
            </Center>
        </>
    );
}

