// components/Button.jsx
import { useState } from "react";

const Button = ({ name, onConfirm }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <button
                type="button"
                className={`btn ${name === "Delete" ? "btn-error" : "btn-secondary"} flex-1`}
                onClick={() => setShowConfirm(true)}
            >
                {name}
            </button>

            {showConfirm && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Action</h3>
                        <p className="py-4">
                            Are you sure you want to {name.toLowerCase()} this blog?
                        </p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowConfirm(false)}>
                                Cancel
                            </button>
                            <button
                                className={`btn ${name === "Delete" ? "btn-error" : "btn-primary"}`}
                                onClick={() => {
                                    onConfirm();
                                    setShowConfirm(false);
                                }}
                            >
                                Yes, {name}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Button;
