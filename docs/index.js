import init, * as wasm from "./wasm_simd.js";
import { Benchmark } from "./benchmark.js";
import { wait } from "./utils.js";

const I32AddTestSettings = {
  testOptions: [
    {initArgs: {size: 100000}, iter: 100},
    {initArgs: {size: 1000000}, iter: 50},
    {initArgs: {size: 10000000}, iter: 20},
    {initArgs: {size: 100000000}, iter: 10},
  ]
};

const I32AddWasmV0Test = new Benchmark('I32Add Wasm V0',
  ({size}) => {
    const arr1 = Int32Array.from({length: size}, (_, i) => i);
    const arr2 = Int32Array.from({length: size}, (_, i) => i);

    return {args: {arr1, arr2}};
  },
  ({arr1, arr2}) => {
    wasm.i32_add_v0(arr1, arr2);
  }, I32AddTestSettings);

function I32AddWasmInit({size}) {
  const arr1 = new wasm.I32Vec();
  const arr2 = new wasm.I32Vec();
  for (let i = 0; i < size; i++) {
    arr1.push(i);
    arr2.push(i);
  }

  return {
    args: {arr1, arr2},
    cleanupFn: () => {arr1.free(); arr2.free();}
  };
} 

const I32AddWasmV1Test = new Benchmark('I32Add Wasm V1',
  I32AddWasmInit,
  ({arr1, arr2}) => {
    const res = wasm.i32_add_v1(arr1, arr2);
    return () => {res.free()};
  }, I32AddTestSettings);

const I32AddWasmV2Test = new Benchmark('I32Add Wasm V2',
  I32AddWasmInit,
  ({arr1, arr2}) => {
    const res = wasm.i32_add_v2(arr1, arr2);
    return () => {res.free()};
  }, I32AddTestSettings);

const I32AddWasmV3Test = new Benchmark('I32Add Wasm V3',
  I32AddWasmInit,
  ({arr1, arr2}) => {
    const res = wasm.i32_add_v3(arr1, arr2);
    return () => {res.free()};
  }, I32AddTestSettings);

const I32AddWasmFinalTest = new Benchmark('I32Add Wasm Final',
  I32AddWasmInit,
  ({arr1, arr2}) => {
    const res = wasm.i32_add_final(arr1, arr2);
    return () => {res.free()};
  }, I32AddTestSettings);

const I32AddJSTest = new Benchmark('I32Add JS',
  ({size}) => {
    let arr1 = Int32Array.from({length: size}, (_, i) => i);
    let arr2 = Int32Array.from({length: size}, (_, i) => i);

    return {args: {arr1, arr2}}
  },
  ({arr1, arr2}) => {
    let res = new Int32Array(arr1.length);

    for (let i=0; i<arr1.length; i++) {
      res[i] = arr1[i] + arr2[i];
    }
  }, I32AddTestSettings);

const GrayscaleTestSettings = {
  testOptions: [
    {initArgs: {size: 100000}, iter: 100},
    {initArgs: {size: 1000000}, iter: 30},
    {initArgs: {size: 10000000}, iter: 10},
    {initArgs: {size: 100000000}, iter: 5},
  ]
};

function grayscaleWasmInit({size}) {
  let arr = new wasm.U8Vec();
  for (let i = 0; i < size * 3; i++) {
    arr.push(i % 255);
  }

  return {
    args: arr,
    cleanupFn: () => {arr.free()}
  }
}

const GrayscaleWasmV0Test = new Benchmark('Grayscale Wasm V0',
  grayscaleWasmInit,
  (arr) => {
    const res = wasm.image_grayscale_v0(arr);
    return () => {res.free()};
  }, GrayscaleTestSettings);

const GrayscaleWasmV1Test = new Benchmark('Grayscale Wasm V1',
  grayscaleWasmInit,
  (arr) => {
    const res = wasm.image_grayscale_v1(arr);
    return () => {res.free()};
  }, GrayscaleTestSettings);

const GrayscaleWasmV2Test = new Benchmark('Grayscale Wasm V2',
  grayscaleWasmInit,
  (arr) => {
    const res = wasm.image_grayscale_v2(arr);
    return () => {res.free()};
  }, GrayscaleTestSettings);

const GrayscaleWasmV3Test = new Benchmark('Grayscale Wasm V3',
  grayscaleWasmInit,
  (arr) => {
    const res = wasm.image_grayscale_v3(arr);
    return () => {res.free()};
  }, GrayscaleTestSettings);

