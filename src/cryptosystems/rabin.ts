import { EuclideanAlgorithm } from '../lib/classes/euclidean-algorithm';
import {
  binArrayToAscii,
  binToDec,
  decToBin,
  moduloPositive,
  pairXor,
  plaintextToBinArray,
  slice,
  stringToArray,
  sub,
  sup,
} from '../lib/utility';
import { Cryptosystem } from './cryptosystem';
import { FermatPrimalityTest } from '../lib/classes/fermat-primality-test';
import { Congruence2 } from '../lib/classes/congruence2';



// RSA / Rabin (1-30-00)
// https://---------.io/utC37e3uQpr1dRD8WJD9NM


// Rabin
// ElGamal 47-10
// https://---------.io/3bq7xh1JZ4q1gGebcVV8EQ




/**
 * Rabin cryptography system class
 */
export class Rabin extends Cryptosystem {

  private ptext: string[] = 'code'.split('');

  private ctext: string[] = 'code'.split('');

  private blocks: number[] = [];

  private blocksEncrypted: string[] = [];
  private blocksDecrypted: string[] = [];

  // Public key
  p: number = 107;
  // Public key
  q: number = 71;
  // Private key
  n: number = 7597;

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
    this.clearLogs();
    this.log(`Rabin. Generating keys. Step 1. p=${this.p}, q=${this.q}.`);
    this.log(`Rabin. p and q must meet the following condition: p ≡ q ≡ 3 (mod 4)`);

    // шаг 1 - set p, q , test ≡ / ≢ 

    // test primality проверить на простоту
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

    if (moduloPositive(this.p, 4) !== moduloPositive(this.q, 4)) {
      const message = `p (${this.p}) is not identical to q (${this.q}) modulo 4. Aborting`;
      this.log(message);
      throw new Error(message)
    }

    // step 2
    this.log(`Rabin. Generating keys. Step 2. Calculating public key.`);
    this.n = this.p * this.q
    this.log(`n = p × q = ${this.p} × ${this.q} = ${this.n}.`);

