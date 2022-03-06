import AsyncStorage from "@react-native-async-storage/async-storage";

export function CleanAsyncStorage() {
  AsyncStorage.getAllKeys().then((keys) => {
    AsyncStorage.multiRemove(keys);
  });

  return null;
}
