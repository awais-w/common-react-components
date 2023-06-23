RED='\033[0;31m'
GREEN='\033[0;32m'
GITHUB_ACCESS_TOKEN=${GITHUB_ACCESS_TOKEN:-GITHUB_ACCESS_TOKEN}

function checkGithubAccessToken {
  callCount=${1:-0} #recursive call count is the first argument, default to 0.

  if [ $callCount -eq 0 -a "$GITHUB_ACCESS_TOKEN" == "GITHUB_ACCESS_TOKEN" ]
  then
    echo "Looks like you haven't configured your github token! Either set GITHUB_ACCESS_TOKEN in the env or enter it now:"
    echo "  To get a token go to https://github.com/settings/tokens/new and select repo and admin:repo_hook"
    read -s GITHUB_ACCESS_TOKEN
  elif [ $callCount -gt 0 ]
  then
    echo -e "${RED}No token received${CLEAR}, enter one now or press Ctrl-C to quit."
    GITHUB_ACCESS_TOKEN="GITHUB_ACCESS_TOKEN"
    read -s GITHUB_ACCESS_TOKEN
  fi

  if [ "$GITHUB_ACCESS_TOKEN" == "GITHUB_ACCESS_TOKEN" -o "$GITHUB_ACCESS_TOKEN" == "" ]
  then
    #They pressed enter without entering anything (or mis-pasting?)
    checkGithubAccessToken $(( $callCount + 1))
  #TODO
  #elif ! checkTokenAgainstApi
  #then
  #  checkGithubAccessToken $(( $callCount + 1))
  #  return
  else
    #This looks OK
    return 0
  fi
}

function updateEnforceAdminBranchProtection {
  # Usage: updateEnforceAdminBranchProtection <branch-name> <enforce_admins (boolean)>
  branchName=$1
  enforceAdmins=$2

  if [ "$branchName" == "master" ]
  then
    PAYLOAD_DATA='{
        "restrictions": {
          "users":[],
          "teams":[]
        },
        "enforce_admins": '$enforceAdmins',
        "required_pull_request_reviews": {
          "required_approving_review_count": 1,
          "dismiss_stale_reviews": true
        },
        "required_status_checks": null
    }'
  else
    echo "Invalid branch given to updateEnforceAdminBranchProtection - should only be master"
    return 1
  fi

  curlGithub "Modifying branch protections for branch $branchName in cmc-common-react-components repo to have enforce_admin $enforceAdmins" "PUT" "repos/sainsburys-tech/cmc-common-react-components/branches/$branchName/protection" 200 \
    -H 'Accept: application/vnd.github.luke-cage-preview+json' \
    -d "$PAYLOAD_DATA"

}

curlGithub() {
  actionDescription=$1
  method=$2
  path=$3
  expectedCode=$4
  shift 4

  tempFile=`mktemp`
  if [ $? -ne 0 ]; then
    echo -e "${RED}Can't create temp file,${CLEAR} exiting..."
    exit 1
  fi

  status_code=$(curl -X $method \
    "$@" \
    -o ${tempFile} -s -w "%{http_code}\n" \
    -H "Authorization: Token $GITHUB_ACCESS_TOKEN" \
    "https://api.github.com/$path"
  )

  curlGithub_lastBody=$(cat $tempFile)
  rm $tempFile

  #check if statusCode is in the expectedCode list.
  if [[ ! "${expectedCode}" =~ "$status_code" ]]
  then
    echo -e "${RED}FAIL: Failed at $actionDescription.${CLEAR} Received status code: $status_code and body: ${curlGithub_lastBody}"
    return 1
  else
    echo -e "${GREEN}SUCCESS: Successful at $actionDescription.${CLEAR} Received status code: $status_code"
    return 0
  fi
}
