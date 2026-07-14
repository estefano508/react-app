import CardField from "../fields/CardFields";

export default function PermissionsInfo({
    values,
    errors,
    updateField
}) {
    return (
        <div className="space-y-6">
            <CardField
                label="Nivel de acceso"
                required
                error={errors.nivel}
            >
                <select
                    value={values.nivel}
                    onChange={(e) => updateField("nivel", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-institucional-500 ${errors.nivel ? 'border-red-500' : 'border-slate-300'}`}
                >
                    <option value="">Seleccionar nivel</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Administrador">Administrador</option>
                </select>
                {errors.nivel && <p className="text-red-600 text-sm mt-2"><i className="fa-solid fa-circle-xmark mr-2" />{errors.nivel}</p>}
            </CardField>

            <CardField
                label="Estado"
            >
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="activo"
                        checked={values.activo}
                        onChange={(e) => updateField("activo", e.target.checked)}
                        className="w-4 h-4 accent-institucional-600"
                    />
                    <label htmlFor="activo" className="text-slate-700">
                        Activar usuario inmediatamente
                    </label>
                </div>
            </CardField>

            <CardField
                label="Consentimientos"
            >
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="aceptarDatos"
                            checked={values.aceptarDatos}
                            onChange={(e) => updateField("aceptarDatos", e.target.checked)}
                            className="w-4 h-4 accent-institucional-600 mt-1"
                        />
                        <div className="flex-1">
                            <label htmlFor="aceptarDatos" className="text-sm text-slate-700">
                                Acepto la política de protección de datos personales *
                            </label>
                            {errors.aceptarDatos && <p className="text-red-600 text-sm mt-1"><i className="fa-solid fa-circle-xmark mr-2" />{errors.aceptarDatos}</p>}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="aceptarConfidencialidad"
                            checked={values.aceptarConfidencialidad}
                            onChange={(e) => updateField("aceptarConfidencialidad", e.target.checked)}
                            className="w-4 h-4 accent-institucional-600 mt-1"
                        />
                        <div className="flex-1">
                            <label htmlFor="aceptarConfidencialidad" className="text-sm text-slate-700">
                                Acepto el acuerdo de confidencialidad y seguridad de la información *
                            </label>
                            {errors.aceptarConfidencialidad && <p className="text-red-600 text-sm mt-1"><i className="fa-solid fa-circle-xmark mr-2" />{errors.aceptarConfidencialidad}</p>}
                        </div>
                    </div>
                </div>
            </CardField>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    <i className="fas fa-info-circle mr-2"></i>
                    Se enviará un correo al usuario con sus credenciales de acceso y un enlace para cambiar su contraseña temporalmente.
                </p>
            </div>
        </div>
    );
}
