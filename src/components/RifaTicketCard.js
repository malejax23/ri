import React, { useState } from 'react';

const RifaTicketCard = ({ ticket, onUpdate }) => {
  const [ownerName, setOwnerName] = useState(ticket.owner || '');
  const [paymentType, setPaymentType] = useState(ticket.paymentType || 'none');
  const [amountPaid, setAmountPaid] = useState(ticket.amountPaid || 0);

  const handleSave = () => {
    const updates = {
      owner: ownerName,
      paid: paymentType === 'full',
      paymentType,
      amountPaid: Number(amountPaid)
    };
    onUpdate(ticket.id, updates);
  };

  const handlePrint = () => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 2px solid #ec4899; border-radius: 10px;">
        <h1 style="color: #ec4899; text-align: center; margin-bottom: 5px;">Rifa Activa Tu Corazón</h1>
        <h2 style="text-align: center; margin-top: 0; color: #333;">Boleta #${ticket.id}</h2>
        <p style="text-align: center; font-weight: bold; color: #333; margin-bottom: 15px;">Valor: $50,000</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0;">
          ${ticket.numbers.map(num => `
            <div style="background: #fce7f3; padding: 15px; text-align: center; border-radius: 8px; font-weight: bold; font-size: 18px;">
              ${num}
            </div>
          `).join('')}
        </div>
        
        <p style="margin-bottom: 5px;"><strong>Propietario:</strong> ${ownerName || 'Sin asignar'}</p>
        <p style="margin-bottom: 5px;"><strong>Estado:</strong> ${paymentType === 'full' ? 'Pagado' : paymentType === 'partial' ? 'Abono' : 'Pendiente'}</p>
        <p style="margin-bottom: 15px;"><strong>Valor abonado:</strong> $${amountPaid.toLocaleString()} de $50,000</p>
        
        <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin-top: 20px; border: 1px solid #bbf7d0;">
          <p style="text-align: center; margin: 0; font-weight: bold; color: #166534;">
            Juega el día 24 de Mayo con la Lotería de Boyacá
          </p>
          <p style="text-align: center; margin: 5px 0 0; color: #166534;">
            ${paymentType === 'full' ? '¡Tu boleta está paga y participará!' : paymentType === 'partial' ? 'Tu abono ha sido registrado' : 'Si tu boleta está paga participará'}
          </p>
        </div>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Boleta de Rifa #${ticket.id}</title>
          <style>
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${printContent}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-gray-100 hover:border-pink-300 transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">Boleta #{ticket.id}</h3>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            paymentType === 'full' ? 'bg-green-100 text-green-800' : 
            paymentType === 'partial' ? 'bg-blue-100 text-blue-800' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            {paymentType === 'full' ? 'Pagado' : paymentType === 'partial' ? 'Abono' : 'Pendiente'}
          </span>
          <p className="text-sm font-medium text-pink-600 mt-1">$50,000</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {ticket.numbers.map(num => (
          <div key={num} className="bg-pink-50 rounded-lg p-3 text-center font-mono font-bold text-pink-700 text-lg">
            {num}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Nombre del comprador"
        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de pago</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setPaymentType('none')}
            className={`py-2 rounded-lg font-medium ${paymentType === 'none' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Ninguno
          </button>
          <button
            onClick={() => setPaymentType('partial')}
            className={`py-2 rounded-lg font-medium ${paymentType === 'partial' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Abono
          </button>
          <button
            onClick={() => setPaymentType('full')}
            className={`py-2 rounded-lg font-medium ${paymentType === 'full' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Completo
          </button>
        </div>
      </div>

      {paymentType === 'partial' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Valor abonado</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              min="0"
              max="50000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Total boleta: $50,000</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700"
        >
          Guardar
        </button>
        
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 ml-auto"
        >
          Imprimir Boleta
        </button>
      </div>
    </div>
  );
};

export default RifaTicketCard;

// DONE