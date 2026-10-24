import { pool } from "../../../database/connection.js";
import { User } from "../types/user.types.js";

export class UserRepository { 
  async create(name: string, email: string, password: string, role: "provider" | "client"): Promise<User> {
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, password, role]
    );
    return result.rows[0] as User;
  }
}
