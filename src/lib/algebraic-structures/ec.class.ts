import { LargePowerModulo, logger, Logger } from "../classes";
import { Point } from "../classes/point";
import { divideModulo, modulo2, moduloPositive, multiplyMod, sub, sup } from "../utility";
// import { gcd, sub, sup } from "../utility";


//
// https://---------------.io/kMouGwpC9XYaq6UeoNmeEs
// ИССЛЕДОВАНИЕ ГРУШЫ ТОЧЕК ЭЛЛИПТИЧЕСКОЙ КРИВОЙ
// 1) Построить группу точек Eab(F,) 
// 2) Найти порядок всех элементов группы (о3) Установить, является ли группа Ea,b(F,) циклической, и при
// положительном исходе найти все ее образующие элементы.
// 4) Найти все циклические подгруппы группы
// 5) Составить диаграмму, описывающую внутреннее устройство группы
//


/**
 * Elliptic curve
 */
export class EC {

  // E a,b
  a: number = 1;

  // E a,b
  b: number = 1;

  // Fp
  p: number = 11;

  logger: Logger = logger;

  //
  ecPoints: Point[] = [];

  // unique subgroups
  subgroups: Map<number, Point[]> = new Map();

  // show logs for adding pointss
  logAddingPoints: boolean = false;


  constructor(a?: number, b?: number, p?: number) {
    if (typeof a === 'number') {
      this.a = a;
    }
    if (typeof b === 'number') {
      this.b = b;
    }
    if (typeof p === 'number') {
      this.p = p;
    }
  }


  /**
   * research
   */
  research() {
    this.logger.log(`E${sub('a,b')}(F${sub('p')}), E${sub(this.a)}${sub(',')}${sub(this.b)}(F${sub(this.p)})`);
    this.logger.log(`y${sup(2)} = x${sub(3)} + x + 1`);

    this.logger.log(` `);
    this.logger.log(`1)`);
    this.logger.log(` `);


    const elements: number[] = [];

    let i: number = 0;
    // до p-1
    while (i < this.p) {
      elements.push(i);
      i++;
    }

    const line: string = `F${sub(this.p)} = ${this.stringRepresentation(elements)}`;

    const shiftedElements: number[] = elements.map((e) => e - elements[elements.length - 1] / 2);

    const line2: string = `F${sub(this.p)} = ${this.stringRepresentation(shiftedElements)}`;

    const minusElements: string[] = [];

    i = 0;
    // до p-1
    while (i <= (this.p - 1) / 2) {
      if (i === 0) {
        minusElements.push(`${i}`);
      } else {
        minusElements.push(`±${i}`);
      }
      i++;
    }
    const line3: string = `F${sub(this.p)} = ${this.stringRepresentation(minusElements)}`;


    this.logger.log(`${line}`);
    this.logger.log(`${line2}`);
    this.logger.log(`${line3}`);
    this.logger.log(``);

    this.findAllPoints();
    this.calculateAllSubgroups();
    this.printSubgroups();

  }



  /**
   * 
   * @param elements 
   * @returns 
   */
  stringRepresentation(elements: number[] | string[]): string {
    const line: string = `{${elements.join(', ')}}`;
    return line;
  }



