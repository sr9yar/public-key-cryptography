import {
  EuclideanAlgorithm,
} from '../lib/classes/euclidean-algorithm';
import {
  binArrayToAscii,
  binToDec,
  decToBin,
  findOrderInGroup,
  getAllFactors,
  getRandomInArray,
  getRandomNumber,
  isPrime,
  moduloPositive,
  plaintextToBinArray,
  slice,
  stringToArray,
  sub,
  sup,
} from '../lib/utility';
import { Cryptosystem } from './cryptosystem';
import { LargePowerModulo } from '../lib/classes/large-power-modulo';
import {
  // PRIME_NUMBERS,
  PRIME_NUMBERS_10K,
} from '../lib/constants';
import { logger } from '../lib/classes';



// ElGamal 47-10
// https://---------.io/3bq7xh1JZ4q1gGebcVV8EQ



/**
 * ElGamal encryption class
 */
export class ElGamal extends Cryptosystem {

  logger = logger;

  private ptext: string[] = 'code'.split('');

  private ctext: string[] = '10111011011111111011101100101100101110111100100110111011001011111011101100111111'.split('');

  private blocks: number[] = [];

  private blocksEncrypted: string[] = [];

  private blocksDecrypted: string[] = [];

  // параметры домена
  // Big prime number
  _p: number = 13499; // 10009 211 277 1619 10007 13457 
  // g ∈ F*ₚ
  g: number = 13496; // 5004 3
  // Private key. 1 < x < p - 1
  x: number = 5049; // 35; // x = 35, p = 211, g =3
  // Public key. h = g ^ x (mod p)
  h: number = 5581; // 197;
  // Session key
  k: number = 1616; // 7;

  // blocksize
  bs: number = 13; // 7

  /**
   * Constructor
   */
  constructor(p?: number) {
    super();
    if (typeof p === 'number') {
      this._p = p;
    } else {
      this.generateP();
    }
    if (!this.g) {
      this.generateG();
    }
    this.generateKeys(this.x);
  }

  /**
   * p setter
   */
  set p(value: number) {
    if (!isPrime(value)) {
      this.logger.warn(`Paramter p must be prime. p is ${value}. Aborting`);
      return;
    }
    this._p = value;
  }

  /**
   * 
   */
  get p(): number {
    return this._p;
  }



  /**
   * Choose p
   */
  generateP() {
    const p = getRandomInArray(PRIME_NUMBERS_10K);
    // const p = getRandomInArray(PRIME_NUMBERS.slice(245, 260));
    this._p = p;
    this.logger.log(`[ElGamal] Generating p. p=${this.p}.`, 'color:yellow');
    return p;
  }



