const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

let corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4000"]
}

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../frontend/build')));


const gemini = require('./geminiAPI/gemini.js')

app.get('/get', (req, res) => {   //4000/get으로 요청이 들어올 때!
  const hello = "Hello, this is a response for get request.";
  console.log(hello);
  // res.sendStatus(200);
  res.send('server 메시지: get 요청을 하셨군요.');
});
//오예 성공..

app.use(bodyParser.json());

app.post('/post', async (req, res) => {
  try {
    const input = req.body.message;

    if (!input) {
      return res.status(400).json({ error: '입력값 없음.' });
    }
    // const { message } = req.body;
    // const input = req.body.message;
    // console.log("받은 메시지:", message);
    const reply = await gemini( input )   //await 와 async 써줘야됨!!
    // res.json({ AIRes: `${message}` });
    res.json({ AIRes: `${reply}` });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
