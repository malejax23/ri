const generateUniqueNumbers = () => {
  const allNumbers = Array.from({length: 1000}, (_, i) => i.toString().padStart(3, '0'));
  const shuffled = [...allNumbers].sort(() => 0.5 - Math.random());
  
  const tickets = [];
  for (let i = 0; i < 250; i++) {
    const ticketNumbers = shuffled.slice(i*4, (i+1)*4);
    tickets.push({
      id: `TKT-${i.toString().padStart(3, '0')}`,
      numbers: ticketNumbers,
      owner: '',
      paid: false,
      paymentType: 'none',
      amountPaid: 0,
      totalValue: 50000 // Nuevo valor de $50,000
    });
  }
  return tickets;
};

export const initialTickets = generateUniqueNumbers();