import Keyv from "keyv";
import { Doc } from "../models/doc";

const docs = new Keyv("redis://localhost:6379", { namespace: "docs" });

export const DbFactory = {
  async saveDoc(doc: Doc): Promise<Doc> {
    let document = await docs.get(doc.username);
    if (document) {
      const newContent = JSON.parse(document).content.concat(doc.content);
      await docs.set(
        doc.username,
        JSON.stringify({ username: doc.username, content: newContent })
      );
    } else {
      await docs.set(
        doc.username,
        JSON.stringify({ username: doc.username, content: doc.content })
      );
    }
    return doc;
  },

  async getAllDoc(username: string): Promise<Doc> {
    return JSON.parse(await docs.get(username));
  },
};
