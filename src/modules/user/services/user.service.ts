import bcrypt from "bcrypt";
import { UserRepository } from "../repository/user.repository.js";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error.js";
import { USERS_EMAIL_UNIQUE_CONSTRAINT } from "../constants/user-constraints.js";

export class UserService {
  constructor(private repository: UserRepository) {}
  async createUser(
    name: string,
    email: string,
    password: string,
    role: "provider" | "client",
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.repository.create(name, email, hashedPassword, role);
      return user;
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        "constraint" in error
      ) {
        if (error.code === "23505" && error.constraint === USERS_EMAIL_UNIQUE_CONSTRAINT) {
          throw new EmailAlreadyExistsError();
        }
      }
      throw error;
    }
  }
}
