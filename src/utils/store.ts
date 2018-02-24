class LocalStorage {

    public static read<T>(key: string) {
        let str = localStorage.getItem(key);
        if (str !== null) {
            return JSON.parse(str) as T;
        }
        return null;
    }

    public static save(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export default LocalStorage;
