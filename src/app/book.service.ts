import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Book} from "./book";


@Injectable({
  providedIn: 'root'
})
export class BookService{
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getBook():Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUrl}/api/book`);
  }

  public addBook(book: Book):Observable<Book> {
    return this.http.post<Book>(`${this.apiServerUrl}/api/book`,book);
  }

  public updateBook(book: Book):Observable<Book> {
    return this.http.put<Book>(`${this.apiServerUrl}/api/book/update`,book);
  }

  public deleteBook(bookId: String):Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/book/delete/${bookId}`);
  }
  public getBookBuId(bookId: String):Observable<Book> {
    return this.http.get<Book>(`${this.apiServerUrl}/api/book/{bookId}`);
  }

}
