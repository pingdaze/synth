var fs = require('fs');

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${path}"...`);
    fs.rmdirSync(path);
  }
};

console.log("Cleaning contract artifacts");

deleteFolderRecursive("./artifacts");

console.log("Successfully cleaned contract artifacts!");

console.log("Cleaning typechain types");

deleteFolderRecursive("./typechain-types");

console.log("Successfully cleaned typechain types!");

console.log("Cleaning cache");

deleteFolderRecursive("./cache");

console.log("Successfully cleaned cache!");