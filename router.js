const fs = require('fs');
const path = require('path');

function addSlashToPath(path) {
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
  
    if (!path.endsWith('/')) {
      path = path + '/';
    }
  
    return path;
}

const getJsFiles = (dirPath) => {
    let fileList = [];
  
    // Get the list of files in the current directory
    const files = fs.readdirSync(dirPath);
  
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
  
      // Check if the current item is a directory
      if (fs.lstatSync(filePath).isDirectory()) {
        // Recursively get JavaScript files from subdirectories
        const subdirectoryFiles = getJsFiles(filePath);
        fileList = fileList.concat(subdirectoryFiles);
      } else if (file.endsWith('.js')) {
        // Add JavaScript files to the list
        fileList.push(filePath);
      }
    });
  
    return fileList;
  };
  

module.exports = (express, verbose = false) => {

    const files = getJsFiles('./routes')
    const app = express();
    const routes = [];

    files.forEach((file) => {
        const required = require('./' + file);

        if (!"route" in required && required.route == null) {
            console.log(`Routing issue: "${file}" has a malformed "route"!`)
            return;
        }

        if (typeof required.route != 'string') {
            console.log(`Routing issue: "${file}" has a malformed "route"! (route must be a string)`)
            return;
        }

        const route = addSlashToPath(required.route)

        if (routes.includes(route)) {
            console.log(`Routing issue: "${route}" has already been registered!`)
            return;
        }

        routes.push(route)
        if (verbose) console.log(`Routing file: "\x1b[34m.\\${file}\x1b[0m" > "\x1b[34m${route}\x1b[0m"`);
        
        if (typeof required.function != 'function') {
            console.log(`Routing issue: "${route}" has a malformed function`)
            return;
        }
        
        app.use(route, required.function(express))
    });

    return app;

}