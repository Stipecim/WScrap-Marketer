import { Command } from "commander";
import StartWsserverInNewWindow from "./Commands/commands.js";
import path from 'path';
import axios from 'axios';



const Program = new Command();

// Main
(async function main() {
    
    const response = await axios.get('https://ipinfo.io/ip');
    const publicISPServerIP = response.data.trim();
    
    Program
        .name("Marketer Web-Scrap Server")
        .description("This is cli interface for Martketer WSServer")
        .version("v1.0.0");

    Program
        .command('wsserver-start')
        .description("Start Web-Scrap-Server")
        .action(async () => {
            const wsserverpath = path.resolve(__dirname, '../../wsserver/server.js');
            if(publicISPServerIP) {
                console.log(`PublicIP address: ${publicISPServerIP}`);
            }
            StartWsserverInNewWindow(`node ${wsserverpath}`);
        });
    
    Program.parse(process.argv);
    
})();