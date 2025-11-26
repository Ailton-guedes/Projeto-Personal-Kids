import { appError } from './appError';

const errorMap = {

    //user 404
    "not_found:user": () => new appError("User not found", 404),

    //user 409
    "duplicate:user-cpf_cnpj": () => new appError("cpf_cnpj already registered", 409),
    "duplicate:user-email": () => new appError("email already registered", 409),



    //generic
    "missing_fields": (field?: string) => new appError(field ? `Missing required field: ${field}` : "Missing required field", 400),
}

export function throwError<K extends keyof typeof errorMap>(
    code: K,
    arg?: Parameters<typeof errorMap[K]>[0]
): never {
    const error = errorMap[code]
    throw error(arg);
}