  /**
   * A group of points on an elliptic curve
   */
  findAllPoints() {
    // https://-----------.io/kMouGwpC9XYaq6UeoNmeEs
    // 34:00
    //
    this.logger.log(`[Определение точек эллиптической кривой] `, 'color:yellow');

    this.logger.log(`F${sub(this.p)} =`);

    this.logger.log(`= {1, 2, 3, ..., ${this.p - 1}} = `);
    this.logger.log(`= {±1, ±2, ±3, ..., ±${(this.p - 1) / 2}}`);

    this.logger.log(`\nПоиск всех корней\n`);

    const last = Math.floor((this.p - 1) / 2);

    const gen = this.getGenerator(0, last);

    // these are for shorted logging
    //let sliceEnd = Math.ceil(last / 2);
    // let sliceStart = sliceEnd - 20;


    const rootsMap = new Map<number, number>();

    while (true) {
      const next = gen.next();
      if (next.done) {
        break;
      }

      const n = next.value ** 2;
      // const h = moduloPositive(n, this.p);

      const [y2] = new LargePowerModulo(next.value, 2, this.p).calc();

      // const hMod = new LargePowerModulo(next.value, 2, this.p);
      // const result = hMod.calc();
      // //const result = hMod.printResults();
      // this.h = result[0];
      // const val = rootsMap.get(h) ?? [];
      // val.push(next.value);

      rootsMap.set(y2, next.value);

      if (next.value === 0) {
        this.logger.log(`${next.value}${sup(2)} = ${n} mod ${this.p} = ${y2}`);
      } else {
        this.logger.log(`(±${next.value})${sup(2)} = ${n} mod ${this.p} = ${y2}`);
      }
      // this.logger.log(`${h}`);

    }

    this.logger.log(``);

    this.logger.log(`Найдено корней: ${rootsMap.size}`);

    this.logger.log(``);

    const points: [number, number][] = [[0, 0]];

    const xGen = this.getGenerator(-(last), last);

    let m: number = 0;

    this.logger.log(`Есть ли корни`);

    while (true) {
      const next = xGen.next();
      if (next.done) {
        break;
      }
      const x = next.value;

      const [x3] = new LargePowerModulo(x, 3, this.p).calc();
      const ax = moduloPositive(this.a * x, this.p);

      // const y2 = x ** 3 + this.a * x + this.b;
      const y2 = x3 + ax + this.b;

      const modY2 = moduloPositive(y2, this.p);

      let color: string = '';
      let suffix: string = ``;
      if (rootsMap.has(modY2)) {
        // this.logger.log(`${modY2}`, 'color:green');

        //
        if (modY2 === 0) {
          // точка только одна
          m += 1;
        } else {
          // две точки - ±
          m += 2;
        }

        points.push([x, rootsMap.get(modY2)]);

        // const values = rootsMap.get(modY2);
        // for (let i = 0; i < values.length; i++) {
        //   points.push([x, values[i]]);
        // }

        const r = rootsMap.get(modY2);
        suffix = r ? `[${r}]` : `[бесконечно удаленная точка 0]`;
      } else {
        color = 'color:gray';
        suffix = `[нет точек]`;
      }

      this.logger.log(`y${sup(2)} = x${sup(3)} + a × x + b = ${x}${sup(3)} + ${this.a} × ${x} + ${this.b} = ${x3} + ${ax} + ${this.b} mod ${this.p} = ${y2} mod ${this.p} = ${modY2} ${suffix}`, color);
    }

    this.ecPoints = points.reduce((a, p) => {
      if (p[1] === 0) {
        a.push(new Point(p[0], p[1], a.length + 1));
      } else {
        a.push(new Point(p[0], -p[1], a.length + 1));
        a.push(new Point(p[0], p[1], a.length + 1));
      }
      return a;
    }, []);

    this.logger.log(``);
    this.logger.log(`Точки (${this.ecPoints.length}): `);

    let str: string[] = [];
    this.ecPoints.forEach(p => {
      this.logger.log(`${p.name} ${p}`);
      str.push(p.toString());
    });

    this.logger.log(`E${sub(this.a + ',' + this.b)}(F${sub(this.p)}) = {${str.join(', ')}}`);

    // // same as m
    // let numberOfPoints = 0;
    // for (let i = 0; i < points.length; i++) {
    //   const point = points[i];
    //   if (point[1] === 0) {
    //     this.logger.log(`(${point[0]}, ${point[1]})`);
    //     numberOfPoints++;
    //     continue;
    //   }
    //   numberOfPoints += 2;

    //   this.logger.log(`(${point[0]}, -${point[1]}), (${point[0]}, ${point[1]})`);
    // }

    // todo
    m += 1;
    this.logger.log(`Мощность группы (Количество точек)`);
    // this.logger.log(` Количество точек ${this.E.length}`);

    this.logger.log(`⏐ E${sub(this.a + ',' + this.b)} (F${sub(this.p)}) ⏐ = ${m}`);
    this.logger.log(` `);


    //
    return;
  }



