const inquirer = require(`inquirer`);

const files = require(`../lib/files`);

module.exports = {
  askGitHubCredentials: () => {
    const questions = [
      {
        name: `username`,
        type: `input`,
        message: `Enter your GitHub username or e-mail address:`,
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return `Please enter your username or e-mail address.`
          }
        }
      },
      {
        name: `password`,
        type: `password`,
        message: `Enter your password:`,
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return `Please enter your password.`
          }
        }
      },
    ];
    return inquirer.prompt(questions);
  },
  getTwoFactorAuthenticationCode: () => {
    return inquirer.prompt({
      name: `twoFactorAuthenticationCode`,
      type: `input`,
      message: `Enter your two-factor authentication code:`,
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return `Please enter your two-factor authentication code.`
        }
      }
    });
  },
  askRepoDetails: () => {
    const argv = require(`minimist`)(process.argv.slice(2));

    const questions = [
      {
        name: `name`,
        type: `input`,
        message: `Enter name for repository:`,
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return `Please enter a name for the repository.`
          }
        }
      },
      {
        name: `description`,
        type: `input`,
        message: `Optionally enter a description of the repository:`,
        default: argv._[1] || null,
      },
      {
        name: `visibility`,
        type: `list`,
        message: `Public or private:`,
        choices: [`public`, `private`],
        default: `public`,
      },
    ];
    return inquirer.prompt(questions);
  },
  askIgnoreFiles: (filelist) => {
    const questions = [
      {
        name: `ignore`,
        type: `checkbox`,
        message: `Select the files and/or folders you wish to ignore:`,
        choices: filelist,
        default: ['node_modules'],
      }
    ];
    return inquirer.prompt(questions);
  },
  askReadmeText: () => {
    const questions = [
      {
        name: `readme`,
        type: `input`,
        message: `Optionally write a readme:`,
        default: `New repository.`
      }
    ];
    return inquirer.prompt(questions);
  }
};
