export function validadeRequiredFields(
    fields: Record<string, any>,
    requiredFields: string[]
): string | null {
    for (const field of requiredFields) {
        if (!fields[field] || (typeof fields[field] === 'string' && fields[field].trim() === '')) {
            return field;
        }
    }
    return null;
}