  /**
   * Calculate all subgroups
   */
  calculateAllSubgroups() {
    this.logger.log(` `);
    this.logger.log(`Ищем порядки всех точек`);
    this.subgroups.clear();

    for (const p of this.ecPoints) {
      this.logger.log(`${p.name} ${p}`, `color:gray`);
      const subgroup: Point[] = [];

      let pPrev = p.clone();
      const p1 = p.clone();


      subgroup.push(pPrev);

      for (let i = 2; i <= this.p + 3; i++) {
        const pNext = this.addPoints(p1, pPrev, i, this.logAddingPoints);
        //
        subgroup.push(pNext);
        if (pNext.is0) {
          break;
        }
        pPrev = pNext;
      }

      if (subgroup.length > 1) {
        p.order = subgroup.length;
        this.normalizePoints(subgroup);
        p.subgroup = subgroup;

        this.subgroups.set(p.order, p.subgroup);
      }

      // if (subgroup.length) {
      //  subgroup.push(new Point(0, 0));
      // }

      //.log(`\t${subgroup.length}`);
      this.logger.log(`Порядок: O(${p}) = ${p.order}`, 'color:gray');
      this.logger.log(`H = {${subgroup.join()}}`);
      this.logger.log(` `);

    }
  }


  /**
   * oprint all subgroups
   */
  printSubgroups() {
    this.logger.log(`5) Составить диаграмму, описывающую внутреннее устройство группы`);

    this.subgroups.forEach((value, key) => {
      this.logger.log(`Порядок ${key}, H={${value.join()}}`);
    });
    this.logger.log(` `);
  }

  /**
   * negative shift
   */
  normalizePoints(points: Point[]): Point[] {
    points.forEach((p) => {
      //
      if (p.x > (this.p - 1) / 2) {
        p.x -= this.p;
      }
      if (p.y > (this.p - 1) / 2) {
        p.y -= this.p;
      }
      //
      if (p.x < -((this.p - 1) / 2)) {
        p.x += this.p;
      }
      if (p.y < -((this.p - 1) / 2)) {
        p.y += this.p;
      }
      //
      return p;
    });

    return points;
  }



  /**
   * Get sequence generator
   */
  getGenerator(start: number = 1, end: number = 100): Generator<number> {
    function* func() {
      let index = start;

      while (index <= end) {
        yield index++;
      }
    }
    return func();
  }



  /**
   * P + P
   * 
   */
  addPoints(
    p1: Point,
    p2: Point,
    pointNumber: number = undefined,
    showLogs: boolean = true,
  ): Point {

    const pN = pointNumber ?? 2;

    if (showLogs) this.logger.log(`\n⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤ `);
    if (showLogs) this.logger.log(`Складываем точки ${p1.name} ${p1.toString()} и ${p2.name} ${p2.toString()}.`);

    let p: Point;

    if (p1.is0 && p2.is0) {
      if (showLogs) this.logger.log(`Обе точки равны 0. ${pN}P = 0`);
      return new Point(0, 0);
    }

    if (p1.y === 0 && p2.y === 0 && p1.x === p2.x) {
      //  https://--------.io/kMouGwpC9XYaq6UeoNmeEs
      if (showLogs) this.logger.log(`y равны 0, x равны между собой, значит сложение дает 0. ${pN}P = 0`);
      return new Point(0, 0);
    }

    if (p1.areMutuallyInverse(p2, this.p)) {
      if (showLogs) this.logger.log(`Точки взаимно обратные. ${pN}P = 0`);
      p = new Point(0, 0);
    } else {
      if (p1.equals(p2)) {
        if (showLogs) this.logger.log(`${pN}P = P + P = ?`);
        p = this.calcAsPplusP(p1, p2, showLogs);
      } else {
        if (showLogs) this.logger.log(`P ≠ Q, Q ≠ -P`);
        p = this.calc3P(p1, p2, showLogs);
      }
    }

    if (showLogs) this.logger.log(`Точка, получившаяся при сложении: ${p.name || pN + 'P'} = ${p.toString()}`);
    if (showLogs) this.logger.log(`⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤\n`);

    let scalar: number = undefined;
    if (typeof p1.scalar === 'number' && typeof p2.scalar === 'number') {
      scalar = p1.scalar + p2.scalar;
      p.scalar = scalar;
    }
    return p;
  }




