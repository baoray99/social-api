//access variables in.env
require('dotenv').config();

//import libs
const express = require('express');
const app = require('express')();
const port = process.env.PORT;

//cors
const cors = require('cors');

//compression
const compression = require('compression');

//fix cors
app.use(cors());

//improve performance
app.use(
  compression({
    level: 6, //level càng cao thì nén càng kĩ nhưng sẽ hao bộ nhớ server
    threshold: 100 * 1000, // đơn vị byte => 100k mới compression
    filter: (req, res) => {
      if (req.headers['x-no-compress']) {
        return false;
      }
      return compression.filter(req, res);
    }, // dùng để xem xét phản hồi có cần nén hay ko
  })
);

//Convert to json
app.use(express.json());

//App run
app.listen(port, () => {
  console.log(`App is listening at port:${port}`);
});
