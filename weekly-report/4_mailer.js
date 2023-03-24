/**
 * 메일을 보낸다.
 */
async function sendmail(receiver, htmlBody) {
  await MailApp.sendEmail({
    to: receiver,
    subject: `[주간업무보고] ${getToday()} 개발팀 ${getOwnName()}`,
    htmlBody: htmlBody
  });
}

/**
 * 오늘 날짜를 구하고 "YYYY. MM. DD." 형식으로 리턴한다.
 */
function getToday() {
  let date = new Intl.DateTimeFormat("ko", { dateStyle: 'medium' }).format(new Date())
  console.log(date);
  return date;
  ;
}

/**
 * 현재 계정의 이름을 리턴한다.
 *
 * https://developers.google.com/apps-script/reference/contacts/contacts-app
 */
function getOwnName() {
  const email = Session.getEffectiveUser().getEmail();
  const self = ContactsApp.getContact(email);

  // If user has themselves in their contacts, return their name
  if (self) {
    // Prefer first name, if that's available
    // let name = self.getGivenName();
    // But we will settle for the full name
    // if (!name) name = self.getFullName();
    return self.getFullName();
  }
  // If they don't have themselves in Contacts, return the bald userName.
  else {
    return Session.getEffectiveUser().getUsername();
  }
}
