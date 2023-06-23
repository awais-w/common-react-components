const gitBranchIs = require('git-branch-is'); /* eslint-disable-line */
const emoji = require('node-emoji'); /* eslint-disable-line */
require('colors'); /* eslint-disable-line */

module.exports = (branch = 'master') => {
  gitBranchIs(branch).then(
    (result) => {
      if (result) {
        console.log(
          `\nCONFIRMED you're on the ${branch.toUpperCase()} branch, will continue with your publishing.\n`.green,
        );
      } else {
        console.error(
          `\n-----------------------------------------\n ${emoji.get(
            ':x:',
          )}    To publish Argos-Components, please ensure you are on the ${branch.toUpperCase()} branch and up to date\n-----------------------------------------\n`
            .red,
        );
        return false;
      }
      return true;
    },
    (err) => {
      console.error(err);
      return false;
    },
  );
};
