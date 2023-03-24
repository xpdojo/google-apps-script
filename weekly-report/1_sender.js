/**
 * Jira에서 최근 7일간 상태 변경된 이슈들을 조회해서 주간업무보고를 보낸다.
 * 모두가 일관된 목록을 조회하기 위해 JQL은 인자로 받지 않는다.
 * 
 * @param {string} sender 보내는 사람이자 Atlassian 계정 이메일 주소
 * @param {string} receiver 받는 사람 이메일 주소
 * @param {string} atlassianURL Atlassian URL
 * @param {string} apiToken Atlassian API Token
 */
async function send(sender, receiver, atlassianURL, apiToken) {
  const basicAuth = Utilities.base64Encode(`${sender}:${apiToken}`);

  const resolvedStatus = [
    '해결됨',
    'Resolved',
    'Done',
    'In Review',
    '배포대기',
  ]
  const plannedStatus = [
    'Selected for Development',
    'In Progress',
    'DOING',
  ]
  const status = resolvedStatus.concat(plannedStatus);
  const issues = await listJiraIssues(`${atlassianURL}/rest/api/3/search`, basicAuth, status);
  const htmlBody = await contents(issues, atlassianURL, resolvedStatus, plannedStatus);
  await sendmail(receiver, htmlBody);
}
