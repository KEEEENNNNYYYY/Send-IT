import axios from "axios";

export const getOrCreatePrivateChat = async (firstUserId: number|undefined, secondUserId: number|undefined) => {
  const res = await axios.get("http://localhost:5000/api/chat", {
    params: { first_user_id: firstUserId, second_user_id: secondUserId },
  });

  if (!res.data && firstUserId && secondUserId) {
    const newChat = { firstUserId, secondUserId };
    const resNew = await axios.post("http://localhost:5000/api/chat", newChat);
    return resNew.data;
  }

  return res.data;
};
