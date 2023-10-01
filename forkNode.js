import express from "express";
import { fork } from "child_process";
import { rejects } from "assert";

const PORT = 3000;
const app = express();

app.get("/one", (req, res, next) => {
  const result = cpuIntensiveTask();
  res.status(200).json({ result: result });
});

app.get("/two", async (req, res, next) => {
  const result = await cpuIntensiveTaskPromise();
  res.status(200).json({ result: result });
});

app.get("/three", (req, res, next) => {
  const handler = fork("child.js");
  handler.send("start");
  handler.on("message", (data) => {
    res.status(200).json({ result: data });
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

function cpuIntensiveTask() {
  let sum = 0;
  for (let index = 0; index < 1e9; index++) {
    sum += index;
  }
  return sum;
}

function cpuIntensiveTaskPromise() {
  return new Promise((resolve, reject) => {
    let sum = 0;
    for (let index = 0; index < 1e9; index++) {
      sum += index;
    }
    resolve(sum);
  });
}
