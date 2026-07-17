import CardField from "../fields/CardFields";
import TextField from "../fields/TextField";

export default function WorkInfo({
    values,
    errors,
    updateField
}) {
    return (
        <div className="space-y-6">
            <CardField
                label="Correo institucional"
                required
                error={errors.correo}
                helper="Correo @institución.gob.ec"
            >
                <TextField
                    type="email"
                    value={values.correo}
                    onChange={(e) => updateField("correo", e.target.value)}
                    error={errors.correo}
                    placeholder="usuario@institución.gob.ec"
                />
            </CardField>

            <CardField
                label="Teléfono de contacto"
                required
                error={errors.telefono}
                helper="10 dígitos"
            >
                <TextField
                    value={values.telefono}
                    onChange={(e) => updateField("telefono", e.target.value)}
                    error={errors.telefono}
                    placeholder="0999999999"
                />
            </CardField>

            <CardField
                label="Cargo"
                required
                error={errors.cargo}
            >
                <TextField
                    value={values.cargo}
                    onChange={(e) => updateField("cargo", e.target.value)}
                    error={errors.cargo}
                    placeholder="Ej. Analista de Sistemas"
                />
            </CardField>

            <CardField
                label="Departamento"
                required
                error={errors.departamento}
            >
                <TextField
                    value={values.departamento}
                    onChange={(e) => updateField("departamento", e.target.value)}
                    error={errors.departamento}
                    placeholder="Ej. Tecnología"
                />
            </CardField>

            <CardField
                label="Área"
                required
                error={errors.area}
            >
                <TextField
                    value={values.area}
                    onChange={(e) => updateField("area", e.target.value)}
                    error={errors.area}
                    placeholder="Ej. Desarrollo"
                />
            </CardField>

            <CardField
                label="Rol del sistema"
                required
                error={errors.rol}
            >
                <select
                    value={values.rol}
                    onChange={(e) => updateField("rol", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-institucional-500 ${errors.rol ? 'border-red-500' : 'border-slate-300'}`}
                >
                    <option value="">Seleccionar rol</option>
                    <option value="Digitalizador">Digitalizador</option>
                    <option value="Validador">Validador</option>
                    <option value="Archivista">Archivista</option>
                    <option value="Administrador">Administrador</option>
                </select>
                {errors.rol && <p className="text-red-600 text-sm mt-2"><i className="fa-solid fa-circle-xmark mr-2" />{errors.rol}</p>}
            </CardField>
        </div>
    );
}
