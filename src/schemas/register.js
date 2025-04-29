import {z} from "zod"

export const registerSchema = z.object({
    name: z.string().min(1, {message: "O campo nome precisa ser preenchido"}),
    email: z.string().min(1, {message: "O campo email precisa ser preenchido"}).email({message: "E-mail inválido"}),
    password: z.string().min(8, {message: "A senha deve ter no mínimo 8 caracteres"}),
    password_confirmation: z.string().min(8, {message: "A senha deve ter no mínimo 8 caracteres"}),
    phone: z.string().min(1, {message: "O campo telefone precisa ser preenchido"}).regex(/^\(\d{2}\) \d{5}-\d{4}$/, {message: "Telefone inválido"}),
    cep: z.string().min(1, {message: "O campo CEP precisa ser preenchido"}).regex(/^[0-9]{5}(-[0-9]{3})?$/,{message: "CEP inválido"}),
    address: z.string().min(1, {message: "O campo Endereço precisa ser preenchido"}),
    city: z.string().min(1, {message: "O campo Cidade precisa ser preenchido"}),
    terms: z.literal(true, {errorMap: () => ({message: "Você precisa aceitar os termos de uso"}) }),
}).refine((data) =>  {
    return data.password === data.password_confirmation;
}, {
    message: "As senhas devem coincidir",
    path: ["password_confirmation"],
}
)