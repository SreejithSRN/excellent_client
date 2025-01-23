import React from "react";

interface ConfirmationModalProps {
  triggerText: string;
  title: string;
  description: string;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  triggerText,
  title,
  description,
  onConfirm,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50"
      >
        {triggerText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p
              className="text-gray-600 mt-2 break-words"
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {description}
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
