import "reflect-metadata";
import { Connection } from 'typeorm';
import { Database } from '../../database'

export default () => {
  const closeDb = async (request) => {
    if (request.context.connection) {
      console.info(`Closing DB connection`);
      await request.context.connection.close();
    }
  };
  return {
    before: async (request) => {
      console.info(`Opening DB connection`);

      const connectionName = 'default';
      const database = new Database();
      const connection: Connection = await database.getConnection(connectionName);

      request.context.connection = connection
      console.info(`Done opening DB connection`);
    },
    after: closeDb,
    onError: closeDb,
  };
};