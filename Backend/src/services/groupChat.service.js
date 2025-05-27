
import { getAll } from '../models/groupChat.model';

function getAllGroupChat(page,size){
  return  getAll(page,size);
}