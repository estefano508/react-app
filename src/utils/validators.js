// ===============================
// Validadores reutilizables
// Sistema de Archivo Inteligente
// ===============================

// Solo letras y espacios
export const validateName = (value) => {

    if (!value.trim())
        return "Este campo es obligatorio.";

    if (value.length < 3)
        return "Debe contener al menos 3 caracteres.";

    if (value.length > 40)
        return "Máximo 40 caracteres.";

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value))
        return "Solo se permiten letras.";

    return "";
};


// Correo institucional
export const validateEmail = (value) => {

    if (!value)
        return "Ingrese un correo.";

    const regex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.gob\.ec$/;

    if (!regex.test(value))
        return "Debe ser un correo institucional del gobierno (@*.gob.ec).";

    return "";
};


// Teléfono
export const validatePhone = (value) => {

    if (!value)
        return "Ingrese un teléfono.";

    if (!/^09\d{8}$/.test(value))
        return "Debe contener 10 dígitos.";

    return "";

};


// Usuario
export const validateUsername = (value) => {

    if (!value)
        return "Ingrese un usuario.";

    if (value.length < 6)
        return "Mínimo 6 caracteres.";

    if (!/^[a-zA-Z0-9._]+$/.test(value))
        return "Solo letras, números, punto y guión bajo.";

    return "";

};


// Contraseña segura
export const validatePassword = (value) => {

    if (!value)
        return "Ingrese una contraseña.";

    if (value.length < 12)
        return "Debe tener mínimo 12 caracteres.";

    if (!/[A-Z]/.test(value))
        return "Debe contener una mayúscula.";

    if (!/[a-z]/.test(value))
        return "Debe contener una minúscula.";

    if (!/[0-9]/.test(value))
        return "Debe contener un número.";

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
        return "Debe contener un símbolo.";

    return "";

};


// Confirmar contraseña
export const validateConfirmPassword = (

    password,

    confirm

) => {

    if (!confirm)
        return "Confirme la contraseña.";

    if (password !== confirm)
        return "Las contraseñas no coinciden.";

    return "";

};


// Fecha
export const validateBirthDate = (value) => {

    if (!value)
        return "Seleccione una fecha.";

    const birth = new Date(value);

    const today = new Date();

    const age =
        today.getFullYear() -
        birth.getFullYear();

    if (age < 18)
        return "Debe ser mayor de edad.";

    return "";

};


// Select obligatorio
export const validateSelect = (value) => {

    if (!value)
        return "Seleccione una opción.";

    return "";

};


// Checkbox
export const validateCheckbox = (value) => {

    if (!value)
        return "Debe aceptar esta opción.";

    return "";

};

// =======================================
// Validación de cédula ecuatoriana
// =======================================

export const validateCedula = (cedula) => {

    if (!cedula)
        return "Ingrese una cédula.";

    if (!/^\d{10}$/.test(cedula))
        return "Debe contener exactamente 10 dígitos.";

    return "";

};