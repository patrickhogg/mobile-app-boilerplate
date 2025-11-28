import { Preferences } from '@capacitor/preferences';

export const PreferenceService = {
  async set(key, value) {
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  },

  async get(key) {
    const { value } = await Preferences.get({ key });
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },

  async remove(key) {
    await Preferences.remove({ key });
  }
};
