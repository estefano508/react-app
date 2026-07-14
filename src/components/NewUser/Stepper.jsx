const steps = [

    "Datos personales",

    "Información laboral",

    "Seguridad",

    "Permisos"

];

export default function Stepper({ current }) {

    return (

        <div className="flex justify-between mb-8">

            {

                steps.map((step, index) => (

                    <div

                        key={step}

                        className="flex-1 flex flex-col items-center"

                    >

                        <div

                            className={`

                            w-12

                            h-12

                            rounded-full

                            flex

                            items-center

                            justify-center

                            font-bold

                            transition

                            ${current >= index + 1

                            ? "bg-blue-700 text-white"

                            : "bg-slate-200"}

                            `}

                        >

                            {index + 1}

                        </div>

                        <span className="mt-2 text-sm">

                            {step}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}