  /**
   * Calc 3P
   * @param p1 
   * @param p2 
   * @returns 
   */
  calc3P(p1: Point, p2: Point, showLogs: boolean = true,): Point {

    if (showLogs) this.logger.log(`x${sub(1)} = ${p1.x}, y${sub(1)} = ${p1.y}, x${sub(2)} = ${p2.x}, y${sub(2)} = ${p2.y}`);
    if (showLogs) this.logger.log(`\n`);

    // calculating x3
    if (showLogs) this.logger.log(`\t ⎛y${sub(2)} - y${sub(1)}⎞${sup(2)}`);
    if (showLogs) this.logger.log(`x${sub(3)} =\t ⎜⎯⎯⎯⎯⎯⎯⎯⎟ - x${sub(1)} - x${sub(2)}`);
    if (showLogs) this.logger.log(`\t ⎝x${sub(2)} - x${sub(1)}⎠`);

    if (showLogs) this.logger.log(`\t ⎛ ${p2.y} - ${p1.y} mod ${this.p} ⎞${sup(2)}`);
    if (showLogs) this.logger.log(`   =\t ⎜⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎟ - ${p1.x} - ${p2.x}`);
    if (showLogs) this.logger.log(`\t ⎝ ${p2.x} - ${p1.x} mod ${this.p} ⎠`);

    // const y2y1 = p2.y - p1.y;
    // const x2x1 = p2.x - p1.x;
    const y2y1 = moduloPositive(p2.y - p1.y, this.p);
    const x2x1 = moduloPositive(p2.x - p1.x, this.p);
    const minusX2x1 = p2.x + p1.x;

    if (showLogs) this.logger.log(`\t ⎛ ${y2y1} ⎞${sup(2)}`);
    if (showLogs) this.logger.log(`   =\t ⎜⎯⎯⎯⎯⎯⎟ - ${minusX2x1}`);
    if (showLogs) this.logger.log(`\t ⎝ ${x2x1} ⎠`);

    const y2y12 = y2y1 ** 2;
    const x2x12 = x2x1 ** 2;

    if (showLogs) this.logger.log(`\t  ${y2y12} mod ${this.p} `);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ - ${minusX2x1}`);
    if (showLogs) this.logger.log(`\t  ${x2x12} mod ${this.p} `);

    // const y2y12mod = moduloPositive(y2y12, this.p);
    // const x2x12mod = moduloPositive(x2x12, this.p);
    const y2y12mod = y2y12;
    const x2x12mod = x2x12;

    if (showLogs) this.logger.log(`\t  ${y2y12mod} `);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯ - ${minusX2x1}`);
    if (showLogs) this.logger.log(`\t  ${x2x12mod} `);

    if (showLogs) this.logger.log(`\t  ${y2y12mod} - ${x2x12mod} * ${minusX2x1}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ `);
    if (showLogs) this.logger.log(`\t        ${x2x12mod} `);

    const toCommonDivisor = x2x12mod * minusX2x1;

    if (showLogs) this.logger.log(`\t  (${y2y12mod} - ${toCommonDivisor}) mod ${this.p}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ `);
    if (showLogs) this.logger.log(`\t     ${x2x12mod} `);

    const dividend = moduloPositive(y2y12mod - toCommonDivisor, this.p);

    if (showLogs) this.logger.log(`\t     ${dividend}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ `);
    if (showLogs) this.logger.log(`\t     ${x2x12mod} `);

    if (x2x12mod === 0) {
      let scalar: number = undefined;
      if (p1.scalar && p2.scalar) {
        scalar = p1.scalar + p2.scalar;
      }
      if (showLogs) this.logger.log(`${scalar ?? ''}P = 0`, 'color:cyan');
      return new Point(0, 0, scalar);
    }
    const [resultX, e] = divideModulo(dividend, x2x12mod, this.p);

    let x3 = resultX;

    // let e = 0;

    // // hard break
    // let counter = 0;

    // let x3 = dividend / x2x12mod;

    // while (!isInt(x3)) {
    //   e += 1;
    //   const newDividend = dividend + this.p * e;
    //   x3 = newDividend / x2x12mod;

    //   // this.logger.log(`${e} ${x3} ${newDividend}`);

