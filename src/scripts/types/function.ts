import BookType from '../interfaces/book';
import UserType from '../interfaces/user';
import HireRequestType from '../interfaces/hireRequest';

type AddBookFunc = ( dataBook: BookType ) => void;
type DeleteBookFunc = (id: string) => void;
type UpdateBookFunc = ( id: string, dataBook: BookType) => void;

type AddUserFunc = ( dataUser: UserType) => void;
type DeleteUserFunc = (id: string) => void;
type UpdateUserFunc = ( id: string, dataUser: UserType) => void;

type AddHireRequestFunc = ( dataHireRequest: HireRequestType ) => void;
type DeleteHireRequestFunc = (id: string) => void;
type UpdateHireRequestFunc = (id: string, dataHireRequest: HireRequestType ) => void;
type CompleteHireRequestFunc = ( id: string, book: string ) => void;

export {
  AddBookFunc,
  UpdateBookFunc,
  DeleteBookFunc,
  AddUserFunc,
  DeleteUserFunc,
  UpdateUserFunc,
  AddHireRequestFunc,
  DeleteHireRequestFunc,
  UpdateHireRequestFunc,
  CompleteHireRequestFunc
};