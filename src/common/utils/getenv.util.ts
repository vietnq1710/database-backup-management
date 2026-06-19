export function getEnv(key: string, defaultValue?: any): string {
  const value = process.env[key];
  if (value === undefined || value === null || value === '') {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Missing env variable: ${key}`);
  }
  return value;
}
