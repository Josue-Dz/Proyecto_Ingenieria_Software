const CircularProgress = ({ porcentaje }) => {

    const radius = 18;
    const stroke = 4;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset =
        circumference - (porcentaje / 100) * circumference;

    const color =
        porcentaje >= 70
            ? "#22c55e"
            : porcentaje >= 40
                ? "#facc15"
                : "#ef4444";

    return (
        <div className="relative w-12 h-12 flex items-center justify-center drop-shadow-sm">

            <svg height={radius * 2} width={radius * 2}>

                {/* fondo */}
                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />

                {/* progreso */}
                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference + " " + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-500"
                />
            </svg>

            <span
                className="absolute text-[10px] font-semibold"
                style={{ color }}
            >
                {porcentaje}%
            </span>
        </div>
    );
};

export default CircularProgress;