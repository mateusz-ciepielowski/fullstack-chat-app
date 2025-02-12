import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

import ModalContext from "../context/ModalContext";

export default function AttendanceModal({ chatroom }) {
  const { setIsAttendanceClosed } = useContext(ModalContext);
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    const getAttendanceList = async () => {
      const { data } = await axios.post(`/chatroom/attendance`, {
        chatroom,
      });

      console.log(data);
      setAttendanceList(data);
    };
    getAttendanceList();
  }, [chatroom]);

  return createPortal(
    <>
      <div className="modal-overlay"></div>
      <div className="modal modal-attendance">
        <button onClick={() => setIsAttendanceClosed(false)}>X</button>
        <p>Liczba użytkowników: {attendanceList.length}</p>
        <table border={1}>
          <tr>
            <th>Imię i nazwisko</th>
            <th>Kiedy dołączył?</th>
          </tr>
          {attendanceList.map((chatter, i) => (
            <tr key={i}>
              <td>{chatter.username}</td>
              <td>
                {new Date(chatter.createdAt).toLocaleString("pl-PL", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>,
    document.getElementById("modal")
  );
}
