import fs from "fs";

const userHome =
  process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
const filePath = `${userHome}/\\NOTIFICATION_TARGET`;

export default {
  /**
   *
   * @param {*} url Repository URL to be notified
   * @param {*} version Latest version value retrieved from the entered URL
   */
  addNotificationTarget(url, version) {
    try {
      fs.appendFileSync(filePath, `${url} ${version}\n`, "utf8");
    } catch (err) {
      console.log(err);
    }
  },
  readFileCharacter() {
    try {
      return fs.readFileSync(filePath, "utf8");
    } catch (err) {}
  },
  createFile() {
    try {
      fs.writeFileSync(filePath, "");
    } catch (err) {
      console.log(err);
    }
  },
  deleteFile() {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log(err);
    }
  },
};
