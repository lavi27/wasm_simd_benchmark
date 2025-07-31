import init, * as wasm from "./wasm_simd.js";

const I32AddRepeatCount = 100000000;
const GrayscaleRepeatCount = 30000000;
const TrialCount = 10;

let MainEl;

function printMain(str) {
  return new Promise((resolve) => {
    MainEl.value += str + "\n";

    setTimeout(resolve, 0);
  })
}



window.onload = () => {
  MainEl = document.getElementsByTagName("textarea")[0];
}

window.btnClick = test;

async function test() {
  await printMain("[i32 add wasm]");
  await printMain("v0:");
  await i32AddWasm_v0();
  await printMain("v1:");
  await i32AddWasm_v1();
  await printMain("v2:");
  await i32AddWasm_v2();
  await printMain("final:");
  await i32AddWasm_final();

  await printMain("[i32 add js]");
  i32AddJs();

  await printMain("[image grayscale wasm]");
  await printMain("v0:");
  await grayscaleWasm_v0();
  await printMain("v1:");
  await grayscaleWasm_v1();
  await printMain("v2:");
  await grayscaleWasm_v2();
  await printMain("v3:");
  await grayscaleWasm_v3();
  await printMain("final:");
  await grayscaleWasm_final();

  await printMain("[image grayscale js]");
  grayscaleJs();
}

function printResults(results) {
  let sum = 0;
  let mean = 0;
  let stdDeviation = 0;

  for (const item of results) {
    sum += item;
  }
  mean = sum / results.length;

  let tmp0 = 0;
  for (const item of results) {
    tmp0 += (item - mean) ** 2;
  }
  stdDeviation = Math.sqrt(tmp0 / (results.length-1));

  results.shift();
  sum = 0;
  let meanWOFirst = 0;
  let stdDeviationWOFirst = 0;

  for (const item of results) {
    sum += item;
  }
  meanWOFirst = sum / results.length;

  tmp0 = 0;
  for (const item of results) {
    tmp0 += (item - mean) ** 2;
  }
  stdDeviationWOFirst = Math.sqrt(tmp0 / (results.length-1));

  printMain(
`시행 횟수: ${results.length + 1}
평균: ${Math.round(mean * 1000) / 1000}ms
표준편차: ${Math.round(stdDeviation * 1000) / 1000}ms
첫번째 제외 평균: ${Math.round(meanWOFirst * 1000) / 1000}ms
첫번째 제외 표준편차: ${Math.round(stdDeviationWOFirst * 1000) / 1000}ms`
  );
}

async function i32AddWasm_v0() {
  await init();
  
  let arr1 = Int32Array.from({length: I32AddRepeatCount}, (_, i) => i);
  let arr2 = Int32Array.from({length: I32AddRepeatCount}, (_, i) => i);

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    const res = wasm.i32_add_v0(arr1, arr2);
    const end = performance.now();

    results.push(end - start);
  }

  printResults(results);
}

async function i32AddWasm_v1() {
  await init();
  
  let arr1 = new wasm.I32Vec();
  let arr2 = new wasm.I32Vec();
  for (let i = 0; i < I32AddRepeatCount; i++) {
    arr1.push(i);
    arr2.push(i);
  }

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    const res = wasm.i32_add_v1(arr1, arr2);
    const end = performance.now();

    results.push(end - start);

    res.free();
  }

  arr1.free();
  arr2.free();

  printResults(results);
}

async function i32AddWasm_v2() {
  await init();
  
  let arr1 = new wasm.I32Vec();
  let arr2 = new wasm.I32Vec();

  for (let i = 0; i < I32AddRepeatCount; i++) {
    arr1.push(i);
    arr2.push(i);
  }

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    const res = wasm.i32_add_v2(arr1, arr2);
    const end = performance.now();

    results.push(end - start);

    res.free();
  }

  arr1.free();
  arr2.free();

  printResults(results);
}

