import { Request, Response } from "express";
import { z } from "zod";
import { UserService } from "../services/user.service.js";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error.js";
import { createUserSchema } from "../schemas/create-user.schema.js";

export class UserController {
  constructor(private service: UserService) {}

  async createUser(req: Request, res: Response) {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ errors: z.flattenError(result.error).fieldErrors });
    }

    const { name, email, password, role } = result.data;

    try {
      const user = await this.service.createUser(name, email, password, role);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }
}
