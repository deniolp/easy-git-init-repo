const chalk = require(`chalk`);
const clear = require(`clear`);
const figlet = require(`figlet`);

const files = require(`./lib/files`);
const github = require(`./lib/github`);
const repo = require(`./lib/repo`);

clear();

console.log(chalk.yellow(
  figlet.textSync(`Ginit`, {horizontalLayout: `full`})
));
console.log(chalk.grey(`Current directory: ${files.getCurrentDirectoryBase()}`));

if (files.directoryExists(`.git`)) {
  console.log(chalk.red(`Already a Git repository!`));
  process.exit();
}

const getGitHubToken = async () => {
  let token = github.getStoredGitHubToken();
  if (token) {
    return token;
  }
  token = await github.getPersonalAccessToken();
  return token;
}

const run = async () => {
  try {
    const token = await getGitHubToken();
    github.gitHubAuth(token);

    const url = await repo.createRemoteRepo();

    await repo.createGitIgnore();
    await repo.setupRepo(url);
    console.log(chalk.green(`All done!`));
  } catch (error) {
    if (error) {
      switch (error.status) {
        case 401:
          console.log(chalk.red(`Couldn\'t log you in. Please provide correct credentials/token.`));
          break;

        case 422:
          console.log(chalk.red(`There is already a remote repository or token with the same name`));
      
        default:
          console.log(chalk.red(error));
      }
    }
  }
};

run();
