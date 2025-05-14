export const getTickets = () => {
  const storedTickets = localStorage.getItem('rifaTickets');
  return storedTickets ? JSON.parse(storedTickets) : null;
};

export const saveTickets = (tickets) => {
  localStorage.setItem('rifaTickets', JSON.stringify(tickets));
};