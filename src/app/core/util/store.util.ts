/**
 * Created by jacob1182 on 1/12/17.
 */

export class StoreUtil {
  static stringFromStore(key: string): string {
    return localStorage.getItem(key);
  }

  static stringToStore(key: string, value: string): string {
    localStorage.setItem(key, value);
    return value;
  }

  static objectFromStore(key: string): any {
    return JSON.parse(StoreUtil.stringFromStore(key));
  }

  static objectToStore(key: string, object: any): any {
    StoreUtil.stringToStore(key, JSON.stringify(object));

    return object;
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
