type ValidationOrDefaultValue<T> = Schema<T> | T

export default function getenv<T>(envName: string, joiValidation: ValidationOrDefaultValue, defaults?: T): T;
