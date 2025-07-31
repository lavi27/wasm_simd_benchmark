/* tslint:disable */
/* eslint-disable */
export function i32_add_v0(a: Int32Array, b: Int32Array): Int32Array;
export function i32_add_v1(a: I32Vec, b: I32Vec): I32Vec;
export function i32_add_v2(a: I32Vec, b: I32Vec): I32Vec;
export function i32_add_final(a: I32Vec, b: I32Vec): I32Vec;
export function image_grayscale_v0(data: U8Vec): U8Vec;
export function image_grayscale_v1(data: U8Vec): U8Vec;
export function image_grayscale_v2(data: U8Vec): U8Vec;
export function image_grayscale_v3(data: U8Vec): U8Vec;
export function image_grayscale_final(data: U8Vec): U8Vec;
export class I32Vec {
  free(): void;
  constructor();
  get(index: number): number;
  set(index: number, val: number): void;
  push(val: number): void;
  readonly ptr: number;
  readonly len: number;
  readonly capacity: number;
}
export class U8Vec {
  free(): void;
  constructor();
  get(index: number): number;
  set(index: number, val: number): void;
  push(val: number): void;
  readonly ptr: number;
  readonly len: number;
  readonly capacity: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_i32vec_free: (a: number, b: number) => void;
  readonly i32vec_new: () => number;
  readonly i32vec_ptr: (a: number) => number;
  readonly i32vec_len: (a: number) => number;
  readonly i32vec_capacity: (a: number) => number;
  readonly i32vec_get: (a: number, b: number) => number;
  readonly i32vec_set: (a: number, b: number, c: number) => void;
  readonly i32vec_push: (a: number, b: number) => void;
  readonly __wbg_u8vec_free: (a: number, b: number) => void;
  readonly u8vec_new: () => number;
  readonly u8vec_len: (a: number) => number;
  readonly u8vec_get: (a: number, b: number) => number;
  readonly u8vec_set: (a: number, b: number, c: number) => void;
  readonly u8vec_push: (a: number, b: number) => void;
  readonly i32_add_v0: (a: number, b: number, c: number, d: number) => [number, number];
  readonly i32_add_v1: (a: number, b: number) => number;
  readonly i32_add_v2: (a: number, b: number) => number;
  readonly i32_add_final: (a: number, b: number) => number;
  readonly image_grayscale_v0: (a: number) => number;
  readonly image_grayscale_v1: (a: number) => number;
  readonly image_grayscale_v2: (a: number) => number;
  readonly image_grayscale_v3: (a: number) => number;
  readonly image_grayscale_final: (a: number) => number;
  readonly u8vec_ptr: (a: number) => number;
  readonly u8vec_capacity: (a: number) => number;
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
