import sqlite from 'sqlite3';
import path from 'path';

const _dir = (process as any).pkg ? process.cwd() : __dirname;
//const execDir = path.dirname(process.execPath);
//const devEnvPath = path.resolve(__dirname, "../", "wsserver/database/marketer.db");

export default class LOCALDB {
    private _db;
    constructor(message: string) {

        console.log(path.resolve(_dir, "marketer.db")) // just move marketer.db to dist/database 
        
        this._db = new sqlite.Database(path.resolve(_dir, "marketer.db"), sqlite.OPEN_READWRITE, (err:any) => {
            if(err) {
                return console.error(err.message);
            }
            console.log("\nSuccessfully connected to database from: \n", message);
        });
    }

   
    async isTableEmpty(table: string): Promise<any> { 
        return new Promise ((resolve, reject) => {

            const sql = `SELECT COUNT(*) AS count FROM ${table}`;
            this._db.get(sql, function(err:any , row: any) {
               
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
                return new Promise((resolve, reject) =>{
                    let sql = `INSERT INTO ${table} (${columnsPart}) VALUES (${placeholders})`;

                    this._db.run(sql, values, function(err) {
                        if(err) { console.error(err); reject(false); }
                        console.log(`A new row has been inserted into table ${table}`);
                        resolve(true);
                    });
                });
                
            },

            get: () => {
                return new Promise((resolve, reject) => {
                    let sql = `SELECT * FROM ${table} WHERE ${columnsPart} = ${placeholders}`;

                    this._db.get(sql, values, function(err, row: any){
                        if(err) { console.error(err); reject(undefined); }
                        resolve(row);
                    });
                });
                
            },


            getAll: () => {
                return new Promise((resolve, reject) => {
                    let sql = `SELECT * FROM ${table}`;

                    this._db.all(sql, function(err, row: any[]){
                        if(err) { console.error(err); reject(undefined); }
                        resolve(row);
                    });
                });
                
            },



        
            emptyTableAll: () => { 
                return new Promise((resolve, reject) => {
                    let sql = `DELETE FROM ${table}`;

                    this._db.run(sql, function(err){
                        if(err) { console.error(err); reject(false); }
                        console.log(`Successfully deleted data from table ${table}`);
                        resolve(true);
                    });
                });
                
            }


        };
    }

    Close() {
        this._db.close();
        console.log("\nServer: Disconnected form db\n");
    }
}