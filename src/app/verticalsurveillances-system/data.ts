// Extracted and formatted Excel data
export interface CheckInLog {
  date: string;
  checkInTime: string;
  checkOutTime: string;
}

export const data = {
  tenants: [
    { name: 'Irfan', logs: [{ date: '2024-01-04', checkInTime: '08:45 AM', checkOutTime: '05:15 PM' }] },
    { name: 'Ahmad', logs: [{ date: '2024-01-05', checkInTime: '09:00 AM', checkOutTime: '05:30 PM' }] },
  ],
  employees: [
    { name: 'Shabir', logs: [{ date: '2024-01-04', checkInTime: '08:30 AM', checkOutTime: '05:00 PM' }] },
    { name: 'Umair', logs: [{ date: '2024-01-05', checkInTime: '09:15 AM', checkOutTime: '06:00 PM' }] },
  ],
  visitors: [
    { name: 'Hamza', logs: [{ date: '2024-01-04', checkInTime: '10:00 AM', checkOutTime: '12:00 PM' }] },
    { name: 'Sharyar', logs: [{ date: '2024-01-05', checkInTime: '11:30 AM', checkOutTime: '01:00 PM' }] },
  ],
};