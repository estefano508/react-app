import { useMemo, useState } from "react";

import {
    validateName,
    validateEmail,
    validatePhone,
    validateUsername,
    validatePassword,
    validateConfirmPassword,
    validateBirthDate,
    validateCedula,
    validateCheckbox,
    validateSelect
} from "../utils/validators";

const initialValues = {

    // PERSONALES
    nombres: "",
    segundoNombre: "",
    apellidos: "",
    segundoApellido: "",
    cedula: "",
    nacimiento: "",

    // LABORALES
    correo: "",
    telefono: "",
    cargo: "",
    departamento: "",
    area: "",
    rol: "",

    // SEGURIDAD
    usuario: "",
    password: "",
    confirmPassword: "",
    pregunta: "",
    respuesta: "",
    mfa: "Email",

    // PERMISOS
    nivel: "",
    activo: true,
    aceptarDatos: false,
    aceptarConfidencialidad: false
};

export default function useNewUserForm() {

    const [values, setValues] = useState(initialValues);

    const [errors, setErrors] = useState({});

    // Actualiza un campo
    const updateField = (name, value) => {

        setValues((old) => ({

            ...old,

            [name]: value

        }));

        validateField(name, value);

    };

    // Validación individual
    const validateField = (field, value) => {

        let error = "";

        switch (field) {

            case "nombres":
            case "apellidos":
                error = validateName(value);
                break;

            case "segundoNombre":
            case "segundoApellido":
                error = value.trim() ? validateName(value) : "";
                break;

            case "cedula":
                error = validateCedula(value);
                break;

            case "correo":
                error = validateEmail(value);
                break;

            case "telefono":
                error = validatePhone(value);
                break;

            case "usuario":
                error = validateUsername(value);
                break;

            case "password":
                error = validatePassword(value);
                break;

            case "confirmPassword":
                error = validateConfirmPassword(
                    values.password,
                    value
                );
                break;

            case "nacimiento":
                error = validateBirthDate(value);
                break;

            case "cargo":
            case "departamento":
            case "area":
            case "rol":
            case "nivel":
                error = validateSelect(value);
                break;

            case "aceptarDatos":
            case "aceptarConfidencialidad":
                error = validateCheckbox(value);
                break;

            default:
                break;

        }

        setErrors((old) => ({

            ...old,

            [field]: error

        }));

    };

    // Validar todo
    const validateForm = () => {

        Object.keys(values).forEach((field) => {

            validateField(field, values[field]);

        });

    };

    // ¿Formulario válido?
    const isValid = useMemo(() => {

        return Object.values(errors).every(
            (error) => error === ""
        );

    }, [errors]);

    // Porcentaje completado
    const progress = useMemo(() => {

        const total = Object.keys(values).length;

        let completed = 0;

        Object.entries(values).forEach(([key, value]) => {

            if (typeof value === "boolean") {

                if (value) completed++;

            }

            else if (String(value).trim() !== "") {

                completed++;

            }

        });

        return Math.round((completed / total) * 100);

    }, [values]);

    return {

        values,

        errors,

        updateField,

        validateForm,

        isValid,

        progress

    };

}