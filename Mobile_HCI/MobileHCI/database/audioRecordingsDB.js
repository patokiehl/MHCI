import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('recordings.db');


const initDatabase = () => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS recordings (id INTEGER PRIMARY KEY NOT NULL, uri TEXT, duration INTEGER);",
        [],
        (_, error) => console.log('Error creating table', error)
      );
    });
  };
  


initDatabase();

export const connectToDatabase = () => {
    return SQLite.openDatabase("TwoRoadsV2.db");
  };
  


// Function to insert a new recording into the database
export const saveRecordingToDatabase = async (recording, duration) => {
    const uri = recording.getURI();
    const status = await recording.getStatusAsync();
    //const duration = status.durationMillis;  // Get the duration in milliseconds
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO recordings (uri, duration) VALUES (?, ?);",
                [uri, duration],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    console.error('Error saving recording:', error);
                    reject(error);
                }
            );
        });
    });
};



export const fetchRecordings = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT id, uri, duration FROM recordings;',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
};
