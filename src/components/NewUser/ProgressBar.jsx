export default function ProgressBar({ step }) {

    const progress = (step / 4) * 100;

    return (

        <div className="mb-8">

            <div className="flex justify-between text-sm mb-2">

                <span>

                    Paso {step} de 4

                </span>

                <span>

                    {progress}%

                </span>

            </div>

            <div className="h-3 rounded-full bg-slate-200">

                <div

                    style={{
                        width: `${progress}%`
                    }}

                    className="h-full rounded-full bg-blue-700 transition-all duration-500"

                />

            </div>

        </div>

    );

}