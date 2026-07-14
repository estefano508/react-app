import CardField from "../fields/CardFields";
import TextField from "../fields/TextField";

export default function SecurityInfo({
    values,
    errors,
    updateField
}) {
    return (
        <div className="space-y-6">
            <CardField
                label="Nombre de usuario"
                required
                error={errors.usuario}
                helper="6+ caracteres, letras, números, punto y guía bajo"
            >
                <TextField
                    value={values.usuario}
                    onChange={(e) => updateField("usuario", e.target.value)}
                    error={errors.usuario}
                    placeholder="usuario123"
                />
            </CardField>

            <CardField
                label="Contraseña"
                required
                error={errors.password}
                helper="Mín. 12 caracteres, mayúscula, número y símbolo"
            >
                <TextField
                    type="password"
                    value={values.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    error={errors.password}
                    placeholder="••••••••"
                />
            </CardField>

            <CardField
                label="Confirmar contraseña"
                required
                error={errors.confirmPassword}
            >
                <TextField
                    type="password"
                    value={values.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    error={errors.confirmPassword}
                    placeholder="••••••••"
                />
            </CardField>

            <CardField
                label="Pregunta de seguridad"
                required
                error={errors.pregunta}
            >
                <select
                    value={values.pregunta}
                    onChange={(e) => updateField("pregunta", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-institucional-500 ${errors.pregunta ? 'border-red-500' : 'border-slate-300'}`}
                >
                    <option value="">Seleccionar pregunta</option>
                    <option value="¿Cuál es el nombre de tu mascota?">¿Cuál es el nombre de tu mascota?</option>
                    <option value="¿En qué ciudad naciste?">¿En qué ciudad naciste?</option>
                    <option value="¿Cuál es tu película favorita?">¿Cuál es tu película favorita?</option>
                    <option value="¿Cuál es el nombre de tu mejor amigo?">¿Cuál es el nombre de tu mejor amigo?</option>
                </select>
                {errors.pregunta && <p className="text-red-600 text-sm mt-2"><i className="fa-solid fa-circle-xmark mr-2" />{errors.pregunta}</p>}
            </CardField>

            <CardField
                label="Respuesta"
                required
                error={errors.respuesta}
            >
                <TextField
                    value={values.respuesta}
                    onChange={(e) => updateField("respuesta", e.target.value)}
                    error={errors.respuesta}
                    placeholder="Tu respuesta"
                />
            </CardField>

            <CardField
                label="Autenticación Multi-Factor (MFA)"
                required
            >
                <select
                    value={values.mfa}
                    onChange={(e) => updateField("mfa", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500"
                >
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                    <option value="Autenticador">Autenticador</option>
                </select>
            </CardField>
        </div>
    );
}
