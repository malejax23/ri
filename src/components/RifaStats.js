import React from 'react';

const RifaStats = ({ tickets }) => {
  const soldCount = tickets.filter(t => t.owner !== '').length;
  const paidCount = tickets.filter(t => t.paid).length;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Estadísticas</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-lg p-4">
          <p className="text-sm text-indigo-600">Total Boletas</p>
          <p className="text-2xl font-bold text-indigo-700">250</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600">Vendidas</p>
          <p className="text-2xl font-bold text-green-700">{soldCount}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600">Pagadas</p>
          <p className="text-2xl font-bold text-blue-700">{paidCount}</p>
        </div>
      </div>
    </div>
  );
};

export default RifaStats;