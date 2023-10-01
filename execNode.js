import { exec } from "child_process";

exec("dir", (error, stderr, stdout) => {
  if (error) {
    console.log(`error ${error.message}`);
    return;
  }
  console.log(`error ${stderr}`);

  console.log(`stdout ${stdout}`);
});
