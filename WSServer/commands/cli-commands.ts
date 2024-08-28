import http from "http";

import fetchconfig from "../fetchconfig.json";
import { Command } from "commander";
import path from 'path';
import fs from 'fs';

const fetchconfigPath = path.join(__dirname, '../fetchconfig.json');

// const port = process.env.PORT || 6553;
// const host = '192.168.1.53';


const program = new Command();
let server : any ;

program.exitOverride();

program
    .command('start')
    .description('Start the server using local ip')
    .option('-l, --listen <ip>', 'Server listen for incoming requests on local ip')
    .action(async (cmd) => {
         
          if (cmd.listen !== undefined && fetchconfig.Server.listen_ip === null) {
            // Case: --listen option provided and no IP assigned yet
            console.log(`Configuring server IP to ${cmd.listen}`);
            const appModule = await import('../App.js');
            const app = appModule.default;
    
            const server = http.createServer(app);
            server.listen(fetchconfig.Server.port, cmd.listen, () => {
              fetchconfig.Server.listen_ip = cmd.listen;
              console.log(fetchconfig.Server.listen_ip);
              fs.writeFile(fetchconfigPath, JSON.stringify(fetchconfig, null, 2), (err) => { // wont write to json file error 
                if (err) console.log(err, 'Error writing to fetchconfig');
              });
    
              const address: any = server.address();
              if (address) {
                console.log(`Server listening on ${address.address}:${address.port}`);
              } else {
                console.log('Server listening, but address information unavailable.');
              }
            });
          } else if (cmd.listen !== undefined && fetchconfig.Server.listen_ip !== null) {
                cmd.listen = undefined;
            // Case: --listen option provided but IP is already assigned
            console.log('The IP is already assigned. Use "start" without options.');
          } else if (cmd.listen === undefined && fetchconfig.Server.listen_ip !== null) {
            // Case: No --listen option provided and IP is already assigned
            const appModule = await import('../App.js');
            const app = appModule.default;
    
            const server = http.createServer(app);
            server.listen(fetchconfig.Server.port, fetchconfig.Server.listen_ip, () => {
              const address: any = server.address();
              if (address) {
                console.log(`Server listening on ${address.address}:${address.port}`);
              } else {
                console.log('Server listening, but address information unavailable.');
              }
            });
          } else {
            // Case: No --listen option provided and no IP assigned
            console.log('No IP specified');
          }
      });
        

program
  .command('stop')
  .description('Stop the server')
  .action(() => {
    console.log('Stopping server...');
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
  });
});

program
  .command('status')
  .description('Get server status')
  .action(() => {
    console.log('Server is running');
  });



export default program;
