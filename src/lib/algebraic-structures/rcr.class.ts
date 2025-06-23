import { logger, Logger } from "../classes";
import { gcd, sub, sup } from "../utility";



/**
 * Элемент группы
 */
export class GroupElement {
  //
  logger: Logger = logger;
  //
  n: number;
  // l
  power: number;
  // Порядок группы
  order: number;

  //
  gcd: number;

  constructor(
    n: number,
    p: number,
  ) {
    this.n = n;
    this.power = p;
  }

  /**
   * 
   * @param l 
   */
  findOrder(l = this.power) {
    this.logger.log(`Определяем k - порядок элемента <${l}>`, 'color:yellow');

    this.logger.log(`k = n/НОД(n,l)`);

    const nod = gcd(this.n, l);
    this.gcd = nod;

    this.logger.log(`НОД(${this.n},${l}) = ${nod}`);

    this.logger.log(`k = ${this.n}/${nod}`);

    const k = this.n / nod;
    this.logger.log(`k = ${k}`);

    this.logger.log(`O(x${sup(l)}) = ${k}`);
    // this.logger.log(` `);
    // this.logger.log(`k = ${this.n} × m/${l}`);
    // this.logger.log(`O(x${sup(this.l)}) = ${this.n} × m/${l}`);

    this.logger.log(`Образующий подгруппы: ${this.isGenerator ? 'да' : 'нет'}`);

    this.order = k;

    return k;
  }

  /**
   * String
   */
  toString() {
    const str = `O(x${sup(this.power)}) = ${this.order}`;
    this.logger.log(str);
    return str;
  }

  /**
   * string name
   */
  get name(): string {
    return `<x${sup(this.power)}>`;
  }

  // является ли образующий подгруппы
  get isGenerator(): boolean {
    // k^x является образующим тогда
    // когда НОД(k, n) = 1
    if (gcd(this.n, this.power) === 1) {
      return true;
    }
    return false;
  }

  /**
   * all elemenst listed 
   */
  get subgroupElements(): string[] {
    const elements: string[] = [];

    for (let i = 0; i < this.order; i++) {
      elements.push(`(x${sup(this.power)})${sup(i)}`)
    }

    return elements;
  }

  /**
   * all elements calculated 
   */
  get subgroupElementsCalculated(): string[] {
    const elements: string[] = [];

    for (let i = 0; i < this.order; i++) {
      if (i === 0) {
        elements.push(`1${sub('G')}`);
        continue;
      }
      elements.push(`x${sup(this.power * i)}`);
    }

    return elements;
  }

  /**
   * all subgroup elements powers 
   */
  get subgroupElementsPowers(): number[] {
    const elements: number[] = [];

    for (let i = 0; i < this.order; i++) {
      if (i === 0) {
        elements.push(1);
        continue;
      }
      elements.push(this.power * i);
    }

    return elements;
  }

}


// If G is a finite group, then according to Lagrange's theorem the order (number of elements) of a subgroup H divides the order of G.

/**
 * Residue class ring class
 */
export class RCR {

  logger: Logger = logger;

  // Порядок группы
  // |G| = n
  n: number = 14;

  // элемент, порядок которого нужно найти
  l: number = 5;

  subgroups: Map<number, GroupElement[]> = new Map;

  divisors: number[] = [1];

  constructor(n?: number, l?: number) {
    if (typeof n === 'number') {
      this.n = n;
    }
    if (typeof l === 'number') {
      this.l = l;
    }
  }