async function i32AddWasm_final() {
  await init();
  
  let arr1 = new wasm.I32Vec();
  let arr2 = new wasm.I32Vec();
  for (let i = 0; i < I32AddRepeatCount; i++) {
    arr1.push(i);
    arr2.push(i);
  }

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    const res = wasm.i32_add_final(arr1, arr2);
    const end = performance.now();

    results.push(end - start);

    res.free();
  }

  arr1.free();
  arr2.free();

  printResults(results);
}

async function i32AddWasm_v4() {
  await init();
  
  let arr1 = new wasm.I32Vec();
  let arr2 = new wasm.I32Vec();
  for (let i = 0; i < I32AddRepeatCount; i++) {
    arr1.push(i);
    arr2.push(i);
  }

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    const res = wasm.i32_add_v4(arr1, arr2);
    const end = performance.now();

    results.push(end - start);

    res.free();
  }

  arr1.free();
  arr2.free();

  printResults(results);
}

function i32AddJs() {
  let arr1 = Int32Array.from({length: I32AddRepeatCount}, (_, i) => i);
  let arr2 = Int32Array.from({length: I32AddRepeatCount}, (_, i) => i);
  let res = new Int32Array(I32AddRepeatCount);

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    for (let i=0; i<I32AddRepeatCount; i++) {
      res[i] = arr1[i] + arr2[i];
    }
    const end = performance.now();

    results.push(end-start);
  }

  printResults(results);
}

async function grayscaleWasm_v0() {
  await init();
  
  let arr1 = new wasm.U8Vec();
  for (let i = 0; i < GrayscaleRepeatCount; i++) {
    arr1.push(i % 255);
  }

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    const res = wasm.image_grayscale_v0(arr1);
    const end = performance.now();

    results.push(end-start);

    res.free();
  }

  arr1.free();

  printResults(results);
}

async function grayscaleWasm_v1() {
  await init();
  
  let arr1 = new wasm.U8Vec();
  for (let i = 0; i < GrayscaleRepeatCount; i++) {
    arr1.push(i % 255);
  }

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    const res = wasm.image_grayscale_v1(arr1);
    const end = performance.now();

    results.push(end-start);

    res.free();
  }

  arr1.free();

  printResults(results);
}

async function grayscaleWasm_v2() {
  await init();
  
  let arr1 = new wasm.U8Vec();
  for (let i = 0; i < GrayscaleRepeatCount; i++) {
    arr1.push(i % 255);
  }

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    const res = wasm.image_grayscale_v2(arr1);
    const end = performance.now();

    results.push(end-start);

    res.free();
  }

  arr1.free();

  printResults(results);
}

async function grayscaleWasm_v3() {
  await init();
  
  let arr1 = new wasm.U8Vec();
  for (let i = 0; i < GrayscaleRepeatCount; i++) {
    arr1.push(i % 255);
  }

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    const res = wasm.image_grayscale_v3(arr1);
    const end = performance.now();

    results.push(end-start);

    res.free();
  }

  arr1.free();

  printResults(results);
}

async function grayscaleWasm_final() {
  await init();
  
  let arr1 = new wasm.U8Vec();
  for (let i = 0; i < GrayscaleRepeatCount; i++) {
    arr1.push(i % 255);
  }

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    const res = wasm.image_grayscale_final(arr1);
    const end = performance.now();

    results.push(end-start);

    res.free();
  }

  arr1.free();  

  printResults(results);
}

function grayscaleJs() {
  let arr1 = Uint8Array.from({length: GrayscaleRepeatCount}, (_, i) => i %255);
  let res = new Uint8Array(GrayscaleRepeatCount / 3);

  let results = [];

  for (let i = 0; i<TrialCount; i++) {
    const start = performance.now();
    for (let i=0; i<GrayscaleRepeatCount; i+=3) {
      res[i] = (arr1[i] * 55 + arr1[i+1] *183 + arr1[i+2] *18) >> 8;
    }
    const end = performance.now();

    results.push(end-start);
  }

  printResults(results);
}
