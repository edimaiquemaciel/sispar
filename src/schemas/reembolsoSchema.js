import { z } from "zod";

export const reembolsoSchema = z.object({
    colaborador: z.string({ required_error: "Campo obrigatório" }).nonempty("Campo obrigatório"),
    empresa: z.string({ required_error: "Campo obrigatório" }).nonempty("Campo obrigatório"),
    num_prestacao: z.preprocess(
      (val) => {
        if (val === "" || val === undefined || val === null) return undefined;
        const coerced = Number(val);
        return isNaN(coerced) ? undefined : coerced;
      },
      z
      .number({ invalid_type_error: "Campo obrigatório", required_error: "Campo obrigatório" })
      .min(0.1, { message: "Campo obrigatório" })
    ),      
    tipo_reembolso: z.string({ required_error: "Campo obrigatório" }).nonempty("Campo obrigatório"),
    centro_custo: z.string({ required_error: "Campo obrigatório" }).nonempty("Campo obrigatório"),
    moeda: z.string({ required_error: "Campo obrigatório" }).nonempty("Campo obrigatório"),
    valor_faturado: z.preprocess(
      (val) => {
        if (val === "" || val === undefined || val === null) return undefined;
        const coerced = Number(val);
        return isNaN(coerced) ? undefined : coerced;
      },
      z
      .number({ invalid_type_error: "Campo obrigatório", required_error: "Campo obrigatório" })
      .min(0.1, { message: "Campo obrigatório" })
    ),
    despesa: z.preprocess(
      (val) => {
        if (val === "" || val === undefined || val === null) return undefined;
        const coerced = Number(val);
        return isNaN(coerced) ? undefined : coerced;
      },
      z
      .number({ invalid_type_error: "Campo obrigatório", required_error: "Campo obrigatório" })
      .min(0.1, { message: "Campo obrigatório" })
    ),
})