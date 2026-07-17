import { useId, useState } from "react";

export default function TextField({

    label,

    value,

    onChange,

    type = "text",

    placeholder = "",

    helper = "",

    error = "",

    required = false,

    disabled = false,

    maxLength,

    autoComplete = "off"

}) {

    const id = useId();

    const helperId = `${id}-helper`;

    const errorId = `${id}-error`;

    const [focused, setFocused] = useState(false);

    const isDateInput = type === "date";
    const isValid = value !== "" && error === "";
    const statusIconPosition = isDateInput ? "right-10" : "right-4";
    const inputPaddingClass = isDateInput ? "pr-16" : "pr-5";

    return (

        <div className="w-full">

            <label

                htmlFor={id}

                className="block mb-2 font-semibold text-slate-700"

            >

                {label}

                {required && (

                    <span

                        className="text-red-600 ml-1"

                        aria-hidden="true"

                    >

                        *

                    </span>

                )}

            </label>

            <div

                className={`

                relative

                rounded-xl

                transition-all

                duration-300

                ${focused

                    ? "shadow-lg scale-[1.01]"

                    : ""

                }

                ${

                    error

                        ? "ring-2 ring-red-400"

                        : isValid

                            ? "ring-2 ring-green-400"

                            : "ring-1 ring-slate-300"

                }

                bg-white

                hover:shadow-md

                `}

            >

                <input

                    id={id}

                    type={type}

                    value={value}

                    onChange={onChange}

                    placeholder={placeholder}

                    required={required}

                    disabled={disabled}

                    maxLength={maxLength}

                    autoComplete={autoComplete}

                    aria-required={required}

                    aria-invalid={error ? "true" : "false"}

                    aria-describedby={

                        error

                            ? errorId

                            : helper

                                ? helperId

                                : undefined

                    }

                    onFocus={() => setFocused(true)}

                    onBlur={() => setFocused(false)}

                    className={`

                        w-full

                        rounded-xl

                        px-5

                        py-4

                        ${inputPaddingClass}

                        outline-none

                        bg-transparent

                        text-slate-700

                        placeholder:text-slate-400

                    `}

                />

                {

                    isValid && (

                        <div

                            className={`

                            absolute

                            ${statusIconPosition}

                            top-1/2

                            -translate-y-1/2

                            text-green-600

                            `}

                            aria-hidden="true"

                        >

                            <i className="fas fa-circle-check"></i>

                        </div>

                    )

                }

                {

                    error && (

                        <div

                            className={`

                            absolute

                            ${statusIconPosition}

                            top-1/2

                            -translate-y-1/2

                            text-red-600

                            `}

                            aria-hidden="true"

                        >

                            <i className="fas fa-circle-xmark"></i>

                        </div>

                    )

                }

            </div>

            {

                helper && !error && (

                    <p

                        id={helperId}

                        className="

                            mt-2

                            text-sm

                            text-slate-500

                        "

                    >

                        {helper}

                    </p>

                )

            }

            {

                error && (

                    <p

                        id={errorId}

                        role="alert"

                        aria-live="polite"

                        className="

                            mt-2

                            text-sm

                            text-red-600

                            font-medium

                        "

                    >

                        {error}

                    </p>

                )

            }

        </div>

    );

}