import CardField from "../fields/CardFields";
import TextField from "../fields/TextField";

export default function PersonalInfo({

    values,
    errors,
    updateField

}) {

    return (

        <div className="space-y-6">

            <CardField

                label="Nombres"

                required
                error={errors.nombres}

                helper="Ingrese únicamente letras."

            >

                <TextField

                    value={values.nombres}

                    onChange={(e) => updateField("nombres", e.target.value)}
                    error={errors.nombres}

                />

            </CardField>

            <CardField

                label="Segundo nombre"
                helper="Campo opcional. Solo letras."
                error={errors.segundoNombre}

            >

                <TextField

                    value={values.segundoNombre}

                    onChange={(e) => updateField("segundoNombre", e.target.value)}
                    error={errors.segundoNombre}

                />

            </CardField>

            <CardField

                label="Apellidos"

                required
                error={errors.apellidos}

            >

                <TextField

                    value={values.apellidos}

                    onChange={(e) => updateField("apellidos", e.target.value)}
                    error={errors.apellidos}

                />

            </CardField>

            <CardField

                label="Segundo apellido"
                helper="Campo opcional. Solo letras."
                error={errors.segundoApellido}

            >

                <TextField

                    value={values.segundoApellido}

                    onChange={(e) => updateField("segundoApellido", e.target.value)}
                    error={errors.segundoApellido}

                />

            </CardField>

            <CardField

                label="Número de cédula"

                required
                error={errors.cedula}

                helper="10 dígitos"

            >

                <TextField

                    value={values.cedula}

                    onChange={(e) => updateField("cedula", e.target.value)}
                    error={errors.cedula}

                />

            </CardField>

            <CardField

                label="Fecha de nacimiento"
                error={errors.nacimiento}

            >

                <TextField

                    type="date"

                    value={values.nacimiento}

                    onChange={(e) => updateField("nacimiento", e.target.value)}
                    error={errors.nacimiento}

                />

            </CardField>

        </div>

    );

}