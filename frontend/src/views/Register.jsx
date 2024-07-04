import { useState } from "react";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Center,
    Stack,
    RadioGroup,
    Radio,
    Select,
    Button,
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

function NameInput({ value, onChange }) {
    return (
        <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
                placeholder="Your name"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </FormControl>
    );
}

function EmailInput({ value, onChange, setIsInvalid }) {
    const handleInputChange = (e) => {
        const email = e.target.value;
        const hasAtSymbol = email.includes('@');

        setIsInvalid(!hasAtSymbol);
        onChange(email);
    };

    return (
        <FormControl isInvalid={!value.includes('@')}>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="email@edu.ufes.br"
                type="email"
                value={value}
                onChange={handleInputChange}
            />
            {!value.includes('@') && <FormErrorMessage>Invalid email</FormErrorMessage>}
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

function TypeInput({ value, onChange }) {
    return (
        <FormControl as="fieldset">
            <FormLabel as="legend">Você é:</FormLabel>
            <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row">
                    <Radio value="student">Estudante</Radio>
                    <Radio value="teacher">Servidor</Radio>
                </Stack>
            </RadioGroup>
        </FormControl>
    );
}

function CourseInput({ value, onChange }) {
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
            <Select placeholder="Selecione seu curso" value={value} onChange={(e) => onChange(e.target.value)}>
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
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "student",
        course: "",
    });

    const [cpfIsInvalid, setCpfIsInvalid] = useState(false);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);

    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (field) => (value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        const url = "http://localhost:8000/users"; // Replace with your backend URL
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Redirect to login page on successful registration
                navigate("/login");
            } else {
                console.error("Error during registration");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    const isFormValid = !cpfIsInvalid && !emailIsInvalid;

    return (
        <>
            <Navbar />
            <Center h="100vh" maxW="1200px" mx="auto">
                <Stack spacing={4}>
                    <CpfInput value={formData.id} onChange={handleChange("id")} setIsInvalid={setCpfIsInvalid} />
                    <NameInput value={formData.name} onChange={handleChange("name")} />
                    <EmailInput value={formData.email} onChange={handleChange("email")} setIsInvalid={setEmailIsInvalid} />
                    <PasswordInput value={formData.password} onChange={handleChange("password")} />
                    <TypeInput value={formData.type} onChange={handleChange("type")} />
                    <CourseInput value={formData.course} onChange={handleChange("course")} />
                    <Button colorScheme="teal" onClick={handleSubmit} isDisabled={!isFormValid}>Register</Button>
                </Stack>
            </Center>
        </>
    );
}
