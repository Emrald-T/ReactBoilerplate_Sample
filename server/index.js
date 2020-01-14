/* eslint consistent-return:0 import/order:0 */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* prettier-disable */

const express = require('express');
const logger = require('./logger');
const stringify = require('json-stringify-safe');

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

// Route for getting Project list and generating tree
router.get(/Projects/, (req, res) => {
  const lostChildList = {};
  const treeObject = {};
  const finalList = [];
  const data = [
    { ProjectNo: '201', OrderType: 'IO', ProjDesc: 'First IO', Parent: '' },
    { ProjectNo: '202', OrderType: 'IO', ProjDesc: '2 IO', Parent: '201' },
    { ProjectNo: '203', OrderType: 'IO', ProjDesc: '3 IO', Parent: '201' },
    { ProjectNo: '204', OrderType: 'IO', ProjDesc: 'Four IO', Parent: '203' },
    { ProjectNo: '205', OrderType: 'IO', ProjDesc: '5 IO', Parent: '203' },
    { ProjectNo: '206', OrderType: 'IO', ProjDesc: '6 IO', Parent: '201' },
    { ProjectNo: '207', OrderType: 'IO', ProjDesc: '7 IO', Parent: '206' },
    { ProjectNo: '1001', OrderType: 'CC', ProjDesc: '1 CC', Parent: '' },
    { ProjectNo: '1002', OrderType: 'CC', ProjDesc: 'TWo CC', Parent: '' },
    { ProjectNo: '1003', OrderType: 'CC', ProjDesc: 'Three CC', Parent: '' },
    { ProjectNo: '1004', OrderType: 'CC', ProjDesc: '4 CC', Parent: '' },
    { ProjectNo: '1005', OrderType: 'CC', ProjDesc: 'Five CC', Parent: '' },
    {
      ProjectNo: '1502100', OrderType: 'FC', ProjDesc: 'Project 1', Network: '12070121114', Activity: '800',
      NwDesc: 'NetWork Desc 1',ActDesc: 'Act Desc 1', Parent: '',
    },
    {
      ProjectNo: '105A', OrderType: 'FC', ProjDesc: 'Project 1.1', Network: '12070121114', Activity: '800',
      NwDesc: 'NetWork Desc 1',ActDesc: 'Act Desc 1', Parent: '1502100',
    },
    {
      ProjectNo: '106A', OrderType: 'FC', ProjDesc: 'Project 1.2', Network: '12070121114', Activity: '800',
      NwDesc: 'NetWork Desc 1',ActDesc: 'Act Desc 1', Parent: '1502100',
    },
    {
      ProjectNo: '1502101', OrderType: 'FC', ProjDesc: 'Project 2', Network: '12070121114', Activity: '800',
      NwDesc: 'NetWork Desc 2', ActDesc: 'Act desc 2', Parent: '',
    },
    {
      ProjectNo: '110B', OrderType: 'FC', ProjDesc: 'Project 2.1', Network: '12070121114', Activity: '800',
      NwDesc: 'NetWork Desc 2', ActDesc: 'Act desc 2', Parent: '1502101',
    },
    {
      ProjectNo: '105A', OrderType: 'FC', ProjDesc: 'Project 2.2', Network: '12070121114', Activity: '800',
      NwDesc: 'NetWork Desc 2', ActDesc: 'Act desc 2', Parent: '1502101',
    },
  ];

  // Construct the tree
  for (let i = data.length - 1; i >= 0; i -= 1) {
    const keyValue = data[i].ProjectNo;
    const parent = data[i].Parent;
    data[i].children = [];
    // See if it is root node or not
    if (parent === '') {
      finalList.push(data[i]);
    } else {
      const treeItem = treeObject[parent];
      // If parent exists already, get its reference while excluding the children
      if (treeItem) {
        treeItem.children.push(data[i]);
        // If parent doesnt exist yet
      } else {
        const lcArray = lostChildList[parent] || [];
        lcArray.push(data[i]);
        lostChildList[parent] = lcArray;
      }
    }
    // Add/Set to the tree object
    treeObject[keyValue] = data[i];
    // Search if children came before parentNode
    if (lostChildList[keyValue]) {
      data[i].children = data[i].children.concat(
        lostChildList[keyValue],
      );
      delete lostChildList[keyValue];
    }
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(stringify({ tree: finalList, list: treeObject}));
});

// Route for getting employee Data
router.get(/EmployeeData(.*)/, (req, res) => {
  const { pathname } = url.parse(req.url);
  const parts = pathname.split("/")[2].split(" | ");
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
