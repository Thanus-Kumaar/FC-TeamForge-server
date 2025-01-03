const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ngrok = require('ngrok');
const { PORT, NGROK_AUTH_TOKEN } = require('./config/env');

// routes
const playerRoutes = require('./routes/playerRoutes');
const formationRoutes = require('./routes/formationRoutes');
const teamRoutes = require('./routes/teamRoutes');

// Error 
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


app.use('/api/players', playerRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api/teams', teamRoutes);

// 
app.use(errorHandler);

(async () => {
    try {
        const url = await ngrok.connect({
            addr: PORT,
            authtoken: NGROK_AUTH_TOKEN,
        });
        console.log(`[MESSAGE]: Ngrok is live at ${url}`);
    } catch (error) {
        console.error(`[ERROR]: Ngrok connection failed. Details: ${error.message}`);
    }
})();

// Starting the server
app.listen(PORT, () => {
    console.log(`[MESSAGE]: Server is running on port ${PORT}`);
});
