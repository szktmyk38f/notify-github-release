import { Command } from "commander";
const program = new Command();
import fetch from "node-fetch";
import jsdom from "jsdom";
import file from "./util/file.js";
import prompts from "prompts";
import Table from "cli-table3";
const { JSDOM } = jsdom;

program
  .version("0.0.1")
  .option(
    "-a, --add <url>",
    "Add notification target ex: https://github.com/<username>/<repository>",
    null
  )
  .option("-l, --list", "List the target URLs.")
  .option("-d, --del", "Delete the target URL.")
  .parse(process.argv);

const options = program.opts();
if (options.add) {
  // Check if the URL is already registered
  if (file.readFileCharacter() == undefined) {
    file.createFile();
  }
  if (~file.readFileCharacter().indexOf(options.add)) {
    console.log("The URL you entered has already been registered.");
    process.exit(0);
  }

  const targetClass =
    "span.css - truncate.css - truncate - target.text - bold.mr - 2";
  const res = await fetch(options.add);
  const body = await res.text();
  const dom = new JSDOM(body);
  const element = dom.window.document.querySelector(targetClass);
  if (element == null) {
    console.log(
      "The URL entered does not exist or does not have a release item."
    );
    process.exit(0);
  }
  const releaseVersion = element.textContent;
  file.addNotificationTarget(options.add, releaseVersion);
  process.exit(0);
}

if (options.list) {
  let table = new Table({ head: ["URL", "Version"] });

  const fileCharacters = file.readFileCharacter();
  const perLineArray = fileCharacters.split("\n");

  for (const perLine of perLineArray) {
    const temp = perLine.split(" ");
    const url = temp[0];
    const localVersion = temp[1];
    if (!(url == "" || localVersion == undefined))
      table.push([url, localVersion]);
  }

  console.log(table.toString());
  process.exit(0);
}

if (options.del) {
  let table = new Table({ head: ["#", "URL", "Version"] });
  let index = 1;

  const fileCharacters = file.readFileCharacter();
  const perLineArray = fileCharacters.split("\n");

  for (const perLine of perLineArray) {
    const temp = perLine.split(" ");
    const url = temp[0];
    const localVersion = temp[1];
    if (!(url == "" || localVersion == undefined))
      table.push([index++, url, localVersion]);
  }

  console.log(table.toString());

  (async () => {
    let deleteNo;
    const response = await prompts({
      type: "number",
      name: "value",
      message: "Which URLs do you want to delete? Please specify with #.",
      validate: (value) => (value > 0 ? (deleteNo = value) : false),
    });

    if (response) {
      const fileCharacters = file.readFileCharacter();
      const perLineArray = fileCharacters.split("\n");
      file.deleteFile();
      file.createFile();
      let index = 1;
      for (const perLine of perLineArray) {
        const temp = perLine.split(" ");
        const url = temp[0];
        const localVersion = temp[1];
        if (deleteNo == index++) {
          continue;
        }
        if (!(url == "" || localVersion == undefined)) {
          file.addNotificationTarget(url, localVersion);
        }
      }
    }
  })();
  // process.exit(0);
}
