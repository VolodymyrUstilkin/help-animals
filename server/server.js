const {resolve} = require('path');

const express = require('express')
const cors = require('cors');

const port = process.argv[2];
const staticFolderPath = resolve(__dirname, '..', 'dist', 'help-animals');

const app = express();
app.use(cors());
app.use(express.static(staticFolderPath));

app.get('*', (req, res) => {
  res.sendFile(resolve(staticFolderPath, 'index.html'));
})

app.listen(port, () => {
  console.log(`App listening at port: ${port}`)
})
