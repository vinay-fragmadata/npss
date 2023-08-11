/**
 * @description LocalStorage services
 */
export default class LocalStorageService {
  /**
   * @description To get Values from LocalStorage
   * @param key
   * @returns
   */
  static getData(key: string) {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  /**
   * @description Setting data in localStorage
   * @param key
   * @param data
   */
  static setData(key: string, data: object | string | boolean | [] | number) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * @description Delete data from LocalStorage
   * @param key
   */
  static removeData(key: string) {
    LocalStorageService.setData(key, "");
    localStorage.removeItem(key);
  }

  /**
   * @description Delete all data from localStorage
   */
  static removeAllData() {
    localStorage.clear();
  }
}
