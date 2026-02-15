import 'reflect-metadata';

import express from 'express';
import { dataSource } from './database/data-source.ts';
import { AppointmentService } from './services/appointment.service.ts';

const app = express();
app.use(express.json());

dataSource
  .initialize()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((error: Error) =>
    console.error('Error connecting to the database:', error),
  );

app.get('/', async (req, res) => {
  const appointmentService = new AppointmentService();
  await appointmentService.createAppointment(
    'Test Appointment',
    'This is a test appointment',
  );
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
