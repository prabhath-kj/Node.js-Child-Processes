import { spawn } from "child_process";

const handler = spawn("node",{shell:true});

handler.stderr.on("data", (data) => {
  console.log(data);
});

handler.stdout.on("data", (data) => {
  console.log(data.toString());
});

handler.on("close", (code) => {
  console.log(`child process ended with ${code}`);
});
