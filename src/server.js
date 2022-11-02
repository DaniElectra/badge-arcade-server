process.title = 'Badge Arcade';

const express = require('express');
const fs = require('fs-extra');
const morgan = require('morgan');
const path = require('path');
const logger = require('../logger');
const config = require('../config.json');

const { http: { port } } = config;
const app = express();

const dataHandler = require('./data-handler');

// START APPLICATION
app.set('etag', false);
app.disable('x-powered-by');

// Create router
logger.info('Setting up Middleware');
app.use(morgan('dev'));
app.use(express.raw({
	type: "multipart/form-data"
}));

app.use(dataHandler);

// 404 handler
logger.info('Creating 404 status handler');
app.use((request, response) => {
	response.status(404);
	response.json({
		app: 'api',
		status: 404,
		error: 'Route not found'
	});
});

// non-404 error handler
logger.info('Creating non-404 status handler');
app.use((error, request, response) => {
	const status = error.status || 500;

	response.status(status);
	response.json({
		app: 'api',
		status,
		error: error.message
	});
});

// Check data path existance. Create the directory if it doesn't
const dataPath = path.normalize(`${__dirname}/../data/`);
if (!fs.pathExistsSync(dataPath)) {
	logger.info('Creating data folder');
	fs.mkdirSync(dataPath);
}

// Starts the server
logger.info('Starting server');

app.listen(port, () => {
	logger.success(`Server started on port ${port}`);
});