  /**
   * must be g ∈ F*ₚ
   * topAcceptable - percent of accebtable g values
   */
  generateG(topAcceptable: number = 0.2) {

    // get all factors of a number
    this.logger.log(`[ElGamal] Generating g. p=${this.p}.`, 'color:yellow');
    const factors = getAllFactors(this.p - 1);
    this.logger.log(`g must be: g ∈ ℤ*ₚ.`);
    this.logger.log(`Getting all factors of p-1 (${this.p - 1}).`);
    this.logger.log(`Factors of ${this.p - 1}: ${factors}.`);

    // We agree that top ten elements are acceptable (large enough)
    // to be selected as g
    //const topAcceptable = 0.5;
    const topPercent = Math.ceil(factors.length * topAcceptable);
    const acceptableNumber = topPercent <= 2 ? 2 : topPercent;
    const acceptableOrders = factors.slice(factors.length - acceptableNumber, factors.length);
    const testFactors = new Set(factors);
    testFactors.delete(1);
    testFactors.delete(this.p - 1);

    this.logger.log(`Acceptable orders of g, O(g): ${acceptableOrders}`);

    // // output test
    // // all values
    // testFactors.forEach((n: number) => {
    //   const o = findOrderInGroup(n, this.p);

    //   const acceptableG = acceptableOrders.includes(o);

    //   // if (!acceptableG) {
    //   const oDvivisors = new Set(getAllFactors(n));
    //   ls = ls.difference(oDvivisors);
    //   // }

    //   const color = acceptableG ? 'color:white' : 'color:gray';
    //   this.logger.log(`O(${n}) = ${o}\t${acceptableG} ${[...ls]},  ${[...oDvivisors]}`, color);
    // });

    // 
    // Acceptable orders of g, O(g): 105,210
    // 
    // O(2) = 210      true 3,5,6,7,10,14,15,21,30,35,42,70,105,  1,2
    // O(3) = 210      true 5,6,7,10,14,15,21,30,35,42,70,105,  1,3
    // O(5) = 35       false 6,7,10,14,15,21,30,35,42,70,105,  1,5
    // O(6) = 105      true 7,10,14,15,21,30,35,42,70,105,  1,2,3,6
    // O(7) = 210      true 10,14,15,21,30,35,42,70,105,  1,7
    // O(10) = 30      false 14,15,21,30,35,42,70,105,  1,2,5,10
    // O(14) = 3       false 15,21,30,35,42,70,105,  1,2,7,14
    // O(15) = 6       false 21,30,35,42,70,105,  1,3,5,15
    // O(21) = 15      false 30,35,42,70,105,  1,3,7,21
    // O(30) = 105     true 35,42,70,105,  1,2,3,5,6,10,15,30
    // O(35) = 210     true 42,70,105,  1,5,7,35
    // O(42) = 70      false 70,105,  1,2,3,6,7,14,21,42
    // O(70) = 105     true 105,  1,2,5,7,10,14,35,70
    // O(105) = 105    true ,  1,3,5,7,15,21,35,105
    //

    let acceptableG: number = 0;

    // this outer iteration is necessary
    // in a theoretically possible scenario
    // when the inner loop filters out possible g's to early
    //
    // in such case, this loop will start the test again
    let testingIteration = 0;
    while (acceptableG === 0) {
      this.logger.log(`Started testing an acceptable g (iteration ${testingIteration}).`);
      testingIteration++;

      // list of test values 
      // let ls = new Set(shuffle([...testFactors]));
      let ls = new Set([...testFactors]);

      //
      let next = this.p;
      while (next !== 0) {
        next--;
        // const next = ls.values().next().value;

        // const r = getRandomInArray(possibleG);
        const o = findOrderInGroup(next, this.p);

        const isAcceptable = acceptableOrders.includes(o);

        if (isAcceptable) {
          acceptableG = next;
        }
        const oDvivisors = new Set(getAllFactors(next));
        ls = ls.difference(oDvivisors);

        const color = isAcceptable ? 'color:white' : 'color:gray';
        this.logger.log(`O(${next}) = ${o}\t${isAcceptable}\t${[...ls]} (excluded ${[...oDvivisors]})`, color);

        if (isAcceptable) {
          break;
        }
      }

      if (testingIteration > 10) {
        throw new Error(`Too many testing interations`);
      }
    }
    this.logger.log(`Acceptable g: ${acceptableG}`);

    // 
    // https://cacr.uwaterloo.ca/hac/ 
    // 

    this.g = acceptableG;
    return this.g;
  }



  /**
   * Generate keys
   */
  generateKeys(x?: number) {
    // this.clearLogs();

    // this.generateP();
    // this.generateG();

    // Step 1. 1 < x < p - 1
    this.logger.log(`[ElGamal] Generating keys. Step 1. p=${this.p}.`, 'color:yellow');

    this.logger.log(`[ElGamal] x (private key) is a random number.`);

    this.x = x ?? getRandomNumber(1, this.p - 1);
    // this.x = 35; // for testing / can be removed
    this.logger.log(`[ElGamal] x must meet the following condition 1 < x < p - 1: 1 < ${this.x} < ${this.p - 1}`);

    // Step 2. h = g ^ x (mod p)
    // this.h = moduloPositive(this.g ** this.x, this.p);
    this.logger.log(`[ElGamal] Generating keys. Step 2. Calculating public key (h).`);

    const hMod = new LargePowerModulo(this.g, this.x, this.p);
    // hMod.logger = { log: this.logger.log.bind(this) };
    //const result = hMod.calc();
    const result = hMod.printResults();
    this.h = result[0];

    this.logger.log(`h = g${sup('x')} (mod p) = ${this.g} ^ ${this.x} (mod ${this.p}) = ${this.h}`);

    // Step 3. 
    // 
    // public key - h
    // private key - x
    this.logger.log(`[ElGamal] Generating keys. Step 3. Keys are generated.`);
    this.logger.log(`Public key: h - ${this.h}`);
    this.logger.log(`Private key: x - ${this.x}`);
    this.logger.log(`\n`);
  }



