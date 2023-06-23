source $(dirname "$0")/publish-utils.sh

echo "--- Checking for Github access token ---"
checkGithubAccessToken

echo "--- Executing post-publish script ---"
updateEnforceAdminBranchProtection master true
echo "--- Finished executing post-publish script ---"
