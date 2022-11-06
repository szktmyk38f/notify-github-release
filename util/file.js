import fs from "fs";

const file = "./NOTIFICATION_TARGET";

export default {
  /**
   *
   * @param {*} url Repository URL to be notified
   * @param {*} version Latest version value retrieved from the entered URL
   */
  addNotificationTarget(url, version) {
    try {
      fs.appendFileSync(file, `${url} ${version}\n`, "utf8");
    } catch (err) {
      console.log(err);
    }
  },
  readFileCharacter() {
    try {
      return fs.readFileSync(file, "utf8");
    } catch (err) {}
  },
  createFile() {
    try {
      fs.writeFileSync(file, "");
    } catch (err) {
      console.log(err);
    }
  },
  deleteFile() {
    try {
      fs.unlinkSync(file);
    } catch (err) {
      console.log(err);
    }
  },
};