  /**
   * Encryption algorithm
   */
  encrypt(sessionKey?: number): string {
    // this.clearLogs();

    // Step 1 
    this.setBlocksize();
    this.prepareBlocks();
    // this.setSessionKey();

    this.logger.log(`[ElGamal] Encrypting using private key ${this.privateKey} and public key ${this.publicKey}.`, 'color:yellow');
    const encryptedBlocks: number[] = [];

    // choose session key
    const k = this.setSessionKey(sessionKey);
    // const k = 7;

    // Step 4
    // C1 = gᵏ (mod p)
    // C2 = m * hᵏ (mod p)

    const largePoC1 = new LargePowerModulo(this.g, k, this.p);
    // const [C1] = largePoC1.calc();
    const [C1] = largePoC1.printResults();
    const C1Bin = decToBin(C1, this.blocksize);
    this.logger.log(`C1 = ${C1}`);

    const largePo = new LargePowerModulo(this.h, k, this.p);
    //const [hk] = largePo.calc();
    const [hk] = largePo.printResults();
    this.logger.log(`h${sup('k')} (mod p) = ${this.h}${sup(k)} (mod ${this.p}) = ${hk}`);

    // m = (C1, C2)
    for (let i = 0; i < this.blocks.length; i++) {
      const m = this.blocks[i];
      this.logger.log(`m${sub(i + 1)} = ${decToBin(m)}₂ = ${m}₁₀`);

      const C2 = moduloPositive(m * hk, this.p);
      const C2Bin = decToBin(C2, this.blocksize);

      // C1 = gᵏ (mod p)
      this.logger.log(`C₁${sub(i + 1)} = g${sup('k')} (mod p) = ${this.g}${sup(k)} (mod ${this.p}) = ${C1} = ${C1Bin} (chars ${C1Bin.length})`);
      // C2 = m * hᵏ (mod p)
      this.logger.log(`C₂${sub(i + 1)} = m${sub(i + 1)} × h${sup('k')} (mod p) = ${m} × ${this.h}${sup(k)} (mod ${this.p}) = ${C2} = ${C2Bin} (chars ${C1Bin.length})`);

      this.logger.log(`\tCiphertext: (${C1}, ${C2})`, 'color:blue');

      encryptedBlocks.push(binToDec(`${C1Bin}${C2Bin}`));
    }

    const encryptedBlocksBin = encryptedBlocks.map((n: number) => decToBin(n, this.blocksize * 2));
    this.blocksEncrypted = encryptedBlocksBin;

    this.logger.log(`Encrypted blocks (decimal): ${encryptedBlocks}`);
    this.logger.log(`Encrypted blocks (binary): ${this.blocksEncrypted}`);

    const encrypted = encryptedBlocksBin.join('');
    this.logger.log(`Full string (encrypted): ${encrypted}`);
    this.ciphertext = encrypted;

    this.logger.log(`\n`);

    return encrypted;
  }