  /**
   * Исследовать группу
   */
  research() {

    this.divisors = [1];
    this.subgroups.clear();

    this.logger.log(`===========================`, 'color:green');

    this.logger.log(`Исследование группы`, 'color:green');
    this.logger.log(``);

    this.logger.log(`G = <x>, |G| = ${this.n}`);
    this.logger.log(``);

    this.logger.log(`1) ${this.toString()}`, 'color:yellow');
    // https://------------.io/opfSG34PPudcga7J9374s2 17-00
    this.logger.log(` * x${sup(this.n)} = 1${sub('G')}`);

    this.logger.log(``);

    this.logger.log(`2) x${sup('l')}, 1 < l < n, если O(x${sup('l')}) = k, то (x${sup('l')})${sup('k')} = 1${sub('G')}`, 'color:yellow');
    this.logger.log(` или  x${sup('l k')} = 1${sub('G')}`);

    this.logger.log(`x${sup('n m')} = 1${sub('G')}`);
    this.logger.log(`x${sup('nm')} = x${sup('lk')}`);
    this.logger.log(`nm = lk`);
    this.logger.log(`k = nm/l`);
    this.logger.log(`k = n/НОД(n,l)`);
    this.logger.log(``);


    let allGenerators: string[] = [];
    let i: number = 1;
    while (i < this.n) {
      const el = new GroupElement(this.n, i);
      el.findOrder(i);

      if (!this.divisors.includes(el.order)) {
        this.divisors.push(el.order);
      }
      if (el.isGenerator) {
        allGenerators.push(`<x${sup(i)}>`);
      }
      if (!this.subgroups.has(el.order)) {
        this.subgroups.set(el.order, []);
      }

      const elements = this.subgroups.get(el.order);
      elements.push(el);
      this.subgroups.set(el.order, elements);

      this.logger.log(` `);

      i++;
    }
    this.divisors.sort((a, b) => a - b);

    this.logger.log(`G = ${allGenerators.join(' = ')}`);

    this.logger.log(` `);

    this.logger.log(`3) |G| = ${this.n}, делители ${this.divisors.join()}`, 'color:yellow');

    // тривиальные подгруппы
    this.logger.log(`H${sub(1)} = <1${sub('G')}> = {1${sub('G')}}`);
    this.logger.log(`H${sub(2)} = G`);
    this.logger.log(` `);

    let index: number = 3;

    const namedGroups: any = {};

    this.subgroups = new Map(Array.from(this.subgroups).sort((a, b) => a[0] - b[0]));

    this.subgroups.forEach((subgroup: GroupElement[]) => {

      const el = subgroup[0];
      // if (!el.isGenerator) {
      //   this.logger.log(`${el} не образующий`, 'color:red');
      // }
      // const power = subgroup[0].power;
      // = <x${sup(power)}> 

      let hIndex: string = `H${sub(index)}`;
      let color: string = '';
      if (el.order === this.n) {
        color = 'color:cyan';
        this.logger.log(` `);
        this.logger.log(`Вся группа`, color);
        hIndex = 'G';
      }

      if (!namedGroups[hIndex]) {
        namedGroups[hIndex] = el.subgroupElementsPowers;
      }

      this.logger.log(`${hIndex} = ${subgroup.map(e => e.name).join(' = ')} = {${el.subgroupElements.join()}} = {${el.subgroupElementsCalculated.join()}}`, color);
      index++;
    });


    this.logger.log(` `);

    this.logger.log(`4) построить диаграмму`, 'color:yellow');

    index = 3;
    this.subgroups.forEach((subgroup: GroupElement[]) => {

      const el = subgroup[0];

      let hIndex: string = `H${sub(index)}`;
      if (el.order === this.n) {
        hIndex = 'G';
      }

      const includes: string[] = [];

      for (const key of Object.keys(namedGroups)) {
        const group = namedGroups[key];
        if (group.length < el.subgroupElementsPowers.length) {
          const isSub = this.arrayIncludes(el.subgroupElementsPowers, group);
          if (isSub) {
            includes.push(key);
          }
        }
        // this.logger.log(` >  ${key} \t${namedGroups[key]} `);
      }

      this.logger.log(`Подгруппа ${hIndex} включает в себя: ${includes.join()}`);
      index++;
    });




    this.logger.log(` `);
    this.logger.log(` `);
    this.logger.log(` `);

    const questionEl = new GroupElement(this.n, this.l);
    const o = questionEl.findOrder();
    this.logger.log(`Порядок элемента ${this.l} принадлежащего кольцу классов вычетов ℤ${sub(this.n)} : ${o} `, 'color:blue');

    // this.findOrder(2);
    // this.findOrder(3);
    // this.findOrder(14);

    // this.findOrder(14);
    // this.findOrder(14);

  }

  /**
   * String
   */
  toString() {
    let i: number = 1;

    let str = ``;
    // до n-1
    while (i < this.n) {
      str += `, x${sup(i)}`;
      i++;
    }
    const line: string = `G = <x> = {1${sub('G')}${str}}`;

    return line;
  }

  /**
   * if a bigger array includes all numbers from a small array
   */
  arrayIncludes(biggerArray: number[], smallArray: number[]) {
    let difference = smallArray.filter(x => !biggerArray.includes(x));

    if (difference.length) {
      return false;
    }

    return true;
  }
}
