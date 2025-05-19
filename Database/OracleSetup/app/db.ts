import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

// For oracledb 6.x, thin mode is enabled by default
// No need to explicitly set it

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTSTRING,
};

let pool: oracledb.Pool | null = null;

export async function initialize() {
  try {
    // Avoid creating multiple pools
    if (pool) {
      console.log('Pool already exists');
      return;
    }
    
    // Create a connection pool
    pool = await oracledb.createPool({
      ...dbConfig,
      poolIncrement: 1,
      poolMax: 4,
      poolMin: 0
    });
    console.log('Connection pool started');
  } catch (err: any) {
    console.error('init() error: ' + err.message);
    throw err;
  }
}

// Close connection pool
export async function close() {
  try {
    if (pool) {
      await pool.close(0); // Immediate close
      console.log('Pool closed');
    }
  } catch (err: any) {
    console.error('close() error: ' + err.message);
    throw err;
  }
}

// Execute SQL query
export async function execute(sql: string, binds: any[] = [], opts: Record<string, any> = {}) {
  let connection;
  
  if (!pool) {
    throw new Error('Database pool not initialized. Call initialize() first.');
  }
  
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();
    
    // Set defaults if not specified
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: true,
      ...opts
    };
    
    // Execute the query
    const result = await connection.execute(sql, binds, options);
    return result;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        // Release the connection back to the pool
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}