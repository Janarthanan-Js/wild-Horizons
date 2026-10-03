import { getDataFromDB } from "./db.js";
import http from "http";
import { sendJSON } from "./sendJSON.js";
import { getDataByPathParams } from "./getDataByPathParams.js";
import { getDataByQueryParams } from "./getDataByQueryParams.js";
const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {

    const destinations = await getDataFromDB();

    const urlObj=new URL(req.url, `http://${req.headers.host}`);

    const queryObj=Object.fromEntries(urlObj.searchParams);

    if (urlObj.pathname == '/api' && req.method == 'GET') {
        let filteredData = getDataByQueryParams(destinations, queryObj);

        sendJSON(res, 200,filteredData);
    }

    else if (req.url.startsWith('/api/continent') && req.method == 'GET') {

        const continent = req.url.split('/').pop();

        const filteredData = getDataByPathParams(destinations, 'continent', continent);

        sendJSON(res, 200, filteredData);
    }

    else if (req.url.startsWith('/api/country') && req.method == 'GET') {

        const country = req.url.split('/').pop();

        const filteredData = getDataByPathParams(destinations, 'country', country
        );

        sendJSON(res, 200, filteredData);
    }

    else {
        sendJSON(res, 404, { message: 'Resource not found' });
    }
});

server.listen(PORT, () => {
    console.log('Server connected on port:' + PORT);
});