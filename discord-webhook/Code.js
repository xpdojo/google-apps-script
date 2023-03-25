/**
 *  #test-webhook 채널에 보내기
 */
function send_test() {
  const webhook = {
    id: 'WEBHOOK_ID',
    token: 'WEBHOOK_TOKEN',
  }
  send(webhook);
}

/**
 * #회고 채널에 보내기
 */
function send_real() {
  const webhook = {
    id: 'WEBHOOK_ID',
    token: 'WEBHOOK_TOKEN',
  }
  send(webhook);
}

/**
 * @param webhook 웹훅
 * @see {@link https://discord.com/developers/docs/resources/webhook#execute-webhook Execute Webhook}
 */
function send(webhook) {
  const discord_webhook = `https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`;
  // https://discohook.org/
  const payload = {
    "content": `
⏰ 한 주를 돌아볼 회고 시간입니다!
📣 모두 음성 채널로 모여주세요!
오늘 회고의 시작은 🌸${random_member()}🌸 님이 하실 거에요❗️
참석 여부를 ✅/❌로 알려주세요🤓
      `,
    "embeds": [
      {
        "title": "링크 모음",
        "description": "- [HDD 모임 회고](https://www.notion.so/HDD-33663d069835468698aaedbd097f2d04?pvs=4)\n- [성규님 회고](https://holistic-move-048.notion.site/e2cd9f5525d7486ba0f28752863f2c38)\n- [정원님 회고](https://www.notion.so/af40158621d7470890f45baad2f7cbf4)\n- [창수님 회고](https://retromark.notion.site/Retrospective-ef801ba21d7d49fb896ff4f13af6a2eb)\n- [창수님 블로그](https://markruler.github.io/)",
        "color": 16734296
      }
    ],
  }
  const options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
    },
    "payload": JSON.stringify(payload)
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
