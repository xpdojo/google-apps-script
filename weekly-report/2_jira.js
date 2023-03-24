/**
 * Jira Issue 목록을 조회해서 리턴한다.
 * 
 * @see {@link https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search Issue search}
 * @param {string} basicAuth Basic Auth 토큰
 */
async function listJiraIssues(atlassianURL, basicAuth, status) {
  // const allFields = ["*all"];
  const minimumFields = [
    "summary",
    "status",
    "assignee",
    "issuetype"
  ];

  const joinedStatus = "'" + status.join("', '") + "'";

  const requestBody = {
    "fields": minimumFields,
    "fieldsByKeys": false,
    "jql": `
      status in (${joinedStatus})
      AND statusCategoryChangedDate >= -7d
      AND assignee in (currentuser())
      order by created DESC
    `, 
    "maxResults": 20,
    "startAt": 0
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Basic ${basicAuth}`
    },
    payload: JSON.stringify(requestBody),
    redirect: 'follow'
  };

  let res = await UrlFetchApp.fetch(atlassianURL, requestOptions)
  let body = await res.getContentText();
  let jsonData = JSON.parse(body);
  return jsonData.issues;
}
