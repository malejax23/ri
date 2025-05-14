import React from 'react';

const RifaReportModal = ({ tickets, onClose }) => {
  const availableTickets = tickets.filter(t => t.owner === '');
  const paidTickets = tickets.filter(t => t.paid);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Reporte de Boletas</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-pink-50 rounded-lg p-4">
            <p className="text-sm text-pink-600">Boletas Disponibles</p>
            <p className="text-2xl font-bold text-pink-700">{availableTickets.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600">Boletas Pagadas</p>
            <p className="text-2xl font-bold text-green-700">{paidTickets.length}</p>
          </div>
        </div>

        <h4 className="font-medium text-gray-700 mb-2">Boletas disponibles:</h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {availableTickets.map(ticket => (
            <div key={ticket.id} className="bg-gray-100 rounded p-2 text-center text-sm">
              #{ticket.id}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700"
        >
          Cerrar Reporte
        </button>
      </div>
    </div>
  );
};

export default RifaReportModal;