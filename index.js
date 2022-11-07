import * as commander from "./util/cli.js";
import file from "./util/file.js";
import fetch from "node-fetch";
import jsdom from "jsdom";
import Table from "cli-table3";
const { JSDOM } = jsdom;

(async () => {
  const targetClass =
    "span.css - truncate.css - truncate - target.text - bold.mr - 2";

  let table = new Table({
    head: ["URL", "Latest version", "Local version", "Condition"],
  });

  const fileCharacters = file.readFileCharacter();
  if (fileCharacters == undefined) {
    console.log(
      "The NOTIFICATION_TARGET file does not exist.Please add it with the -a option."
    );
    console.log(
      "Check https://github.com/szktmyk38f/notify-github-release for details."
    );
    process.exit(0);
  }
  const perLineArray = fileCharacters.split("\n");

  for (const perLine of perLineArray) {
    const temp = perLine.split(" ");
    const url = temp[0];
    const localVersion = temp[1];

    if (url == "" || localVersion == undefined) break;

    const res = await fetch(url);
    const body = await res.text();
    const dom = new JSDOM(body);
    const latestVersion =
      dom.window.document.querySelector(targetClass).textContent;

    if (latestVersion == localVersion) {
      table.push([url, latestVersion, localVersion, "No change"]);
    } else if (latestVersion > localVersion) {
      table.push([
        url,
        latestVersion,
        localVersion,
        "\x1b[36mNew version has been released!\x1b[0m",
      ]);
    }
  }
  console.log(table.toString());
})();
