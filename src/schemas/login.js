import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().min(1, {message: "E-mail é obrigatório"}).email({message: "Digite um e-mail válido (ex: usuario@dominio.com)"}),
    senha: z.string().min(1, {message: "Credenciais inválidas"})
})