import React from "react";
import { motion } from "framer-motion";

interface ConfirmWindowProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmWindow: React.FC<ConfirmWindowProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-[20rem] md:max-w-[24rem]"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Aktivität löschen?
        </h2>
        <p className="text-gray-600 mb-6">
          Bist du sicher, dass du diese Aktivität löschen möchtest? Diese Aktion
          kann nicht rückgängig gemacht werden.
        </p>
        <div className="flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow"
          >
            Ja, löschen
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow"
          >
            Abbrechen
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmWindow;
