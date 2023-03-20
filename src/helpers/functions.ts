export const Capitalize = (str: string): string => `${str[0].toUpperCase()}${str.slice(1)}`;
export const ApplySup = (str: string): string => str.replaceAll("{", "<sup className='exposant'>").replaceAll("}", "</sup>");
export const SanitizeFilename = (path : string): string => path.slice(3).replaceAll('_', ' ')