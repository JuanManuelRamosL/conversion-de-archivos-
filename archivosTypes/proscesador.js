const fs = require('fs');
const csv = require('csv-parser');

function processCSV(file, callback) {
  const results = [];
  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Devuelve los resultados procesados a través de un callback
      callback(null, results);
    })
    .on('error', (err) => {
      callback(err);
    });
}

function processTXT(file, callback) {
  fs.readFile(file.path, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    const lines = data.split('\n'); // Cada línea en un array
    callback(null, lines); // Devuelve las líneas del archivo como un array
  });
}

// Exporta ambas funciones
module.exports = { processCSV, processTXT };
