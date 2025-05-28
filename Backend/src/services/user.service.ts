import { getByNumericId  } from '../models/user.model';

export async function getUserByNumericId (id : string){

    const userInfo =   await getByNumericId(id);

    return userInfo;
}