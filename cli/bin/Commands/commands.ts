import {exec} from 'child_process'; 

export default function StartWsserverInNewWindow(command: string) {
    
    exec(`start cmd.exe /k ${command}`, (error) => {
        if (error) {
            console.error(`Could not open new terminal window: ${error.message}`);
        }
    });

}