export function getShortName(name: string): string {
    const names = name.split(' ');
    return names.length > 1
      ? names.slice(0, 2).map(part => part[0]?.toUpperCase() || '').join('')
      : name[0]?.toUpperCase() || '';
  }
  