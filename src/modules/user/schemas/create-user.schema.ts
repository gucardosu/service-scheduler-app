import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(1, { error: 'O nome é obrigatório' }),
    email: z.email({ error: "Por favor, informe um email válido" }),
    password: z.string().min(6, { error: 'A senha deve ter no mínimo 6 caracteres' }),
    role: z.enum(["provider", "client"], { error: "O papel do usuário deve ser 'provider' ou 'client'" })
});