source $(dirname "$0")/publish-utils.sh

echo "--- Checking for Github access token ---"
checkGithubAccessToken

echo "--- Executing pre-publish script ---"
updateEnforceAdminBranchProtection master false
echo "--- Finished executing pre-publish script ---"
