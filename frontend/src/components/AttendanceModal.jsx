import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

import ModalContext from "../context/ModalContext";

import * as XLSX from "xlsx";

export default function AttendanceModal({ chatroom }) {
  const { setIsAttendanceClosed } = useContext(ModalContext);
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    const getAttendanceList = async () => {
      const { data } = await axios.post(`/chatroom/attendance`, {
        chatroom,
      });

      setAttendanceList(data);
    };
    getAttendanceList();
  }, [chatroom]);

  function handleExport() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(attendanceList);
    XLSX.utils.book_append_sheet(wb, ws, "Arkusz1");
    XLSX.writeFile(wb, `Lista-obecności-${chatroom.name}.xlsx`);
  }

  return createPortal(
    <>
      <div className="modal-overlay"></div>
      <div className="modal modal-attendance">
        <div className="modal-header">
          {attendanceList.length > 0 && (
            <>
              <p>Liczba uczestników: {attendanceList.length}</p>

              <button onClick={() => setIsAttendanceClosed(false)}>X</button>
            </>
          )}
        </div>
        {attendanceList.length === 0 ? (
          <div className="modal-header">
            <p>Brak uczestników</p>

            <button onClick={() => setIsAttendanceClosed(false)}>X</button>
          </div>
        ) : (
          <>
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

            <button onClick={handleExport}>Pobierz xlsx</button>
          </>
        )}
      </div>
    </>,
    document.getElementById("modal")
  );
}
