# Weekly Report

## clone

```sh
mkdir weekly-report
```

```sh
clasp clone --rootDir weekly-report 1bhEa2NedQP_LD70HVA8EkHrog5f3OCsp9PpCmTobvGgRJu9uetqaSe30
```

## update

```sh
clasp pull
```

## import

```javascript
/**
 * sender: Current Gmail address
 * jiraUrl: Atlassian
 * apiToken: {@link https://id.atlassian.com/manage-profile/security/api-tokens Manage account > Security > API Tokens}
 */
const config = {
  sender: 'EMAIL',
  atlassianURL: 'https://example.atlassian.net',
  apiToken: 'API_TOKEN',
}

async function sendToMe() {
  const receiver = config.sender;
  await AutowiniWeeklyReport.send(
    config.sender,
    receiver,
    config.atlassianURL,
    config.apiToken,
  );
}

async function sendToAll() {
  const receiver = 'all@example.com';
  await AutowiniWeeklyReport.send(
    config.sender,
    receiver,
    config.atlassianURL,
    config.apiToken,
  );
}
```
