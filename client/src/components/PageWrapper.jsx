// src/components/PageWrapper.jsx
import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}   // Start hidden & slightly shifted
            animate={{ opacity: 1, y: 0 }}    // Animate in
            exit={{ opacity: 0, y: -20 }}     // Animate out
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen"
        >
            {children}
        </motion.div>
    );
}
