import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

// Deve ser ajustado conforme a porta do arduino ou do sistema operacional 
// ('/dev/ttyUSB0' no Linux, 'COM3' no Windows)
const portName = 'COM3'; 

let buttonPresses = []; 

function handleSerialData(data, io) {
  const message = data.trim();
  if (message.includes('Botao')) {
    console.log('Mensagem do Arduino:', message);
    buttonPresses.push({ message, timestamp: new Date() });
    io.emit('buttonPress', { message }); 
  }
}

function setupSerial(io) {
  const port = new SerialPort({ path: portName, baudRate: 9600 });
  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  parser.on('data', (data) => handleSerialData(data, io));

  port.on('open', () => {
    console.log('Conexão serial aberta com sucesso!');
  });

  port.on('error', (err) => {
    console.error('Erro na serial:', err.message);
  });
}

export { setupSerial };