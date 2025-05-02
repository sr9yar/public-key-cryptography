import {
  ElGamal,
  //   Rabin,
  //   RSA,
} from './cryptosystems';
// import { 
// toBase64,
// fromBase64,
// } from './lib/utility';



// const enc = new RSA();
const enc = new ElGamal();
// const enc = new Rabin();
// enc.plaintext = 'code 111 !@!#E@ +++ xui';
// enc.e = 17;
// enc.generateKeys();  

enc.p = 10009;
enc.g = 5004;

enc.encrypt();
enc.decrypt();

// console.log(enc.e);

// console.log(toBase64('code111'));
// console.log(toBase64('code11'));
// console.log(toBase64('code1'));
