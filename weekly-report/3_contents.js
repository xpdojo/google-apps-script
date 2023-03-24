/**
 * 메일 내용을 HTML 형식의 문자열로 만들어서 리턴한다.
 *
 * @param {any[]} issues Jira 이슈 목록
 */
async function contents(issues, atlassianURL, resolvedStatus, plannedStatus) {
  let resolved = issues.filter(issue => {
    return resolvedStatus.includes(issue.fields.status.name);
  });

  let planneed = issues.filter(issue => {
    return plannedStatus.includes(issue.fields.status.name);
  });

  return template(getOwnName(), atlassianURL, resolved, planneed);
}

/**
 * 메일 템플릿을 리턴한다.
 */
function template(name, atlassianURL, resolved, planneed) {
  return `
<header>
  <p>
    안녕하세요.<br>
    개발팀 ${name}입니다.<br>
    업무보고 드립니다.
  </p>
</header>

<section>
  ${table('금주 업무', resolved, atlassianURL)}
</section>

<section>
  ${table('차주 계획', planneed, atlassianURL)}
</section>

<br>
<footer>
  감사합니다.
</footer>
  `
}

function isOdd(number) {
  return number % 2 !== 0;
}

/**
 * Jira issue 목록을 Table 스타일된 HTML 문자열로 만들고 리턴한다.
 * @param {any[]} issues Jira 이슈 목록
 * @return Jira 이슈 HTML Table
 */
function table(caption, issues, atlassianURL) {
  const brandingColor = '#76d376a3';
  let row =
    issues.map((issue, index) => {
      let background = isOdd(index) ? brandingColor : '#fff';
      return `
        <tr style='background-color: ${background}; height: 30px;'>
          <td style='word-wrap: break-word; padding: 10px;'>${issue.fields.issuetype.name}</td>
          <td style='word-wrap: break-word; padding: 10px;'><a href='${atlassianURL}/browse/${issue.key}'>${issue.key}</a></td>
          <td style='word-wrap: break-word; padding: 10px;'>${issue.fields.summary}</td>
          <td style='word-wrap: break-word; padding: 10px;'>${issue.fields.status.name}</td>
        </tr>
      `}
    ).join('');

  return `
    <table style='border-collapse: collapse; width: 700px;'>
      <caption>
        <h3>${caption}</h3>
      </caption>
      <thead style='border-bottom: 2px solid black; height: 30px; background-color: #333333; color: #fff;'>
        <tr>
          <th>Type</th>
          <th>Issue</th>
          <th>Summary</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${row}
      </tbody>
    </div>
  `;
}