    // step 3
    // 
    // n - public key
    // pair (e, n) - public key
    this.log(`Rabin. Generating keys. Step 3. Keys are generated.`);
    this.log(`Public key: n - ${this.n}`);
    this.log(`Private key: (p, q) - (${this.p}, ${this.q})`);
  }



  /**
   * Encrypt
   */
  encrypt(): string {
    this.clearLogs();
    this.log(`[Rabin] Encrypting using private key ${this.privateKey} and public key ${this.publicKey}.`);

    this.setBlocksize();
    this.prepareBlocks();

    const encryptedBlocks: number[] = [];

    // m = block ^ e mod n
    for (let i = 0; i < this.blocks.length; i++) {
      const b = this.blocks[i];
      const encryptedDec: number = moduloPositive(b ** 2, this.n);
      this.log(`c${sub(i + 1)} = ${b}² mod ${this.n} = ${encryptedDec} = ${decToBin(encryptedDec)}`);
      encryptedBlocks.push(encryptedDec);
    }

    const encryptedBlocksBin = encryptedBlocks.map((n: number) => decToBin(n).padStart(this.blocksizeAscii, '0'));
    this.log(`Encrypted blocks (decimal): ${encryptedBlocks}`);
    this.log(`Encrypted blocks (binary): ${encryptedBlocksBin}`);

    const encrypted = encryptedBlocksBin.join('');
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

    const p = this.p;
    const q = this.q;
    const n = this.n;

    this.clearLogs();
    this.log(`[Rabin] Decrypting using private key ${this.privateKey} and public key ${this.publicKey}.`, `color:yellow`);

    // https://---------.io/utC37e3uQpr1dRD8WJD9NM 1-04-00

    // code 0100010101101110000011110011010101001100010010111011
    // text ??= this.ciphertext;
    // 2221,6204,6822,1211

    const slicedBlocks: string[] = slice(text, this.blocksizeAscii);
    this.log(`Encrypted blocks (binary): ${slicedBlocks}`);
    const slicedBlocksDec: number[] = slicedBlocks.map((n: string) => binToDec(n));
    this.log(`Encrypted blocks (decimal): ${slicedBlocksDec}`);

    const decryptedBlocks: string[] = [];
    const decryptedBlocksDec: number[] = [];

    // x² = c₁ (block) ^ d mod n
    //
    for (let i = 0; i < slicedBlocksDec.length; i++) {
      const b = slicedBlocksDec[i];
      const bMod = moduloPositive(b, n);
      // Шаг 1
      this.log(`Decrypting block (${i}) ${b}`);

      this.log(`\tx${sub(i + 1)} = ${b} mod ${n} = ${bMod}`);

      const pMod = moduloPositive(b, p);
      const qMod = moduloPositive(b, q);

      this.log(`Solving equations:`);
      const pLine = `x² = ${b} mod ${p} = ${pMod}`;
      const qLine = `x² = ${b} mod ${q} = ${qMod}`;
      this.log(`${pLine} \t ${qLine}`);

      const pCon = new Congruence2(b, p);
      const qCon = new Congruence2(b, q);

      const pConResult = pCon.calc();
      const qConResult = qCon.calc();

      this.log(`r = ${pConResult} \t s = ${qConResult}`);
      const r = +(pConResult[0]);
      const s = +(qConResult[0]);

      // Шаг 2
      // https://---------.io/3bq7xh1JZ4q1gGebcVV8EQ 36-00
      // Найти cp + dq = 1 : 2 * 107 + (-3) * 71 = 1 
      // >>> c = 2 , d = -3
      this.log(`Finding c, d (cp + dq)`);
      const e = new EuclideanAlgorithm(p, q);
      const [, c, d] = e.calc();
      e.printResults();

      this.log(`Result: c=${c}, d=${d}`);
      const x = moduloPositive(r * d * q + s * c * p, this.n);
      const y = moduloPositive(r * d * q - s * c * p, this.n);

      // Найти x = ( rdq + scp ) mod n
      this.log(`x = (rdq + scp) mod n = (${r} × ${d} × ${q} + ${s} × ${c} × ${p}) mod ${this.n} = ${x}`);
      this.log(`y = (rdq - scp) mod n = (${r} × ${d} × ${q} - ${s} × ${c} × ${p}) mod ${this.n} = ${y}`);

      this.log(`Result: (±${x}, ±${y})`);

      // Нашли 4 квадратных корня по модулю n
      const roots = [
        x, y, x - this.n, y - this.n,
      ].map(Math.abs)
      this.log(`Square roots: ${roots}`);

      // Шаг 3
      // Находим 1 правильный корень
      // отфильтровываем значения которые больше размера блока

      const bSize = 2 ** this.blocksize;
      this.log(`Removing values that are bigger than blocksize (${this.blocksize}): 2${sup(this.blocksize)}=${bSize}`);

      const filteredRoots = roots.filter((r: number) => !(bSize < r));

      this.log(`Filtered roots: ${filteredRoots}`);

      this.log(`Checking other values.`);
      let blockBin: string;
      let root: number;
      for (let j = 0; j < filteredRoots.length; j++) {
        // Разбиваем блок на части
        // сам блок и хеш (4 бита)
        // 
        // затем проверяем хеш
        // 
        const r = filteredRoots[j];
        const rBin = decToBin(r).padStart(this.blocksize, '0');
        const rBlock = rBin.slice(0, 8);
        const rHash = rBin.slice(8, 12);
        const xorResult = pairXor(rBlock);
        const hashMatch = rHash === xorResult;
        this.log(`${r}\t${rBin}\t(block=${rBlock}, hash=${rHash}, xor=${xorResult}) \t${hashMatch}`);
        if (hashMatch) {
          blockBin = rBlock;
          root = r;
        }
      }
      const blockDec = binToDec(blockBin);
      this.log(`Block found: ${blockBin} (${blockDec})`);
      this.log(`m${sub(i + 1)} = ${root}`);

      decryptedBlocks.push(blockBin);
      decryptedBlocksDec.push(blockDec);

      this.log(`\n`);
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

    this.log(`Blocksize is ${this.blocksize}.`);

    this.blocksizeAscii = this.blocksize + 1
    return this.blocksize;
  }


  /**
   * Split plain text into blocks and convert to dec
   * 
   */
  prepareBlocks() {

    this.log('Preparing blocks for encoding')

    const plaintextBin = plaintextToBinArray(this.ptext).flat().join('');

    this.log(`Plain text string: ${plaintextBin}`);

    const blocks = slice(plaintextBin, 8);

    // Adding redundency
    for (let i = 0; i < blocks.length; i++) {
      blocks[i] = `${blocks[i]}${pairXor(blocks[i])}`;
    }

    this.log(`Blocks in binary representation: ${blocks}`);
    this.blocks = blocks.map((s: string) => Number.parseInt(s, 2));
    this.log(`Blocks in decimal representation: ${this.blocks}`);

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
   * Public key
   */
  get publicKey(): number {
    return this.n;
  }



  /** 
   * Private key
   */
  get privateKey(): [number, number] {
    return [this.p, this.q];
  }

}


