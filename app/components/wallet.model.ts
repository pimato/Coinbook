export class Wallet {
 name:string;
 publicKey:string;
 balance:number;
 value:number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
