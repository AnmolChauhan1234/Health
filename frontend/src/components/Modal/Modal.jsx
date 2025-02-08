import React, { useEffect, useState } from "react";

function Modal({ message, isOpen, closeModal, statusCode }) {

  const [progress, setProgress] = useState(0);

  useEffect(() => {

    if (!isOpen) return;

    let interval;
    let timeout;

    // Handle Escape key press to close modal
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    // Auto-close modal after 3 seconds with progress bar animation
    interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 150);

    timeout = setTimeout(() => {
      closeModal();
    }, 3000);

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      setProgress(0); // Reset progress when modal closes
    };
  }, [isOpen,closeModal]);

  if (!isOpen) return null;

  // Define status-based styles
  const statusStyles = {
    success: "bg-green-50 border-green-500 dark:bg-green-900 dark:border-green-700",
    error: "bg-red-50 border-red-500 dark:bg-red-900 dark:border-red-700",
    info: "bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-700",
    warning: "bg-yellow-50 border-yellow-500 dark:bg-yellow-900 dark:border-yellow-700",
  };

  const progressBarStyleOnStatusCode = {
    success: "bg-green-500 dark:bg-green-400",
    error: "bg-red-600 dark:bg-red-400",
    info: "bg-blue-500 dark:bg-blue-400",
    warning: "bg-yellow-500 dark:bg-yellow-400",
  };

  const statusTextColors = {
    success: "text-green-700 dark:text-green-200",
    error: "text-red-700 dark:text-red-200",
    info: "text-blue-700 dark:text-blue-200",
    warning: "text-yellow-700 dark:text-yellow-200",
  };

  return (
    <div
      className="fixed inset-0 flex items-start justify-center p-4 z-50 transition-all duration-200 ease-in-out"
    >
      {/* Transparent background overlay starts here*/}
      <div
        className="absolute inset-0 bg-transparent bg-opacity-30"
        onClick={closeModal}
      ></div>
      {/* Transparent background overlay ends here */}

      {/* Notification modal */}
      <div
        className={`relative w-[350px] max-w-full py-2.5 px-6 rounded-md shadow-lg flex items-center justify-center gap-3 ${
          statusStyles[statusCode] || "bg-gray-100 border-gray-500 dark:bg-gray-800 dark:border-gray-600"
        } overflow-hidden`}
      >

        {/* Message indicator starts here*/}
        <p
          className={`flex-grow text-sm ubuntu-regular-italic ${
            statusTextColors[statusCode] || "text-gray-700 dark:text-gray-200"
          } text-center`}
        >
          {message}
        </p>

        {/* Close button starts here*/}
        <button
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none cursor-pointer"
          onClick={closeModal}
          aria-label="Close modal"
        >
          {/* svg for cross icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>

        </button>
        {/* Close button ends here */}

        {/* Progress Bar (Auto-closing indicator) starts here*/}
        <div
          className={`absolute bottom-0 left-0 h-0.5 ${
            progressBarStyleOnStatusCode[statusCode] || "bg-gray-500 dark:bg-gray-400"
          } transition-all duration-150 ease-linear`}
          style={{ width: `${progress}%` }}
        ></div>
        {/* Progress bar code ends here */}

      </div>
      {/* Notification modal ends here */}

    </div>
  );
}

export default Modal;