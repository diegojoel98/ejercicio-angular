import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-multiplos',
  templateUrl: './multiplos.component.html',
  styleUrls: ['./multiplos.component.scss'],
})
export class MultiplosComponent {
  /**
   * atributos de la clase
   * number: numero que escribe el usuario
   * multiplos3, multiplos5, multiplos7: arrays donde se guardarán los múltiplos
   * m3m5, m3m5, m5m7, mult: variables para saber si el numero ingresado tiene más de un múltiplo
   */
  public number: any;
  public multiplos3: number[] = [];
  public multiplos5: number[] = [];
  public multiplos7: number[] = [];
  public m3m5: any = false;
  public m3m7: any = false;
  public m5m7: any = false;
  public mult: any = false;

  constructor(private firestore: AngularFirestore) {
    this.number = '';
  }

  getNumber(e: any) {
    console.log('hola ' + e);
    // se inicializan de nuevo los arreglos y las variables de validación de más de un múltiplo
    this.multiplos3 = [];
    this.multiplos5 = [];
    this.multiplos7 = [];
    this.m3m5 = false;
    this.m3m7 = false;
    this.m5m7 = false;
    this.mult = false;

    // en un ciclo se recorre hasta el numero ingresado y se utilizan variables para preguntar por los múltiplos
    for (let i = 0, j = 0, k = 0; j < e; i = i + 3, j = j + 5, k = k + 7) {
      //console.log(i, j, k);
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

    // se valida si el numero tiene más de un múltiplo
    if (this.multiplos3.length > 0 && this.multiplos5.length > 0 && e != 105) {
      this.m3m5 = `${e} [ ${this.multiplos3} y ${this.multiplos5} ]`;
    }
    if (this.multiplos3.length > 0 && this.multiplos7.length > 0 && e != 105) {
      this.m3m7 = `${e} [ ${this.multiplos3} y ${this.multiplos7} ]`;
    }
    if (this.multiplos5.length > 0 && this.multiplos7.length > 0 && e != 105) {
      this.m5m7 = `${e} [ ${this.multiplos5} y ${this.multiplos7} ]`;
    }
    if (e === 3 * 5 * 7) {
      this.mult = `${e} [ ${this.multiplos3} y ${this.multiplos5} y ${this.multiplos7} ]`;
    }
    let multiplosObj = {
      number: e,
      multiplos3: this.multiplos3,
      multiplos5: this.multiplos5,
      multiplos7: this.multiplos7,
    };
    //console.log(multiplosObj);

    this.firestore
      .collection('multiplos')
      .add(multiplosObj)
      .then(() => console.log('Multiplo guardado en la base de datos'))
      .catch((err) => console.log('Error al guardar el número: ', err));
    /* console.log("m3m5", this.m3m5);
    console.log("m3m7", this.m3m7);
    console.log("m5m7", this.m5m7);
    console.log("mult", this.mult); */
    /* console.log('m3', this.multiplos3);
    console.log('m5', this.multiplos5);
    console.log('m7', this.multiplos7); */
  }
}
