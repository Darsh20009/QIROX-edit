import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function connectPostgres() {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL");
    client.release();
    return true;
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
    return false;
  }
}

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    // Create admin_users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create admin_products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        price DECIMAL(10, 2),
        stock INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create admin_orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255),
        total DECIMAL(10, 2),
        status VARCHAR(50),
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create admin_subscriptions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_subscriptions (
        id SERIAL PRIMARY KEY,
        subscription_number VARCHAR(50) UNIQUE NOT NULL,
        user_id INT,
        plan VARCHAR(100),
        billing_cycle VARCHAR(50),
        price DECIMAL(10, 2),
        status VARCHAR(50),
        end_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create admin_stores table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_stores (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        owner VARCHAR(255),
        sales DECIMAL(10, 2) DEFAULT 0,
        products_count INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
  } finally {
    client.release();
  }
}

export function getPool() {
  return pool;
}
