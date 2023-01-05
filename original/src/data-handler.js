const path = require('path');
const fs = require('fs-extra');
const express = require('express');
const subdomain = require('express-subdomain');
const crypto = require("crypto");
const logger = require('../logger');

// Router to handle the subdomain restriction
const dataHandler = express.Router();

// Authorization key sha256 hash
const authHash = "b912e7d825ab57f7c48255c03ae1fa6fad51b57ef7952d8c58a22a34bfa94580";

// Setup routes

dataHandler.head('/10.CTR_JWVJ_datastore/ds/1/data/:fileName', (request, response) => {
	const { fileName } = request.params;
	const contentPath = path.normalize(`${__dirname}/../data/${fileName}`);

	if (fs.existsSync(contentPath)) {
		const contentSize = fs.statSync(contentPath).size;
		response.set('Content-Length', contentSize);
		response.end();
		logger.success("HEAD: File length sent");
	} else {
		logger.error("HEAD: File doesn't exist");
		response.sendStatus(404);
	}
})

dataHandler.get('/10.CTR_JWVJ_datastore/ds/1/data/:fileName', (request, response) => {
	/*
	var authorizationHeader = request.header("Authorization");
	if (authorizationHeader == undefined) {
		logger.error("GET: Missing auth key");
		response.sendStatus(403); // Missing auth key
		return;
	}

	var auth = authorizationHeader.split(":")[0];
	auth = auth.split(" ")[1];
	var givenAuthHash = crypto.createHash("sha256").update(auth).digest("hex");

	if (givenAuthHash != authHash) {
		logger.error("GET: Invalid auth key");
		response.sendStatus(403); // Invalid auth key
		return;
	}
	*/

	const { fileName } = request.params;
	const contentPath = path.normalize(`${__dirname}/../data/${fileName}`);

	if (fs.existsSync(contentPath)) {
		response.set('Content-Type', 'binary/octet-stream');
		response.sendFile(contentPath);
		logger.success("GET: File data sent");
	} else {
		logger.error("GET: File doesn't exist");
		response.sendStatus(404);
	}
});

dataHandler.post('/', (request, response) => {
	// Check for valid request
	if (!request.get('Content-Type').includes("multipart/form-data")) {
		logger.error("POST: Invalid request");
		response.sendStatus(400); // Invalid request (incorrect Content-Type)
		return;
	}
	
	var formData = request.body;
	const fileNameRegex = new RegExp('name="key"\r\n\r\n(.*)');
	var output = fileNameRegex.exec(formData)[1];
	var fileName = path.basename(output);

	const outputPath = path.normalize(`${__dirname}/../data/${fileName}`);
	if (fs.existsSync(outputPath)) {
		logger.error("POST: File already exists");
		response.sendStatus(409); // File already exists
		return;
	}

	const aclRegex = new RegExp('name="acl"\r\n\r\n(.*)');
	var acl = aclRegex.exec(formData)[1];
	/*
	const authRegex = new RegExp('name="AWSAccessKeyId"\r\n\r\n(.*)');
	var auth = authRegex.exec(formData)[1];
	if (auth == undefined) {
		logger.error("POST: Missing auth key");
		response.sendStatus(403); // Missing auth key
		return;
	}

	var givenAuthHash = crypto.createHash("sha256").update(auth).digest("hex");
	if (givenAuthHash != authHash) {
		logger.error("POST: Invalid auth key");
		response.sendStatus(403); // Invalid auth key
		return;
	}
	*/

	const policyRegex = new RegExp('name="policy"\r\n\r\n(.*)');
	 // var policy = policyRegex.exec(formData)[1];

	// Save file data (match every character until boundary)
	const dataRegex = new RegExp('name="file"\r\n\r\n(.*)\r\n----------BOUNDARY--------', 'ms')
	var fileData = dataRegex.exec(formData.toString('latin1'))[1];
	
	fs.createFileSync(outputPath);
	fs.writeFileSync(outputPath, fileData, "binary");

	logger.success("POST: File data saved");
	response.sendStatus(204);
});

// Main router for endpoints
const router = express.Router();

// Change comment to create subdomain
router.use(dataHandler);
// router.use(subdomain('ctr-lwvj-live.s3', dataHandler));

module.exports = router;