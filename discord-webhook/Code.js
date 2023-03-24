/**
 * @see {@link https://discord.com/developers/docs/resources/webhook#execute-webhook Execute Webhook}
 */
function send() {
  const webhook = {
    id: 'WEBHOOK_ID',
    token: 'WEBHOOK_TOKEN',
  }
  const discord_webhook = `https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`;

  const options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
    },
    "payload": JSON.stringify({
      "content": `
⏰ 한 주를 돌아볼 회고 시간입니다!
📣 모두 음성 채널로 모여주세요!
오늘 회고의 시작은 🌸${random_member()}🌸 님이 하실 거에요❗️
참석 여부를 ✅/❌로 알려주세요🤓
`
    })
  }

  UrlFetchApp.fetch(discord_webhook, options);
}

function random_member() {
  const members = [
    "성규",
    "정원",
    "정혜",
    "창수",
  ];
  return members[Math.floor(Math.random() * members.length)];
}
