import { getByNumericId  } from '../models/user.model';

export async function getUserByNumericId (id : number){

    const userInfo =   await getByNumericId(id);

    return userInfo;
}