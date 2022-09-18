import {Component, OnInit} from '@angular/core';
import {BookService} from "./book.service";
import {Book} from "./book";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'booklibriry';
  public books: Book[] =[];
  // @ts-ignore
  public editBook: Book;
  // @ts-ignore
  public deleteBook: Book;
  constructor(private bookService:BookService){

  }
  public getBooks(){
    this.bookService.getBook().subscribe(
      (response:Book[]) => {
        this.books = response
      },
      (error:HttpErrorResponse) =>{
        console.log(error.message);
      }
    )
  }

  public onAddBook(addForm:NgForm): void{
    // @ts-ignore
    document.getElementById('add-book-form').click();
    this.bookService.addBook(addForm.value).subscribe(
      (response:Book)=>{
        console.log(response);
        this.getBooks();
        addForm.reset();
      },
      (error: HttpErrorResponse)=>{
        console.log(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateBook(book: Book): void{
    this.bookService.updateBook(book).subscribe(
      (response:Book)=>{
        console.log(response);
        this.getBooks();

      },
      (error: HttpErrorResponse)=>{
        console.log(error.message);

      }
    );
  }
  public onDeleteBook(bookId: String | undefined): void{

    this.bookService.deleteBook(bookId as String).subscribe(
      (response:void)=>{
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse)=>{
        console.log(error.message);

      }
    );
  }

  // @ts-ignore
  public onOpenModal(book:Book | null, mode: string):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add'){
      button.setAttribute('data-target', '#addBookModal');
    }
    if(mode == 'edit'){
      if(book !=null){
        this.editBook = book;
      }

      button.setAttribute('data-target', '#updateBookModal');

    }
    if(mode == 'delete'){
      button.setAttribute('data-target', '#deleteBookModal');
      if(book!=null){
        this.deleteBook = book;
      }
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }


  ngOnInit(): void {
    this.getBooks();
  }

}
