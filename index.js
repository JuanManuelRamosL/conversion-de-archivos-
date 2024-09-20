const express = require('express');
const multer = require('multer');
const morgan = require('morgan');

const { processCSV, processTXT } = require('./archivosTypes/proscesador'); // Importa las funciones
const app = express();
app.use(morgan('dev'));
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo.' });
  }

  // Procesar archivo CSV
  if (file.mimetype === 'text/csv') {
    processCSV(file, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error procesando archivo CSV.' });
      }
      res.json({ message: 'Archivo CSV procesado con éxito.', data });
    });
  }
  
  // Procesar archivo .txt
  else if (file.mimetype === 'text/plain') {
    processTXT(file, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error procesando archivo .txt.' });
      }
      res.json({ message: 'Archivo .txt procesado con éxito.', data });
    });
  }

  // Tipo de archivo no soportado
  else {
    res.status(400).json({ error: 'Tipo de archivo no soportado.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
