export function setInfoToLocalStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getInfoFromLocalStorage(key: string): any {
  const info = localStorage.getItem(key);
  return info ? JSON.parse(info) : "";
}

export function removeInfoFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
