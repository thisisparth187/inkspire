
import { useEffect, useState, useCallback } from "react";

const Alert = ({ message, type = "info", onClose, duration = 3000, autoClose = true }) => {
    const [progress, setProgress] = useState(100);
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        if (onClose) {
            // Small delay to allow fade out animation
            setTimeout(() => onClose(), 200);
        }
    }, [onClose]);

    useEffect(() => {
        if (!autoClose || duration <= 0) return;

        const stepSize = 100 / (duration / 50); // Update every 50ms
        let currentProgress = 100;

        const interval = setInterval(() => {
            currentProgress -= stepSize;

            if (currentProgress <= 0) {
                clearInterval(interval);
                setProgress(0);
                handleClose();
                return;
            }

            setProgress(currentProgress);
        }, 50);

        return () => clearInterval(interval);
    }, [duration, autoClose, handleClose]);

    const typeClasses = {
        success: "bg-green-100 border-green-500 text-green-700",
        error: "bg-red-100 border-red-500 text-red-700",
        info: "bg-blue-100 border-blue-500 text-blue-700",
        warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    };

    const progressColors = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
        warning: "bg-yellow-500",
    };

    if (!isVisible) return null;

    return (
        <div className={`
            fixed top-4 right-4   /* ✅ stick to top-right of viewport */
    w-96 max-w-sm        /* ✅ responsive width */
    border-l-4 rounded-lg shadow-lg p-4
    transform transition-all duration-300 ease-out
    ${typeClasses[type]}
    overflow-hidden z-50
        `}>
            <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                    <p className="font-medium">{message}</p>
                </div>
                <button
                    onClick={handleClose}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-150 text-lg leading-none"
                    aria-label="Close alert"
                >
                    ✕
                </button>
            </div>

            {/* Progress bar */}
            {autoClose && duration > 0 && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20">
                    <div
                        className={`h-full transition-all duration-75 ease-linear ${progressColors[type]}`}
                        style={{
                            width: `${progress}%`,
                            transformOrigin: 'left center'
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Alert;