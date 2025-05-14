import React, { useState, useEffect } from 'react';
import { initialTickets } from './mock/tickets';
import { getTickets, saveTickets } from './utils/storage';
import RifaHeader from './components/RifaHeader';
import RifaStats from './components/RifaStats';
import RifaTicketCard from './components/RifaTicketCard';
import RifaReportModal from './components/RifaReportModal';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const storedTickets = getTickets();
    setTickets(storedTickets || initialTickets);
  }, []);

  const handleUpdateTicket = (id, updates) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates } : ticket
    );
    setTickets(updatedTickets);
    saveTickets(updatedTickets);
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'available') return ticket.owner === '';
    if (filter === 'sold') return ticket.owner !== '';
    if (filter === 'paid') return ticket.paid;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <RifaHeader />
      
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-wrap gap-4 mb-6">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'all' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('available')} 
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'available' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Disponibles
          </button>
          <button 
            onClick={() => setFilter('sold')} 
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'sold' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Vendidas
          </button>
          <button 
            onClick={() => setFilter('paid')} 
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'paid' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Pagadas
          </button>
          <button 
            onClick={() => setShowReport(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 ml-auto"
          >
            Reporte
          </button>
        </div>

        <RifaStats tickets={tickets} />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map(ticket => (
            <RifaTicketCard 
              key={ticket.id} 
              ticket={ticket} 
              onUpdate={handleUpdateTicket} 
            />
          ))}
        </div>

        {showReport && (
          <RifaReportModal 
            tickets={tickets} 
            onClose={() => setShowReport(false)} 
          />
        )}
      </main>
    </div>
  );
};

export default App;

// DONE