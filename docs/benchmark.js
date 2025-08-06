function getAvg(items) {
    let sum = 0;

    for (const item of items) {
      sum += item;
    }

    return sum / items.length;
}

function getStdDiv(items) {
    const avg = getAvg(items);

    let tmp0 = 0;
    for (const item of items) {
      tmp0 += (item - avg) ** 2;
    }

    return Math.sqrt(tmp0 / (items.length-1));
}

function roundBy(num, digit) {
  return Math.round(num * (10 ** digit)) / (10 ** digit);
}

export class Benchmark {
  prevResults = [];
  #initFn;
  #mainFn;
  #settings;

  /**
   * @param {string} name 
   * @param {(args: Object) => any} initFn  
   * @param {(initRet: any) => any} mainFn 
   * @param {{testOptions: {initArgs: Object, iter: number | undefined}[]} | undefined} settings  
   */
  constructor(name, initFn, mainFn, settings) {
    this.name = name;
    this.#initFn = initFn;
    this.#mainFn = mainFn;
    this.#settings = settings;
  }

  run() {
    const result = [];

    console.log(`test '${this.name}' is running...`)

    for (const opt of this.#settings.testOptions) {
      const initRet = this.#initFn(opt.initArgs);

      let times = [];
      let memorys = [];

      for (let i=0; i<opt.iter ?? 1; i++) {
        const startTime = performance.now();
        const startMemory = performance.memory.usedJSHeapSize;

        this.#mainFn(initRet);

        const endTime = performance.now();
        const endMemory = performance.memory.usedJSHeapSize;

        times.push(endTime - startTime);
        memorys.push(endMemory - startMemory);
      }

      result.push({
        name: this.name,
        option: opt,
        timeAvg: roundBy(getAvg(times), 3),
        timeStdDiv: roundBy(getStdDiv(times), 3),
        memoryAvg: roundBy(getAvg(memorys), 3),
        memoryStdDiv: roundBy(getStdDiv(memorys), 3)
      });
    }

    console.log(`test '${this.name}' end`)

    this.prevResults.push(result);
    return result;
  }
}