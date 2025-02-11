export const useLocalStorage = (lsKey: string) => {
  const fetchLocalStorageData = (): Promise<string | null> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(localStorage.getItem(lsKey));
      }, 500);
    });
  };

  const saveDataToLocalStorage = <T>(data: T): void => {
    localStorage.setItem(lsKey, JSON.stringify(data));
  }

  return { fetchLocalStorageData, saveDataToLocalStorage };
}