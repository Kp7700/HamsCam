export function createAssetManager() {
  const attachments = new Map();

  return {
    add(id, attachment) {
      if (attachments.has(id)) {
        throw new Error(
          `Asset attachment already exists: ${id}`,
        );
      }

      attachments.set(id, attachment);
    },

    remove(id) {
      attachments.delete(id);
    },

    get(id) {
      return attachments.get(id) ?? null;
    },

    getAll() {
      return [...attachments.values()];
    },

    clear() {
      attachments.clear();
    },
  };
}
