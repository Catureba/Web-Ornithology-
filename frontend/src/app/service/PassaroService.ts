import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CustomResponse } from '../interface/CustomResponse';
import { Passaro } from '../interface/Passaro';

@Injectable({ providedIn: 'root' })
export class PassaroService {


  private readonly apiUrl = 'http://localhost:8080/v1/passaro';
  private nomePaginaPassaro = '';
  constructor(private http: HttpClient) { }

  salvarRedirecionando(nome: string){
    this.nomePaginaPassaro = nome;
  }

  PesquisarPorNome(name: string){
    // console.table(this.http.get<CustomResponse>(`${this.apiUrl}/get/nome/${name}`));
   return this.http.get<CustomResponse>(`${this.apiUrl}/get/nome/${name}`);
  }

  passaros$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/list`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  findByName$ = (name: string) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/get/nome/${name}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  create$ = (passaro: Passaro) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/create`, passaro)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  delete$ = (idPassaro: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/delete/id/${idPassaro}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`Ocorreu um erro - codigo do erro: ${error.status}`);
  }
}
