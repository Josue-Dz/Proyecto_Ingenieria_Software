import React from 'react'

const Field = ({ label, name, type = "text", value, onChange, readOnly = false, required = false, placeholder = "" }) => {
    return (
        <div>
            <label className="text-slate-500 dark:text-white/50 text-xs font-medium block mb-1">
                {label} {required && <span className="text-indigo-500 dark:text-[#A3FF12]">*</span>}
                {readOnly && <span className="ml-1 text-slate-400 dark:text-white/30 text-[10px]">(solo lectura)</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                placeholder={placeholder}
                required={required}
                className={`w-full rounded-lg px-4 py-2.5 text-sm border transition-colors focus:outline-none
                ${readOnly
                        ? "bg-slate-100 dark:bg-white/3 border-slate-200 dark:border-white/8 text-slate-400 dark:text-white/35 cursor-not-allowed"
                        : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-white/20 focus:border-indigo-400 dark:focus:border-[#A3FF12]/40"
                    }`}
            />
        </div>
    )
}

export default Field