    //   if (counter > 1000) {
    //     this.logger.log(`ERROR: the number of interations is too big (calculating x3).`);
    //     break;
    //   }
    // }

    if (e > 1) {
      if (showLogs) this.logger.log(`\t     ${dividend} + ${this.p} × ${e}`);
      if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ `);
      if (showLogs) this.logger.log(`\t     ${x2x12mod} `);

      const p_e = multiplyMod(this.p, e, this.p);
      const d = dividend + p_e;
      if (showLogs) this.logger.log(`\t     ${d}`);
      if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ `);
      if (showLogs) this.logger.log(`\t     ${x2x12mod} `);
    }

    if (showLogs) this.logger.log(`   =\t ${x3}`);
    if (showLogs) this.logger.log(` `);
    if (showLogs) this.logger.log(`x${sub(3)} = ${x3}`, 'color:cyan');
    if (showLogs) this.logger.log(` `);



    // calculating y3

    if (showLogs) this.logger.log(`\t y${sub(2)} - y${sub(1)}`);
    if (showLogs) this.logger.log(`y${sub(3)} =\t ⎯⎯⎯⎯⎯⎯⎯ × (x${sub(1)} - x${sub(3)}) - y${sub(1)}`);
    if (showLogs) this.logger.log(`\t x${sub(2)} - x${sub(1)}`);

    if (showLogs) this.logger.log(`\t ${p2.y} - ${p1.y} mod ${this.p}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ × (${p1.x} - ${x3}) - ${p1.y}`);
    if (showLogs) this.logger.log(`\t ${p2.x} - ${p1.x} mod ${this.p}`);

    // const y2MinusY1 = p2.y - p1.y;
    // const x2MinusX1 = p2.x - p1.x;
    const y2MinusY1 = moduloPositive(p2.y - p1.y, this.p);
    const x2MinusX1 = moduloPositive(p2.x - p1.x, this.p);
    const x1MinusX3 = p1.x - x3;

    if (showLogs) this.logger.log(`\t ${y2MinusY1}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯ × ${x1MinusX3} - ${p1.y}`);
    if (showLogs) this.logger.log(`\t ${x2MinusX1}`);

    if (showLogs) this.logger.log(`\t ${y2MinusY1} × ${x1MinusX3}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯  - ${p1.y}`);
    if (showLogs) this.logger.log(`\t ${x2MinusX1}`);

    const dividendNew = y2MinusY1 * x1MinusX3;

    if (showLogs) this.logger.log(`\t ${dividendNew} mod ${this.p}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯  - ${p1.y}`);
    if (showLogs) this.logger.log(`\t ${x2MinusX1}`);

    const dividendNewMod = moduloPositive(dividendNew, this.p);

    if (showLogs) this.logger.log(`\t ${dividendNewMod}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯  - ${p1.y}`);
    if (showLogs) this.logger.log(`\t ${x2MinusX1}`);

    if (x2x12mod === 0) {
      let scalar: number = undefined;
      if (p1.scalar && p2.scalar) {
        scalar = p1.scalar + p2.scalar;
      }
      if (showLogs) this.logger.log(`${scalar ?? ''}P = 0`, 'color:cyan');
      return new Point(0, 0, scalar);
    }
    const [resultY, eY] = divideModulo(dividendNewMod, x2MinusX1, this.p);

    let y3 = resultY;

    // let eY = 0;

    // // hard break
    // let counterY = 0;

    // let y3 = dividendNewMod / x2MinusX1;

    // while (!isInt(y3)) {
    //   eY += 1;
    //   const newDividend = dividendNewMod + this.p * eY;
    //   y3 = newDividend / x2MinusX1;

    //   // this.logger.log(`${eY} ${y3} ${newDividend}`);

    //   if (counterY > 1000) {
    //     this.logger.log(`ERROR: the number of interations is too big (calculating y3).`);
    //     break;
    //   }
    // }


    if (eY > 1) {
      if (showLogs) this.logger.log(`\t     ${dividendNewMod} + ${this.p} × ${eY}`);
      if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ - ${p1.y}`);
      if (showLogs) this.logger.log(`\t     ${x2MinusX1} `);

      if (eY < 10) {
        const p_eY = multiplyMod(this.p, eY, this.p);
        const d = dividend + p_eY;
        if (showLogs) this.logger.log(`\t     ${d}`);
        if (showLogs) this.logger.log(`   =\ ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ - ${p1.y}`);
        if (showLogs) this.logger.log(`\t     ${x2MinusX1} `);
      }
    }

    if (showLogs) this.logger.log(`   =\t ${y3} - ${p1.y}`);
    y3 -= p1.y;
    y3 = moduloPositive(y3, this.p);

    if (showLogs) this.logger.log(`   =\t ${y3}`);

    if (showLogs) this.logger.log(` `);
    if (showLogs) this.logger.log(`y${sub(3)} = ${y3}`, 'color:cyan');
    if (showLogs) this.logger.log(` `);


    let scalar: number = undefined;
    if (typeof p1.scalar === 'number' && typeof p2.scalar === 'number') {
      scalar = p1.scalar + p2.scalar;
    }
    return new Point(x3, y3, scalar);
  }



  /**
   * Calc as P plus P = 2P
   * @param p1 
   * @param p2 
   * @returns 
   */
  calcAsPplusP(p1: Point, p2: Point, showLogs: boolean = true): Point {

    if (showLogs) this.logger.log(`x${sub(1)} = ${p1.x}, y${sub(1)} = ${p1.y}, x${sub(2)} = ${p2.x}, y${sub(2)} = ${p2.y}`);
    if (showLogs) this.logger.log(`\n`);

    // calculating x3

    if (showLogs) this.logger.log(`\t ⎛3 × x${sub(1)}${sup(2)} + a⎞${sup(2)}`);
    if (showLogs) this.logger.log(`x${sub(3)} =\t ⎜⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎟ - 2 × x${sub(1)}`);
    if (showLogs) this.logger.log(`\t ⎝   2 × y${sub(1)}  ⎠`);

    if (showLogs) this.logger.log(`\t ⎛3 × ${p1.x}${sup(2)} + ${this.a} ⎞${sup(2)}`);
    if (showLogs) this.logger.log(`   =\t ⎜⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎟ - 2 × ${p1.x}`);
    if (showLogs) this.logger.log(`\t ⎝   2 × ${p1.y}   ⎠`);

    const mult2x = 2 * p1.x;

    const [p1x_2] = new LargePowerModulo(p1.x, 2, this.p).calc();
    const p1x_2_3 = multiplyMod(p1x_2, 3, this.p);

    let numerator = p1x_2_3 + this.a;
    // let numerator = 3 * p1.x ** 2 + this.a;
    let denominator = 2 * p1.y;

    if (showLogs) this.logger.log(`\t ⎛ ${numerator} ⎞${sup(2)}`);
    if (showLogs) this.logger.log(`   =\t ⎜⎯⎯⎯⎯⎟ - ${mult2x}`);
    if (showLogs) this.logger.log(`\t ⎝ ${denominator} ⎠`);

    numerator **= 2;
    denominator **= 2;

    if (showLogs) this.logger.log(`\t ⎛ ${numerator} ⎞`);
    if (showLogs) this.logger.log(`   =\t ⎜⎯⎯⎯⎯⎯⎯⎟ - ${mult2x}`);
    if (showLogs) this.logger.log(`\t ⎝ ${denominator}  ⎠`);

    numerator = moduloPositive(numerator, this.p);
    denominator = moduloPositive(denominator, this.p);

    if (showLogs) this.logger.log(`\t ⎛ ${numerator}  ⎞`);
    if (showLogs) this.logger.log(`   =\t ⎜⎯⎯⎯⎯⎯⎟ - ${mult2x}`);
    if (showLogs) this.logger.log(`\t ⎝ ${denominator}  ⎠`);

    // 29-30
    // https://---------.io/n8EhjAf7HfhUtjBx3hj7yA


    if (numerator / denominator !== Math.ceil(numerator / denominator)) {
      const counter = this.findDivisor(numerator, denominator);
      if (showLogs) this.logger.log(`\t ⎛ ${numerator} + ${this.p} × ${counter}  ⎞`);
      if (showLogs) this.logger.log(`   =\t ⎜⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎟ - ${mult2x}`);
      if (showLogs) this.logger.log(`\t ⎝       ${denominator}      ⎠`);

      numerator += this.p * counter;
    }

    if (showLogs) this.logger.log(`\t ⎛ ${numerator}  ⎞`);
    if (showLogs) this.logger.log(`   =\t ⎜⎯⎯⎯⎯⎯⎯⎟ - ${mult2x}`);
    if (showLogs) this.logger.log(`\t ⎝  ${denominator}  ⎠`);

    if (showLogs) this.logger.log(`   =\t ${numerator / denominator} - ${mult2x}`);

    const x3result = numerator / denominator - mult2x;
    // const x3 = moduloPositive(x3result, this.p);
    const [, x3] = modulo2(x3result, this.p);

    if (showLogs) this.logger.log(`   =\t ${x3result} mod ${this.p}`);
    if (showLogs) this.logger.log(`   =\t ${x3}`);

    if (showLogs) this.logger.log(`\n`);

    // calculating y

    if (showLogs) this.logger.log(`\t 3 × x${sub(1)}${sup(2)} + a`);
    if (showLogs) this.logger.log(`y${sub(3)} =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ × ( x${sub(1)} -  x${sub(3)}) - y${sub(1)}`);
    if (showLogs) this.logger.log(`\t    2 × y${sub(1)}  `);

    if (showLogs) this.logger.log(`\t  3 × ${p1.x}${sup(2)} + ${this.a}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ × (${p1.x} -  ${x3}) - ${p1.y}`);
    if (showLogs) this.logger.log(`\t    2 × ${p1.y}   `);

    let [p1x2] = new LargePowerModulo(p1.x, 2, this.p).calc();
    let p1x2_3 = multiplyMod(p1x2, 3, this.p);
    let numeratorY = p1x2_3 + this.a;

    // let numeratorY = 3 * p1.x ** 2 + this.a;
    let denominatorY = 2 * p1.y;
    const x1x3 = p1.x - x3;

    if (showLogs) this.logger.log(`\t    ${numeratorY}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ × (${x1x3}) - ${p1.y}`);
    if (showLogs) this.logger.log(`\t    ${denominatorY}   `);

    numeratorY *= x1x3;

    if (showLogs) this.logger.log(`\t    ${numeratorY}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ - ${p1.y}`);
    if (showLogs) this.logger.log(`\t    ${denominatorY}   `);

    numeratorY = moduloPositive(numeratorY, this.p);

    if (showLogs) this.logger.log(`\t    ${numeratorY}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ - ${p1.y}`);
    if (showLogs) this.logger.log(`\t    ${denominatorY}   `);

    if (numeratorY / denominatorY !== Math.ceil(numeratorY / denominatorY)) {
      const counter = this.findDivisor(numeratorY, denominatorY);
      if (showLogs) this.logger.log(`\t  ${numeratorY} + ${this.p} × ${counter}  `);
      if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ - ${p1.y}`);
      if (showLogs) this.logger.log(`\t        ${denominatorY}      `);

      numeratorY += this.p * counter;
    }


    if (showLogs) this.logger.log(`\t    ${numeratorY}`);
    if (showLogs) this.logger.log(`   =\t ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ - ${p1.y}`);
    if (showLogs) this.logger.log(`\t    ${denominatorY}   `);

    if (showLogs) this.logger.log(`   =\t ${numeratorY / denominatorY} - ${p1.y}`);

    const y3 = moduloPositive(numeratorY / denominatorY - p1.y, this.p);

    if (showLogs) this.logger.log(`   =\t ${y3}`);
    if (showLogs) this.logger.log(`\n`);

    let scalar: number = undefined;
    if (typeof p1.scalar === 'number' && typeof p2.scalar === 'number') {
      scalar = p1.scalar + p2.scalar;

    }
    const p = new Point(x3, y3, scalar);

    return p;
  }


  /**
   * Find 
   */
  findDivisor(n: number, divisor: number): number {

    let result: number = n / divisor;
    let counter: number = 0;
    while (result !== Math.ceil(result)) {
      counter++;
      result = (n + this.p * counter) / divisor;
    }

    return counter;
  }


}
