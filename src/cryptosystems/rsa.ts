import { EuclideanAlgorithm } from '../lib/classes/euclidean-algorithm';
import {
  binArrayToAscii,
  binToDec,
  decToBin,
  ensurePositive,
  plaintextToBinArray,
  slice,
  stringToArray,
  sub,
  sup,
} from '../lib/utility';
import { Cryptosystem } from './cryptosystem';
import { FermatPrimalityTest } from '../lib/classes/fermat-primality-test';
import { LargePowerModulo } from '../lib/classes/large-power-modulo.class';



// RSA 
// https://---------.io/utC37e3uQpr1dRD8WJD9NM



// ElGamal
// Rabin
// https://---------.io/3bq7xh1JZ4q1gGebcVV8EQ




/**
 * RSA encryption class
 */
export class RSA extends Cryptosystem {

  private ptext: string[] = 'code'.split('');

  private ctext: string[] = 'code'.split('');

  private blocks: number[] = [];

  private blocksEncrypted: string[] = [];
  private blocksDecrypted: string[] = [];

  //
  p: number = 109;
  //
  q: number = 71;
  // Public key
  n: number = 7739;
  // Public key
  e: number = 13;
  // private key
  d: number = 6397;
  // blocksize for bin to ASCII conversion
  blocksizeAscii: number = 13;
  // blocksize
  blocksize: number = 12;


  /**
   * Constructor
   */
  constructor() {
    super();
  }



  /**
   * Generate keys
   */
  generateKeys() {
    this.log(`RSA. Generating keys. Step 1. p=${this.p}, q=${this.q}.`);

    // шаг 1 - set p, q , проверить на простоту
    const pTest = new FermatPrimalityTest(this.p, 5);
    const qTest = new FermatPrimalityTest(this.q, 5);
    if (!pTest.isPrime()) {
      this.log(`p (${this.p}) is not prime. Aborting.`);
      return;
    }
    if (!qTest.isPrime()) {
      this.log(`q (${this.q}) is not prime. Aborting.`);
      return;
    }

    // step 2
    this.log(`RSA. Generating keys. Step 2.`);
    this.n = this.p * this.q
    this.log(`n = p × q = ${this.p} × ${this.q} = ${this.n}.`);

    // step 3
    this.log(`RSA. Generating keys. Step 3.`);
    // φ(n) = (p-1)(q-1)
    const Fn = (this.p - 1) * (this.q - 1);
    this.log(`φ(n) = (p-1) × (q-1) = (${this.p}-1) × (${this.q}-1) = ${Fn}`);

    // step 4
    this.log(`RSA. Generating keys. Step 4.`);
    // https://---------.io/utC37e3uQpr1dRD8WJD9NM 19-10
    // finding e , use Euler function
    this.e = 13;

    // step 5
    this.log(`RSA. Generating keys. Step 5.`);
    // finding d, which is e⁻¹ (inverse)

    const dEuclideanAlgorithm = new EuclideanAlgorithm();
    dEuclideanAlgorithm.logger = { log: this.log.bind(this) };
    const results = dEuclideanAlgorithm.calc(this.e, Fn);
    const d = results[1];
    this.d = ensurePositive(d, Fn);
    this.log(`\n`);
    dEuclideanAlgorithm.printResults();
    this.log(`\n`);
    let positiveD: string = '';
    if (d !== this.d) {
      positiveD = ` = ${this.d}`;
    }
    this.log(`d = ${d}${positiveD}`);


    // step 6
    this.log(`RSA. Generating keys. Step 6.`);
    // pair (e, n) - public key
    // d - private key
    this.log(`Public key: (e, n) - (${this.e}, ${this.n})`);
    this.log(`Private key: d - ${this.d}`);
  }


  /**
   * Limit blocksize
   * ⌊log₂n⌋ = blocksize
   * @returns max block size
   */
  setBlocksize(): number {
    this.log(`Calculating blocksize`);

    this.blocksize = Math.floor(Math.log2(this.n));

    //
    // block size must be less than n
    // 
    // https://---------.io/utC37e3uQpr1dRD8WJD9NM  33-30
    let po = 2 ** this.blocksize;
    this.log(`Calculating blocksize ${po}`);

    while (po > this.n) {
      this.blocksize--;
      po = 2 ** this.blocksize;
    }

    this.log(`⌊log₂n⌋ = ⌊log₂${this.n}}⌋ = ${this.blocksize}`);
    this.log(`\n`);

    this.blocksizeAscii = this.blocksize + 1
    return this.blocksize;
  }


  /**
   * Plain text string representation
   */
  get plaintext(): string {
    return this.ptext.join('')
  }



  /**
   * Cipher text string representation
   */
  get ciphertext(): string {
    return this.ctext.join('')
  }



