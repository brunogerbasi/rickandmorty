import React from 'react';
import { X } from 'lucide-react';

export interface ModalProps { 
  message: string;  
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring"
        aria-label="Fechar"
      >
        <X size={20} aria-hidden="true" />
      </button>
      <h2 className="text-lg font-semibold mb-2">Erro</h2>
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  </div>
);