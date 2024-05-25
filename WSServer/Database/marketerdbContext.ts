import sqlite from 'sqlite3';
import path from 'path'


export default class LOCALDB {
    _db;
    constructor(message: string) {
        const __filename = new URL(import.meta.url).pathname;
        let projectRoot = path.dirname(path.dirname(path.dirname(__filename)));
        const dirname = path.join(projectRoot, 'Database');

        
        this._db = new sqlite.Database("C:/Users/vboxuser/Desktop/Project/WScrap-Marketer/WSServer/Database/marketer.db", sqlite.OPEN_READWRITE, (err) => {
            if(err) {
                return console.error(err.message);
            }
            console.log("Successfully connected to database.\n", message)
        });
    }

    async isTableEmpty(table: string): Promise<any> { 
        return new Promise ((resolve, reject) => {

            const sql = `SELECT COUNT(*) AS count FROM ${table}`;
            this._db.get(sql, function(err, row: any) {
               
                if(err) { console.error(err); reject(new Error("Database Error")); }
                
                const rowCount = row.count;
                const isEmpty = rowCount === 0;
                resolve(isEmpty);
                
            });
        
        });
    } 
        
    generateQuery(table: string, data: object) {
            const columns = Object.keys(data);
            const values = Object.values(data).map(String);

            const columnsPart = columns.join(', ');
            const placeholders = columns.map(() => '?').join(', ');
        
        return {

            insert: () => {
                let sql = `INSERT INTO ${table} (${columnsPart}) VALUES (${placeholders})`;

                this._db.run(sql, values, function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(`A new row has been inserted into table ${table} with ID ${this.lastID}`);
                });
            }

        };
    }
}