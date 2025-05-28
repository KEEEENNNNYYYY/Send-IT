
import { getAll } from '../models/group.chat.model';

export async function getAllGroupChat(page : number,size:number){

const groupChats =   await getAll(page,size);
  // console.log(groupChats);
  
 return groupChats;
}