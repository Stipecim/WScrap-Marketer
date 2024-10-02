// was using it for testing

// import fetchconfig from './cities.json';
// import http from 'http';
///import { Command } from 'commander';
// import readline from 'readline';



// function checkCityInConfig(location:any) {
//     return new Promise((resolve, reject) => {
//         fetchconfig.Cities.forEach((element, index, array) => {
//             if (element.city.includes(location)) {
//                 array.length = index + 1; // Truncate the array (simulating break)
//                 resolve(element); // Resolve the promise with the matched element
//             }
//         });

//         // If no city matches, you can handle it by rejecting or resolving with a default value
//         reject(new Error(`Location ${location} not found in the cities configuration`).message);
//     });
// }

// const server = http;

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

//const program = new Command();

// program.exitOverride();


// program
//   .version('1.0.0', '-v, --version', 'Display the current version of the program')
//   .description('WScrap-Marketer: A web scraping tool for fetching marketplace data.');


// program
//     .command('start-server <location> <item> <radius>')
//     .action(async (location, item, radius) => {

        
      
//         // Convert radius to a number and check if it's valid
//         const radiusNum = Number(radius);
//         if (isNaN(radiusNum) || radiusNum <= 0) {
//             console.log("error: Radius should be a positive number.");
//             return;
//         }

//         await checkCityInConfig(location).then(async (city) => {
            
//             const appModule = await import('./App.js');
//             const app = appModule.default;

//             server
//                 .createServer(app)
//                 .listen(fetchconfig.Server.port, fetchconfig.Server.listen_ip, () => {
//                     console.log(`Server is running on ${fetchconfig.Server.listen_ip}:${fetchconfig.Server.port}`)
//                 }); 

//         }).catch(error => console.log(error));
        
//     });



// (function inputLoop() {

//     console.log(`
//     ===================================
//      WScrap-Marketer: Version 1.0.0
//     -----------------------------------
//      A tool to scrape marketplace data
//      and provide real-time updates.
//     -----------------------------------
//     `);

//     rl.question('Enter a command: ', (input) => {
//         const args = input.trim().split(' ');

//         // Check if the command is 'exit' to close the app
//         if (args[0] === 'exit') {
//             console.log('Exiting the program...');
//             rl.close();
//             process.exit(0); // Gracefully exit the program
//         }

//         try {
//             // Simulate command-line arguments by adding 'node' and 'myProgram'
//             program.parse(args, { from: 'user' });
//         } catch (error:any) {
//         }

//         // Call the inputLoop again for continuous input
//         inputLoop();
//     });
// })();


import evaluateConfig, { evaluatedConfig } from './util/evaluateConfig';
import http from 'http';

// program
//     .option('-l, --link', 'Start program with link')
//     .parse(process.argv);

// const options = program.opts();

(async function inputLoop() {


    const evaluatedConfig: evaluatedConfig | undefined = evaluateConfig().evaluateINI();

    if(evaluatedConfig) {
        console.log(`
            ===================================
             WScrap-Marketer: Version 1.0.0
            -----------------------------------
             A tool to scrape Facebook and Gumtree
             market data and provide real-time 
             updates.
            -----------------------------------
        `);

        try {
            const server = http;

            const appModule = await import('./App.js');
            const app = appModule.default;

            server
                .createServer(app)
                .listen(evaluatedConfig.eServer.port, evaluatedConfig.eServer.host, () => {
                    console.log(`\nServer is running on ${evaluatedConfig.eServer.host}:${evaluatedConfig.eServer.port}\n`);
                });

        } catch (error) {
            console.log(`\nServer-error: ${error}\n`);
        }
         
    } else {
        process.exit(1);
    }

})();

