/* eslint consistent-return:0 import/order:0 */
/* eslint-disable no-plusplus */
/* prettier-disable */

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();
const router = express.Router();
const url = require('url');

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', router);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Route for getting employee Data
router.get(/EmployeeData(.*)/, (req, res) => {
  const { pathname } = url.parse(req.url);
  const parts = pathname.split("/")[2].split("_");
  const project = parts[0];
  const fastcode = parts[1];
  const data = [
    {ProjectNo: "1502100", Fastcode: "105A", Ename: "Aaron Finch", Empno: "1902320", OrderType: "FC", St: 0, Ot: 0, Dt: 1, Total: 1, Notes: ""},
    {ProjectNo: "1502100", Fastcode: "105A", Ename: "Belamy Blake", Empno: "1902321", OrderType: "FC", St: 0, Ot: 0, Dt: 1, Total: 1, Notes: ""},
    {ProjectNo: "1502100", Fastcode: "105A", Ename: "George Fischer", Empno: "1902322", OrderType: "FC", St: 0, Ot: 0, Dt: 1, Total: 1, Notes: ""},
    {ProjectNo: "1502100", Fastcode: "105A", Ename: "Jeromi Wells", Empno: "1902323", OrderType: "FC", St: 0, Ot: 4, Dt: 1, Total: 5, Notes: ""},
    {ProjectNo: "1502100", Fastcode: "105A", Ename: "Kim Otaga", Empno: "1902324", OrderType: "FC", St: 0, Ot: 0, Dt: 1, Total: 1, Notes: ""},
    {ProjectNo: "", Fastcode: "202", Ename: "Aaron Finch", Empno: "1902320", OrderType: "IO", St: 0, Ot: 0, Dt: 3, Total: 3, Notes: ""},
    {ProjectNo: "", Fastcode: "202", Ename: "Belamy Blake", Empno: "1902321", OrderType: "IO", St: 0, Ot: 0, Dt: 1, Total: 1, Notes: ""},
    {ProjectNo: "", Fastcode: "202", Ename: "George Fischer", Empno: "1902322", OrderType: "IO", St: 0, Ot: 0, Dt: 2, Total: 2, Notes: ""},
    {ProjectNo: "", Fastcode: "1003", Ename: "George Fischer", Empno: "1902322", OrderType: "CC", St: 0, Ot: 4, Dt: 0, Total: 4, Notes: ""},
    {ProjectNo: "", Fastcode: "1003", Ename: "Jeromi Wells", Empno: "1902323", OrderType: "CC", St: 0, Ot: 2, Dt: 0, Total: 2, Notes: ""},
  ];
  const results = [];

  for (let i = data.length - 1; i >= 0; i--) {
    if ((project === "CC" || project === "IO") && fastcode === data[i].Fastcode) {
      results.push(data[i]);
    } else if (project === data[i].ProjectNo && fastcode === data[i].Fastcode) {
      results.push(data[i]);
    }
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send({results});
});

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let customURL;
    try {
      customURL = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, customURL);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