const GrayscaleWasmV4Test = new Benchmark('Grayscale Wasm V4',
  grayscaleWasmInit,
  (arr) => {
    const res = wasm.image_grayscale_v4(arr);
    return () => {res.free()};
  }, GrayscaleTestSettings);

const GrayscaleWasmFinalTest = new Benchmark('Grayscale Wasm Final',
  grayscaleWasmInit,
  (arr) => {
    const res = wasm.image_grayscale_final(arr);
    return () => {res.free()};
  }, GrayscaleTestSettings);

const GrayscaleJSTest = new Benchmark('Grayscale JS',
  ({size}) => {
    let arr = Uint8Array.from({length: size * 3}, (_, i) => i %255);

    return {args: arr}
  },
  (arr) => {
    let res = new Uint8Array(arr.length / 3);

    for (let i=0; i<arr.length; i+=3) {
      res[i] = (arr[i] * 55 + arr[i+1] *183 + arr[i+2] *18) >> 8;
    }
  }, GrayscaleTestSettings);

let MainEl;

const ColorScheme = [
  '#cc3333', // 빨강 (hsl(0,70%,50%))
  '#cc8833', // 주황 (hsl(30,70%,50%))
  '#cccc33', // 노랑 (hsl(60,70%,50%))
  '#33cc33', // 초록 (hsl(120,70%,50%))
  '#3333cc', // 파랑 (hsl(240,70%,50%))
  '#cc3333', // 빨강 (hsl(0,70%,50%))
  '#cc8833', // 주황 (hsl(30,70%,50%))
  '#cccc33', // 노랑 (hsl(60,70%,50%))
  '#33cc33', // 초록 (hsl(120,70%,50%))
  '#3333cc', // 파랑 (hsl(240,70%,50%))
  '#6633cc'  // 보라 (hsl(270,70%,50%))
];

let colorCounter = 0;


async function printMain(item) {
  const itemName = item[0].name;
  let resStr = itemName;
  resStr += "\ncondition | time(ms)\n"
  resStr += "-------------------------\n";

  for (const i of item) {
    resStr += `size:${i.option.initArgs.size} iter:${i.option.iter}`;
    resStr += "  "
    resStr += `${i.timeAvg}(±${i.timeStdDiv})`;
    resStr += "\n"
  }

  MainEl.value += resStr + "\n";

  const borderColor = ColorScheme[colorCounter++];

  if (itemName.includes('I32Add')) {
    window.chart1.data.datasets.push({
      label: item[0].name.substring(7),
      data: item.map(i => i.timeAvg),
      borderColor,
    });
    window.chart1.update();
  } else {
    window.chart2.data.datasets.push({
      label: item[0].name.substring(10),
      data: item.map(i => i.timeAvg),
      borderColor,
    });
    window.chart2.update();
  }

  await wait(100);
}

window.onload = async () => {
  await init();
  // await wasm.initThreadPool(navigator.hardwareConcurrency);

  MainEl = document.getElementsByTagName("textarea")[0];
  const chart1El = document.getElementById('myChart1');
  const chart2El = document.getElementById('myChart2');

  const options = {
    animation: {
      duration: 0,
    },
    scales: {
      y: {
        type: 'logarithmic'
      }
    },
    maintainAspectRatio: false,
  };

  window.chart1 = new Chart(chart1El, {
    type: 'line',
    data: {
      labels: I32AddTestSettings.testOptions.map(i => `size:${i.initArgs.size} iter:${i.iter}`),
      datasets: []
    },
    options,
  });

  window.chart2 = new Chart(chart2El, {
    type: 'line',
    data: {
      labels: GrayscaleTestSettings.testOptions.map(i => `size:${i.initArgs.size} iter:${i.iter}`),
      datasets: []
    },
    options
  });
}

window.btnClick = test;

async function test() {
  await printMain(await I32AddWasmV0Test.run());
  await printMain(await I32AddWasmV1Test.run());
  await printMain(await I32AddWasmV2Test.run());
  await printMain(await I32AddWasmV3Test.run());
  // await printMain(I32AddWasmFinalTest.run());
  await printMain(await I32AddJSTest.run());

  await printMain(await GrayscaleWasmV0Test.run());
  await printMain(await GrayscaleWasmV1Test.run());
  await printMain(await GrayscaleWasmV2Test.run());
  await printMain(await GrayscaleWasmV3Test.run());
  await printMain(await GrayscaleWasmV4Test.run());
  // await printMain(GrayscaleWasmFinalTest.run());
  await printMain(await GrayscaleJSTest.run());
}