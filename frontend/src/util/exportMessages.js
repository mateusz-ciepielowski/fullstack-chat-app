import axios from "axios";
import { saveAs } from "file-saver";

export default async function exportMessages(chatroom) {
  try {
    const { data } = await axios.post(`/message/get/${chatroom}`, {
      chatroom: chatroom,
    });
    const logs = data
      .map((m) => `${m.chatter.username}: ${m.message}`)
      .toString();
    const logs2 = logs.replaceAll(",", "\n");
    const blob = new Blob([logs2], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${chatroom}-zapis-chatu.txt`);
  } catch (err) {
    console.error(err);
  }
}
