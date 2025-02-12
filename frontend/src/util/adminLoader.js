import axios from "axios";
import { redirect } from "react-router-dom";

export default async function adminLoader() {
  try {
    const res = await axios.get("/chatter");
    if (!res.data.isAdmin || !res.data || res.status === 401) {
      return redirect("/login");
    }
  } catch (err) {
    console.error(err);
    return redirect("/login");
  }
}
