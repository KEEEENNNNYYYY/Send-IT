import axios from "axios";

export const api_url = process.env.api_url || "http://localhost:5000"

export const getOrCreatePrivateChat = async (firstUserId: number|undefined, secondUserId: number|undefined) => {
  const res = await axios.get(api_url+"/api/chat", {
    params: { first_user_id: firstUserId, second_user_id: secondUserId },
  });

  if (!res.data && firstUserId && secondUserId) {
    const newChat = { firstUserId, secondUserId };
    const resNew = await axios.post(api_url, newChat);
    return resNew.data;
  }

  return res.data;
};
