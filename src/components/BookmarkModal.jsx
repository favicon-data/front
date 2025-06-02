import React from 'react';

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  // 헤더 높이(예: 80px) + 여백(예: 16px)
  const HEADER_HEIGHT = 80;
  const MARGIN_TOP = 16;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30">
      <div
        className="absolute bg-white rounded-lg shadow-lg p-6 min-w-[340px] max-h-[80vh] overflow-y-auto"
        style={{
          left: '14%',
          top: '250px',
          transform: 'translateX(-50%)',
        }}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
