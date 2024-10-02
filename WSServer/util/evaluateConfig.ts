import path from 'path';
import fs from 'fs';
import ini from 'ini';
import cities from '../cities.json';
import os from 'os';

interface config {
    server: {
        host: string;
        port: number;
    };
    fetchConfig: {
        item: string;
        location: string;
        radius: number;
        //linkF: string | undefined;
       //linkG: string | undefined;
    };
}

export interface evaluatedConfig {
    eServer: {
        host: string;
        port: number;
    };
    eFetchConfig: {
        item: string;
        location: {
            facebook: string;
            gumtree: string;
        };
        radius: {
            gumtree: number;
        };
        //link: string | undefined;
    };
}


let evaluatedConfigCache: evaluatedConfig | undefined = undefined;
let eFlag = false;

export default function evaluateConfig() {
    
    return {

        evaluatedConfigCache,

        evaluateINI: (/*flag: boolean | undefined*/): evaluatedConfig | undefined => {

            
            let config: config;
        // ----- path resolution --- //
             
            if((process as any).pkg) { 

                const configContent = fs.readFileSync(path.join(process.cwd(), 'config.ini'), 'utf-8');

                config: config = ini.parse(configContent) as config;

            } else {

                const pathToINI = __dirname;

                const cutoffPoint = pathToINI.indexOf('wscrap-marketer');
                const cutPath = pathToINI.slice(0, cutoffPoint + 'wscrap-marketer'.length);

                //console.log(pathToINI)

                const configContent = fs.readFileSync(path.join(cutPath, 'build/config.ini'), 'utf-8');

                config: config = ini.parse(configContent) as config;

            }
        // ------------------------- // 

            const configLocationInput = config.fetchConfig.location.toLowerCase();
            const availableLocations = cities.Cities;
            const networkInterfaces = os.networkInterfaces();
            
            let ip = undefined;

            for (const interfaceName in networkInterfaces) {
                const interfaces: any = networkInterfaces[interfaceName];
            
                for (const iface of interfaces) {
                  
                  if (iface.family === 'IPv4' && !iface.internal) {
                    ip = true;
                  }
                }
            }

            if(!ip) {
                console.log("\nServer-error: Make sure your Ipv4 is related to device. \n")
                return undefined;
            }


            const radiusNum = Number(config.fetchConfig.radius);
            if (isNaN(radiusNum) || radiusNum <= 0) {
                console.log("\nServer-error: Radius should be a positive number, check your ini files. \n");
                return undefined;
            }

            
            // if(flag) {
                
            //     if(!config.fetchConfig.linkF && !config.fetchConfig.linkG) {
            //         console.log("\nServer-error: Make sure you add link to config before using '-l, --link' flag\n")
            //         return undefined;
            //     }

            //     const parsedLinkF= new URL(config.fetchConfig.linkF);

            //     let matchFb = 0;
            //     let matchGt = 0;
                
            //     ['facebook.com','/marketplace','gumtree.com','/search'].forEach((item,index) => {
            //         switch(index) {
            //             case 0:
            //                 if(parsedUrl.hostname.includes(item)) matchFb++;
            //                 break;
            //             case 1:
            //                 if(matchFb === 1 && parsedUrl.pathname.includes(item)) matchFb++;
            //                 break;
            //             case 2:
            //                 if(parsedUrl.hostname.includes(item)) matchGt++;
            //                 break;
            //             case 3:
            //                 if(matchGt === 1 && parsedUrl.pathname.includes(item)) matchGt++;
            //                 break;
            //         }
            //     })

            //     if (matchFb < 2 && matchGt < 2) {
            //         console.log("\nServer-error: Make sure you use valid link. See example in config file.\n")
            //         return undefined;
            //     }

            //     // not going to work this way :P
                 
            // } 


            for (let i = 0; i < availableLocations.length; i++ ) {
                if(availableLocations[i].city.toLowerCase() === configLocationInput) {
                    return evaluatedConfigCache = {
                        eServer: {
                            host: config.server.host,
                            port: config.server.port
                        },
                        eFetchConfig: {
                            item: config.fetchConfig.item,
                            location: {
                                facebook: availableLocations[i].id,
                                gumtree: availableLocations[i].city
                            },
                            radius: {
                                gumtree: config.fetchConfig.radius
                            },
                            //link: flag ? config.fetchConfig.link : ''

                        }
                    };
                }
            }

            console.log("\nServer-error: Correct spelling or change to different location.\n");

            return evaluatedConfigCache;
        },
        

    }
    
} 