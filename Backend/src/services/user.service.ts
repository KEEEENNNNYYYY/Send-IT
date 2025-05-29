import { getByNumericId  } from '../models/user.model';
import { createUserQuery } from '../models/user.model';

export async function getUserByNumericId (id : number){

    const userInfo =   await getByNumericId(id);

    return userInfo;
}

export async function createUser(
    id: string,
    first_name: string,
    last_name: string,
    birthday: Date,
    email: string,
    location: string
) {
    const userInfo = await createUserQuery(id, first_name, last_name, birthday, email, location);
    return userInfo;
}
