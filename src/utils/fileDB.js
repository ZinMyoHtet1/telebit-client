// src/utils/fileDB.js
export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("UploadFilesDB", 6);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      let store;
      if (!db.objectStoreNames.contains("files")) {
        store = db.createObjectStore("files", {
          keyPath: "id",
          autoIncrement: true,
        });
      } else {
        store = e.target.transaction.objectStore("files");
      }
      if (!store.indexNames.contains("key")) {
        store.createIndex("key", "key", { unique: false });
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

export const saveFiles = async (key, values) => {
  const db = await openDB();
  const tx = db.transaction("files", "readwrite");
  const store = tx.objectStore("files");

  store.clear(); // clear old files

  values.forEach(({ parentId, file }) => {
    store.add({
      key,
      parentId,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      blob: file, // Store actual File object as blob
    });
  });

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = (e) => reject(e.target.error);
  });
};

export const getFiles = async (key) => {
  const db = await openDB();
  const tx = db.transaction("files", "readonly");
  const store = tx.objectStore("files");
  const index = store.index("key");

  return new Promise((resolve, reject) => {
    const request = index.getAll(IDBKeyRange.only(key));
    request.onsuccess = () => {
      resolve(
        request.result.map((f) => ({
          parentId: f.parentId,
          file: new File([f.blob], f.name, {
            type: f.type,
            lastModified: f.lastModified,
          }),
        }))
      );
    };
    request.onerror = (e) => reject(e.target.error);
  });
};

export const clearFiles = async () => {
  const db = await openDB();
  const tx = db.transaction("files", "readwrite");
  tx.objectStore("files").clear();

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = (e) => reject(e.target.error);
  });
};

export const deleteFiles = async (key) => {
  const db = await openDB();
  const tx = db.transaction("files", "readwrite");
  const store = tx.objectStore("files");
  const index = store.index("key");

  return new Promise((resolve, reject) => {
    const request = index.openCursor(IDBKeyRange.only(key));
    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        store.delete(cursor.primaryKey);
        cursor.continue();
      }
    };
    tx.oncomplete = () => resolve(true);
    tx.onerror = (e) => reject(e.target.error);
  });
};

export const resetDB = () => {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase("UploadFilesDB");
    deleteRequest.onsuccess = () => resolve(true);
    deleteRequest.onerror = (e) => reject(e.target.error);
  });
};
