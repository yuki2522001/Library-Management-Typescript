export default interface HireRequestType {
  id?: string;
  user: string;
  book: string;
  fromDate: string;
  toDate: string;
  isComplete?: boolean;
}