  /**
   * Set plaintext
   * @param text 
   */
  set plaintext(text: string) {
    this.ptext = stringToArray(text)
  }



  /**
   * Set ciphertext
   * @param text 
   */
  set ciphertext(text: string | string[]) {
    this.ctext = stringToArray(text)
  }

  /**
   * Split plain text into blocks and convert to dec
   * 
   */
  prepareBlocks() {

    console.log('Preparing blocks for encoding')

    const plaintextBin = plaintextToBinArray(this.ptext).flat().join('');

    console.log(`Plain text string: ${plaintextBin}`);

    const blocks = slice(plaintextBin, this.blocksize);

    console.log(`Blocks in binary representation: ${blocks}`);
    this.blocks = blocks.map((s: string) => Number.parseInt(s, 2));
    console.log(`Blocks in decimal representation: ${this.blocks}`);


  }

  /**
   * Encrypt
   */
  encrypt(): string {
    this.clearLogs();

    this.setBlocksize();
    this.prepareBlocks();

    const encryptedBlocks: number[] = [];

    // m = block ^ e mod n
    for (let i = 0; i < this.blocks.length; i++) {
      const b = this.blocks[i];
      const p = new LargePowerModulo(b, this.e, this.n);
      p.logger = { log: this.log.bind(this) };
      const results = p.printResults();
      const encryptedDec: number = results[0];
      this.log(`m${sub(i + 1)} = ${b}${sup(this.e)} mod ${this.n} = ${encryptedDec}`);
      encryptedBlocks.push(encryptedDec);
    }

    const encryptedBlocksDec = encryptedBlocks.map((n: number) => decToBin(n).padStart(this.blocksizeAscii, '0'));
    this.log(`Encrypted blocks (decimal): ${encryptedBlocks}`);
    this.log(`Encrypted blocks (binary): ${encryptedBlocksDec}`);

    const encrypted = encryptedBlocks.join('');
    this.log(`Full string (encrypted): ${encrypted}`);
    const bBlocks = slice(encrypted, 8);
    this.log(`8 bit blocks: ${bBlocks}`);

    this.blocksEncrypted = bBlocks;

    const ciphertext = binArrayToAscii(this.blocksEncrypted);
    this.log(`Ciphertext: ${ciphertext}`);
    this.log(`\n`);

    // https://---------.io/utC37e3uQpr1dRD8WJD9NM 57 00

    return '';
  }



  /**
   * Decrypt
   */
  decrypt(text?: string): string {
    this.clearLogs();
    this.log(`Starting decryption`);
    // https://---------.io/utC37e3uQpr1dRD8WJD9NM 57-00

    // code 0110010001100110000011110010101111110101
    // text ??= this.ciphertext;
    // 6425,4217,3061

    const slicedBlocks: string[] = slice(text, this.blocksizeAscii);
    this.log(`Encrypted blocks (binary): ${slicedBlocks}`);
    const slicedBlocksDec: number[] = slicedBlocks.map((n: string) => binToDec(n));
    this.log(`Encrypted blocks (decimal): ${slicedBlocksDec}`);

    const decryptedBlocks: string[] = [];
    const decryptedBlocksDec: number[] = [];

    // m = block ^ d mod n
    //
    for (let i = 0; i < slicedBlocksDec.length; i++) {
      const b = slicedBlocksDec[i];
      const p = new LargePowerModulo(b, this.d, this.n);
      p.logger = { log: this.log.bind(this) };
      const results = p.printResults();
      const decryptedDec: number = results[0];
      const decryptedBin: string = decToBin(decryptedDec).padStart(this.blocksize, '0');
      this.log(`m${sub(i + 1)} = ${b}${sup(this.d)} mod ${this.n} = ${decryptedDec} = ${decryptedBin}`);
      decryptedBlocks.push(decryptedBin);
      decryptedBlocksDec.push(decryptedDec);
    }

    this.log(`Decrypted blocks (decimal): ${decryptedBlocksDec}`);
    this.log(`Decrypted blocks (binary): ${decryptedBlocks}`);

    const decryptedFull = decryptedBlocks.join('');
    this.log(`Full string decrypted: ${decryptedFull}`);
    const bBlocks = slice(decryptedFull, 8);
    this.log(`8 bit blocks (decrypted): ${bBlocks}`);

    this.blocksDecrypted = bBlocks;

    const decryptedText = binArrayToAscii(this.blocksDecrypted);
    this.log(`Plaintext: ${decryptedText}`);
    this.log(`\n`);

    return decryptedText;
  }



  /**
   * Public key
   */
  get publicKey(): [number, number] {
    return [this.e, this.n];
  }



  /** 
   * Private key
   */
  get privateKey(): number {
    return this.d;
  }


}


