import { getByNumericId, getByUserId } from '../models/user.model';
import { createUserQuery } from '../models/user.model';
import { getAll } from '../models/user.model';

export async function getUserByNumericId(id: number) {
    const userInfo = await getByNumericId(id);
    return userInfo;
}

export async function getUserById(id: string) {
    const userInfo = await getByUserId(id);
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

export async function getAllUser() {
    const userList = await getAll();
    return userList;
}
