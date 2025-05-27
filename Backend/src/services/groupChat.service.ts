
import { getAll } from '../models/groupChat.model';

export async function getAllGroupChat(page : number,size:number){

const groupChats =   await getAll(page,size);
  // console.log(groupChats);
  
 return groupChats;
}