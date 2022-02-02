import "reflect-metadata";
import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm';
import { Post, Product, Theme, Order, GalleryImage } from "../model";

export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(name: string): Promise<Connection> {
    const CONNECTION_NAME: string = name;
    let connection: Connection;
    const hasConnection = this.connectionManager.has(CONNECTION_NAME);

    const database = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
    };

    if (hasConnection) {
      connection = this.connectionManager.get(CONNECTION_NAME);
      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      const connectionOptions: ConnectionOptions = {
        name: 'default',
        type: "postgres",
        host: database.host,
        port: 5432,
        username: database.user,
        password: database.password,
        database: database.database,
        entities: [
          Post,
          Product,
          Theme,
          Order,
          GalleryImage,
        ],
        synchronize: false,
        logging: false,
      };
      connection = await createConnection(connectionOptions);
    }
    return connection;
  }
}
