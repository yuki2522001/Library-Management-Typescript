import { v4 as uuidv4 } from "uuid";
import { urlHire } from '../constants/apis';
import { get, post, update, remove } from "../helpers/fetchApi";
import HireRequestType from '../interfaces/hireRequest';

export default class HireRequestModel {
  response: HireRequestType[];
  
  // Get data from server
  async getHireRequest(): Promise<HireRequestType[]> {
    this.response = await get<HireRequestType[]>(urlHire);
    return this.response;
  };

   // Add information hire request
   async addBorrowBooks(dataHireRequest: HireRequestType, isComplete = false): Promise<{ data: null | HireRequestType; status: number; }> {
    // Use uuid to render unique id
    const infoId = uuidv4();
    const newInfo = {
      id: infoId,
      user: dataHireRequest.user,
      book: dataHireRequest.book,
      fromDate: dataHireRequest.fromDate,
      toDate: dataHireRequest.toDate,
      isComplete,
    };

  /**
   * Check how many books that user has borrowed,
   * if they borrow more than 5, they won't lend them anymore
  */
  let countUserHireRequest = 0;
  for (let i = 0; i < this.response.length; i += 1) {
    if (this.response[i].user === this.response[i].user && this.response[i].isComplete === false) {
      countUserHireRequest += 1;
      if (countUserHireRequest >= 5) {
        return {
          data: null,
          status: 400,
        };
      }
    }
  }

  const info = await post(`${urlHire}`, newInfo);
  this.response.push(info);
    return {
      data: info,
      status: 200,
    };
  }

  // Delete borrow book
  deleteBorrowBooks(id: string): Promise<HireRequestType> {
    const url = `${urlHire}/${id}`;
    return remove(url);
  }

  // Update borrow books
  async updateBorrowBooks(id: string, dataHireRequest: HireRequestType): Promise<HireRequestType> {
    const updateInfos = {
      id,
      user: dataHireRequest.user,
      book: dataHireRequest.book,
      fromDate: dataHireRequest.fromDate,
      toDate: dataHireRequest.toDate
    };

    return update(`${urlHire}/${id}`, updateInfos);
  }

   // Complete borrow books
   async completeBorrowBooks(id: string, book: string): Promise<HireRequestType> {
    const url = await get(`${urlHire}/${id}`) as HireRequestType;
    url.isComplete = true;

    const hireRequest = await update(`${urlHire}/${id}`, url);
    const afterCompleteHireRequest =  this.response.find((item) => item.id === hireRequest.id);
    if (afterCompleteHireRequest.isComplete === false) {
      afterCompleteHireRequest.isComplete = true;
    }
    return update(`${urlHire}/${id}`, url);;
  }

  // Count the number of completed hire requests
  async displayDataCompletes(): Promise<Number> {
    const dataComplete = await get<HireRequestType[]>(urlHire);
    let count = 0;
    for (let i = 0; i < dataComplete.length; i += 1) {
      if (dataComplete[i].isComplete === true) {
        count += 1;
      }
    }

    return count;
  }
}
