import { v4 as uuidv4 } from "uuid";
import { urlUser } from "../constants/apis";
import { get, post, update, remove } from "../helpers/fetchApi";
import UserType from '../interfaces/user';

export default class UserModel {
  response: UserType[];
  
  async getUsers(): Promise<UserType[]> {
    this.response = await get<UserType[]>(urlUser);
    return this.response;
  };

   // Add user
   async addUser(dataUsers: UserType): Promise<UserType> {
    // Use uuid to render unique id
    const userId = uuidv4();
    const newUser = {
      id: userId,
      firstName: dataUsers.firstName,
      lastName: dataUsers.lastName,
      email: dataUsers.email,
      phone: dataUsers.phone,
      address: dataUsers.address,
    };

    const user = await post(urlUser, newUser);
    this.response.push(user);
    return user;
  }

  // Delete user
  deleteUser(id: string): Promise<UserType> {
    const url = `${urlUser}/${id}`;
    return remove(url);
  }

  // Update user
  async updateUser(id: string, dataUsers: UserType): Promise<UserType> {
    const updateUser = {
      id: dataUsers.id,
      firstName: dataUsers.firstName,
      lastName: dataUsers.lastName,
      email: dataUsers.email,
      phone: dataUsers.phone,
      address: dataUsers.address,
    };

    return update(`${urlUser}/${id}`, updateUser);
  }

  // Update available quantity after borrowing books
  async getUserById(id: string): Promise<UserType> {
    const user = await get(`${urlUser}/${id}`) as UserType;
    return update(`${urlUser}/${id}`, user);
  }
}