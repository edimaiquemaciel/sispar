import {z} from "zod"

export const registerSchema = z.object({
    nome: z.string().min(1, {message: "O campo nome precisa ser preenchido"}),
    email: z.string().min(1, {message: "O campo email precisa ser preenchido"}).email({message: "E-mail inválido"}),
    cargo: z.string().min(1, {message: "O campo cargo precisa ser preenchido"}),
    salario: z.number({ invalid_type_error: "Informe um número válido" }).min(0.01, { message: "O salário deve ser maior que zero" }),
    senha: z.string().min(1, {message: "O campo senha é obrigatório"}).min(8, {message: "A senha deve ter no mínimo 8 caracteres"}),
    confirmacao_senha: z.string().min(1 ,{message: "O campo confirmar senha é obrigatório"}).min(8, {message: "A senha deve ter no mínimo 8 caracteres"}),
    telefone: z.string().min(1, {message: "O campo telefone precisa ser preenchido"}).regex(/^\(\d{2}\) \d{5}-\d{4}$/, {message: "Telefone inválido"}),
    cep: z.string().min(1, {message: "O campo CEP precisa ser preenchido"}).regex(/^[0-9]{5}(-[0-9]{3})?$/,{message: "CEP inválido"}),
    endereco: z.string().min(1, {message: "O campo Endereço precisa ser preenchido"}),
    cidade: z.string().min(1, {message: "O campo Cidade precisa ser preenchido"}),
    terms: z.literal(true, {errorMap: () => ({message: "Você precisa aceitar os termos de uso"}) }),
}).refine((data) =>  {
    return data.senha === data.confirmacao_senha;
}, {
    message: "As senhas devem coincidir",
    path: ["confirmacao_senha"],
}
)