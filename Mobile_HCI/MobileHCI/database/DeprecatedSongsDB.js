// songsQueries.js
import { connectToDatabase } from './db';

// Function to insert a new song
export const insertSong = async (title, uri) => {
  const db = connectToDatabase();
  const insertQuery = `
    INSERT INTO songs (title, uri) VALUES (?, ?);
  `;
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        insertQuery,
        [title, uri],
        (_, resultSet) => resolve(resultSet),
        (_, error) => reject(error)
      );
    });
  });
};

// Function to retrieve all songs
export const getAllSongs = async () => {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM songs;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
