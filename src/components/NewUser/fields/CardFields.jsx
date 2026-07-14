import { useState } from "react";

export default function CardField({
    label,
    helper,
    error,
    success,
    required = false,
    children
}) {

    const [hover, setHover] = useState(false);

    return (

        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`
                rounded-2xl
                border
                p-5
                transition-all
                duration-300
                bg-white

                ${hover
                    ? "shadow-xl border-blue-500 scale-[1.01]"
                    : "border-slate-200"}

                ${error
                    ? "border-red-500"
                    : ""}

                ${success
                    ? "border-green-500"
                    : ""}
            `}
        >

            <div className="flex justify-between items-center mb-2">

                <label className="font-semibold text-slate-700">

                    {label}

                    {required &&

                        <span className="text-red-500 ml-1">

                            *

                        </span>

                    }

                </label>

            </div>

            {children}

            <div className="mt-2 min-h-[22px]">

                {error && (

                    <p
                        role="alert"
                        className="text-red-600 text-sm"
                    >

                        <i className="fa-solid fa-circle-xmark mr-2" />

                        {error}

                    </p>

                )}

                {!error && success && (

                    <p className="text-green-600 text-sm">

                        <i className="fa-solid fa-circle-check mr-2"/>

                        Correcto

                    </p>

                )}

                {!error && !success && (

                    <p className="text-slate-400 text-sm">

                        {helper}

                    </p>

                )}

            </div>

        </div>

    );

}