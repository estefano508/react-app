import { useState } from "react";
import useNewUserForm from "../../hooks/useNewUserForm";

import ProgressBar from "./ProgressBar";
import Stepper from "./Stepper";

import PersonalInfo from "./steps/PersonalInfo";
import WorkInfo from "./steps/WorkInfo";
import SecurityInfo from "./steps/SecurityInfo";
import PermissionsInfo from "./steps/PermissionsInfo";

export default function NewUserModal({

    onClose,

    onSave

}) {

    const [step, setStep] = useState(1);
    const { values, errors, updateField, validateForm, isValid } = useNewUserForm();

    // Campos requeridos por paso
    const requiredFieldsByStep = {
      1: ["nombres", "apellidos", "cedula", "nacimiento"],
      2: ["correo", "telefono", "cargo", "departamento", "area", "rol"],
      3: ["usuario", "password", "confirmPassword", "pregunta", "respuesta"],
      4: ["nivel", "aceptarDatos", "aceptarConfidencialidad"]
    };

    // Validar campos del paso actual
    const validateCurrentStep = () => {
      const fieldsToValidate = requiredFieldsByStep[step];
      let hasErrors = false;
      
      fieldsToValidate.forEach(field => {
        if (errors[field]) {
          hasErrors = true;
        }
      });
      
      return !hasErrors;
    };

    const nextStep = () => {
        if (validateCurrentStep()) {
            setStep((old) => Math.min(old + 1, 4));
        }
    };

    const previousStep = () => {

        setStep((old) => Math.max(old - 1, 1));

    };

    return (

        <div className="w-full max-w-5xl">

            <h2 className="text-3xl font-bold mb-2">

                Crear nuevo usuario

            </h2>

            <p className="text-slate-500 mb-8">

                Complete la información para registrar un nuevo funcionario autorizado.

            </p>

            <ProgressBar step={step}/>

            <Stepper current={step}/>

            <div className="mt-10">

                {

                    step === 1 && (

                        <PersonalInfo

                            values={values}
                            errors={errors}
                            updateField={updateField}

                        />

                    )

                }

                {

                    step === 2 && (

                        <WorkInfo

                            values={values}
                            errors={errors}
                            updateField={updateField}

                        />

                    )

                }

                {

                    step === 3 && (

                        <SecurityInfo

                            values={values}
                            errors={errors}
                            updateField={updateField}

                        />

                    )

                }

                {

                    step === 4 && (

                        <PermissionsInfo

                            values={values}
                            errors={errors}
                            updateField={updateField}

                        />

                    )

                }

            </div>

            <div className="flex justify-between mt-10">

                <button

                    onClick={previousStep}

                    disabled={step === 1}

                    className="px-6 py-3 rounded-xl border"

                >

                    Atrás

                </button>

                {

                    step < 4 ?

                        (

                            <button

                                onClick={nextStep}

                                className="px-8 py-3 rounded-xl bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"

                            >

                                Continuar

                            </button>

                        )

                        :

                        (

                            <button

                                onClick={() => {
                                  if (validateCurrentStep()) {
                                    onSave(values);
                                  }
                                }}

                                className="px-8 py-3 rounded-xl bg-green-700 text-white hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"

                            >

                                Crear usuario

                            </button>

                        )

                }

            </div>

        </div>

    );

}