import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
    show: boolean;
    message: string;
    description?: string;
    onClose: () => void;
    duration?: number;
}

const Toast = ({ show, message, description, onClose, duration = 5000 }: ToastProps) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
                >
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/50 backdrop-blur-xl flex items-start gap-4">
                        <div className="flex-shrink-0 bg-emerald-500/20 p-2 rounded-full">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-white font-bold text-base">{message}</h3>
                            {description && <p className="text-gray-400 text-sm mt-1 leading-relaxed">{description}</p>}
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-white transition-colors p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
