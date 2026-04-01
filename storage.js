// Drop-in replacement for Claude's window.storage API using localStorage
// Same async interface so the app code stays identical

const storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(`rolodex:${key}`);
      if (value === null) throw new Error('Key not found');
      return { key, value };
    } catch (e) {
      throw e;
    }
  },

  async set(key, value) {
    try {
      localStorage.setItem(`rolodex:${key}`, value);
      return { key, value };
    } catch (e) {
      console.error('Storage set error:', e);
      return null;
    }
  },

  async delete(key) {
    try {
      localStorage.removeItem(`rolodex:${key}`);
      return { key, deleted: true };
    } catch (e) {
      return null;
    }
  },

  async list(prefix = '') {
    const keys = [];
    const fullPrefix = `rolodex:${prefix}`;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith(fullPrefix)) {
        keys.push(k.replace('rolodex:', ''));
      }
    }
    return { keys, prefix };
  },
};

export default storage;
