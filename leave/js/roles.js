// 🔐 ROLE BASED CHAT ACCESS
export function canChat(senderRole, receiverRole) {
  const rules = {
    employee: ["employee", "manager"],
    manager: ["employee", "admin"],
    admin: ["employee", "manager"]
  };
  return rules[senderRole].includes(receiverRole);
}
