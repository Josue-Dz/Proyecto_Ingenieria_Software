import { getStrength } from "../hooks/useSignUpForm";

const PasswordRules = ({ passwordResults, passedCount }) => {
    const strength = getStrength(passedCount);

    return (
        <div className="mt-2 space-y-1">
            {passwordResults.map(rule => (
                <div key={rule.id} className="flex items-center gap-2">
                    <span className={`material-symbols-rounded text-[16px] ${
                        rule.passed ? "text-green-500" : "text-gray-300"
                    }`}>
                        {rule.passed ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    <span className={`text-xs ${
                        rule.passed ? "text-gray-600" : "text-gray-400"
                    }`}>
                        {rule.label}
                    </span>
                </div>
            ))}

            <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Seguridad de la contraseña:</span>
                    <span className={`text-xs font-medium ${
                        passedCount <= 2 ? "text-red-500" :
                        passedCount === 3 ? "text-yellow-500" :
                        passedCount === 4 ? "text-blue-500" : "text-green-500"
                    }`}>
                        {strength.label}
                    </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300
                     ${strength.color} ${strength.width}`} />
                </div>
            </div>
        </div>
    );
};

export default PasswordRules;