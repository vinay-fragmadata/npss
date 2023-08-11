class SessionStorageService {
  static getData(key: string) {
    const data = sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }
  static setData(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
  static removeData(key: string) {
    sessionStorage.removeItem(key);
  }
  static removeAllData() {
    sessionStorage.clear();
  }
}
export default SessionStorageService;
