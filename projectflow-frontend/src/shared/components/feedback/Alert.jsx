import React from 'react'

const Alert = ({ type = "error", message }) => {
    if (!message) return null;

    const variants = {
        success: {
            styles: "text-green-600 dark:text-[#A3FF12] bg-green-50 dark:bg-[#A3FF12]/10 border-green-200 dark:border-[#A3FF12]/20",
            icon: "check_circle"
        },
        error: {
            styles: "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border-red-200 dark:border-red-400/20",
            icon: "error"
        },
        warning: {
            styles: "text-yellow-600 bg-yellow-50 border-yellow-200",
            icon: "warning"
        },
        info: {
            styles: "text-blue-600 bg-blue-50 border-blue-200",
            icon: "info"
        }
    };

    const current = variants[type] || variants.error;

    return (
        <p className={`text-xs rounded-lg px-3 py-2 flex items-center gap-1.5 border ${current.styles}`}>
            <span className="material-symbols-rounded text-sm">
                {current.icon}
            </span>
            {message}
        </p>
    );
}

export default Alert