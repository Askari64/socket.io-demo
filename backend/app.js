import express from "express";

const port = 3000;
const app = express();


app.get('/', (req, res) =>{
    res.send('Hello World')
})

app.listen(3000, () => {
  console.log(`Server started on ${port}`);
});