  /**
   * Decrypt
   */
  decrypt(text?: string): string {

    // this.clearLogs();
    this.logger.log(`[ElGamal] Decrypting using private key ${this.privateKey} and public key ${this.publicKey}.`, `color:yellow`);

    // code 01001101011111110100110100101100010011011100100101001101001011110100110100111111
    text ??= this.ciphertext;
    // 19839,19756,19913,19759,19775
    this.logger.log(`Encrypted blocks (binary ciphertext): ${this.ciphertext}`);

    const slicedBlocks: [string, string][] = (slice(text, this.blocksize * 2, true)).map((t: string) => slice(t, this.blocksize) as [string, string]);
    this.logger.log(`Encrypted blocks (binary): ${JSON.stringify(slicedBlocks)}`);

    const slicedBlocksDec: [number, number][] = slicedBlocks.map((b: [string, string]) => [binToDec(b[0]), binToDec(b[1])]);
    this.logger.log(`Encrypted blocks (decimal): ${JSON.stringify(slicedBlocksDec)}`);

    const decryptedBlocks: string[] = [];
    const decryptedBlocksDec: number[] = [];

    //
    // C2 / C1 ^ x
    // C2 * ( C1  ^ x ) ^ -1
    //

    const [C1] = slicedBlocksDec[0];

    this.logger.log(`C1 (${C1}) power of private key x (${this.x})`);
    const [Cx] = new LargePowerModulo(C1, this.x, this.p).printResults();
    this.logger.log(`Calculating the inverse element`);
    const ea = new EuclideanAlgorithm(this.p, Cx);
    const [, , CxInverse] = ea.calc();
    ea.printResults();

    const CxInversePositive = moduloPositive(CxInverse, this.p);
    this.logger.log(`Inverse element: ${CxInversePositive}`);

    for (let i = 0; i < slicedBlocksDec.length; i++) {
      const [C1, C2] = slicedBlocksDec[i];

      const CxI = C2 * CxInversePositive;
      const m = moduloPositive(CxI, this.p);

      this.logger.log(`m${sub(i + 1)} = C₂${sub(i + 1)} × (C₁${sub(i + 1)}${sup('x')})${sup('-1')} mod p
        = ${C2} × (${C1}${sup(this.x)})${sup('-1')} mod ${this.p}
        = ${C2} × ${Cx}${sup('-1')} mod ${this.p}
        = ${C2} × ${CxInversePositive} mod ${this.p}
        = ${CxI} mod ${this.p}
        = ${m}`);

      decryptedBlocksDec.push(m);
      decryptedBlocks.push(decToBin(m, this.blocksize));

    }


    this.logger.log(`Decrypted blocks (decimal): ${decryptedBlocksDec}`);
    this.logger.log(`Decrypted blocks (binary): ${decryptedBlocks}`);

    const decryptedFull = decryptedBlocks.join('');
    this.logger.log(`Full string decrypted: ${decryptedFull}`);
    const bBlocks = slice(decryptedFull, 8);
    this.blocksDecrypted = bBlocks;
    this.logger.log(`8 bit blocks (decrypted): ${this.blocksDecrypted}`);



    const decryptedText = binArrayToAscii(bBlocks);
    this.logger.log(`Plaintext: ${decryptedText}`);
    this.logger.log(`\n`);

    return decryptedText;

  }



  /**
   * Set the blocksize
   * ⌊log₂n⌋ = blocksize
   * @returns max block size
   */
  setBlocksize(): number {
    this.logger.log(`[ElGamal] Calculating blocksize.`, 'color:yellow');

    this.bs = Math.floor(Math.log2(this.p));
    this.logger.log(`⌊log₂p⌋ = ⌊log₂${this.p}⌋ = ${this.bs}`);
    this.logger.log(`Blocksize is ${this.bs}.`, 'color:cyan');
    this.logger.log(`\n`);

    return this.bs;
  }



  /**
   * Split plain text into blocks and convert to dec
   * 
   */
  prepareBlocks(): number[] {

    this.logger.log('[ElGamal] Preparing blocks for encoding', 'color:yellow')

    const plaintextBin = plaintextToBinArray(this.ptext).flat().join('');

    this.logger.log(`[ElGamal] Plain text string: ${plaintextBin}`);

    const blocks = slice(plaintextBin, this.blocksize, true);

    this.logger.log(`[ElGamal] Blocks in binary representation: ${blocks}`);
    this.blocks = blocks.map((s: string) => Number.parseInt(s, 2));
    this.logger.log(`[ElGamal] Blocks in decimal representation: ${this.blocks}`);
    this.logger.log(`\n`);

    return this.blocks;
  }

  /**
   * Get session key
   * must be 1 < k < p-1
   */
  getSessionKey(): number {
    return getRandomNumber(1, this.p - 1);
  }


  /**
   * Set session key
   * must be 1 < k < p-1
   */
  setSessionKey(k?: number) {
    this.k = k ?? getRandomNumber(1, this.p - 1);
    this.logger.log(`[ElGamal] Session key is a random number between ${1} and ${this.p - 1}: ${this.k}`);
    return this.k;
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
    return this.h;
  }



  /** 
   * Private key
   */
  get privateKey(): number {
    return this.x;
  }


  /**
   * Blocksize
   */
  get blocksize(): number {
    return this.bs;
  }
}


