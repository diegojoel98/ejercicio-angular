import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiplos',
  templateUrl: './multiplos.component.html',
  styleUrls: ['./multiplos.component.scss'],
})
export class MultiplosComponent implements OnInit {
  /**
   * atributos de la clase
   * number: numero que escribe el usuario
   * multiplos3, multiplos5, multiplos7: arrays donde se guardarán los múltiplos
   */
  public number: any;
  public multiplos3: number[] = [];
  public multiplos5: number[] = [];
  public multiplos7: number[] = [];

  constructor() {
    this.number = '';
  }

  ngOnInit(): void {}

  getNumber(e: any) {
    console.log('hola ' + e);
    // se inicializan de nuevo los arreglos
    this.multiplos3 = [];
    this.multiplos5 = [];
    this.multiplos7 = [];

    // en un ciclo se recorre hasta el numero ingresado y se utilizan variables para preguntar por los múltiplos
    for (let i = 0, j = 0, k = 0; j < e; i = i + 3, j = j + 5, k = k + 7) {
      console.log(i, j, k);
      // si el numero es divisible por algún múltiplo de tres se guardan en el array
      if (e % i == 0) {
        this.multiplos3.push(i);
      }
      // si el numero es divisible por algún múltiplo de cinco y no es el numero digitado se guardan en el array
      if (j != e && e % j == 0) {
        this.multiplos5.push(j);
      }
      // si el numero es divisible por algún múltiplo de siete y no es el numero digitado se guardan en el array
      if (k != e && e % k == 0 && k != e) {
        this.multiplos7.push(k);
      }
    }
    console.log('m3', this.multiplos3);
    console.log('m5', this.multiplos5);
    console.log('m7', this.multiplos7);
  }
}
