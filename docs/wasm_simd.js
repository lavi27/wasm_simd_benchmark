let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let WASM_VECTOR_LEN = 0;

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedInt32ArrayMemory0 = null;

function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}
/**
 * @param {Int32Array} a
 * @param {Int32Array} b
 * @returns {Int32Array}
 */
export function i32_add_v0(a, b) {
    const ptr0 = passArray32ToWasm0(a, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray32ToWasm0(b, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.i32_add_v0(ptr0, len0, ptr1, len1);
    var v3 = getArrayI32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v3;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}
/**
 * @param {I32Vec} a
 * @param {I32Vec} b
 * @returns {I32Vec}
 */
export function i32_add_v1(a, b) {
    _assertClass(a, I32Vec);
    _assertClass(b, I32Vec);
    const ret = wasm.i32_add_v1(a.__wbg_ptr, b.__wbg_ptr);
    return I32Vec.__wrap(ret);
}

/**
 * @param {I32Vec} a
 * @param {I32Vec} b
 * @returns {I32Vec}
 */
export function i32_add_v2(a, b) {
    _assertClass(a, I32Vec);
    _assertClass(b, I32Vec);
    const ret = wasm.i32_add_v2(a.__wbg_ptr, b.__wbg_ptr);
    return I32Vec.__wrap(ret);
}

/**
 * @param {I32Vec} a
 * @param {I32Vec} b
 * @returns {I32Vec}
 */
export function i32_add_final(a, b) {
    _assertClass(a, I32Vec);
    _assertClass(b, I32Vec);
    const ret = wasm.i32_add_final(a.__wbg_ptr, b.__wbg_ptr);
    return I32Vec.__wrap(ret);
}

/**
 * @param {U8Vec} data
 * @returns {U8Vec}
 */
export function image_grayscale_v0(data) {
    _assertClass(data, U8Vec);
    const ret = wasm.image_grayscale_v0(data.__wbg_ptr);
    return U8Vec.__wrap(ret);
}

/**
 * @param {U8Vec} data
 * @returns {U8Vec}
 */
export function image_grayscale_v1(data) {
    _assertClass(data, U8Vec);
    const ret = wasm.image_grayscale_v1(data.__wbg_ptr);
    return U8Vec.__wrap(ret);
}

/**
 * @param {U8Vec} data
 * @returns {U8Vec}
 */
export function image_grayscale_v2(data) {
    _assertClass(data, U8Vec);
    const ret = wasm.image_grayscale_v2(data.__wbg_ptr);
    return U8Vec.__wrap(ret);
}

/**
 * @param {U8Vec} data
 * @returns {U8Vec}
 */
export function image_grayscale_v3(data) {
    _assertClass(data, U8Vec);
    const ret = wasm.image_grayscale_v3(data.__wbg_ptr);
    return U8Vec.__wrap(ret);
}

/**
 * @param {U8Vec} data
 * @returns {U8Vec}
 */
export function image_grayscale_final(data) {
    _assertClass(data, U8Vec);
    const ret = wasm.image_grayscale_final(data.__wbg_ptr);
    return U8Vec.__wrap(ret);
}

const I32VecFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_i32vec_free(ptr >>> 0, 1));

export class I32Vec {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(I32Vec.prototype);
        obj.__wbg_ptr = ptr;
        I32VecFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        I32VecFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_i32vec_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.i32vec_new();
        this.__wbg_ptr = ret >>> 0;
        I32VecFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get ptr() {
        const ret = wasm.i32vec_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get len() {
        const ret = wasm.i32vec_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get capacity() {
        const ret = wasm.i32vec_capacity(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    get(index) {
        const ret = wasm.i32vec_get(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * @param {number} index
     * @param {number} val
     */
    set(index, val) {
        wasm.i32vec_set(this.__wbg_ptr, index, val);
    }
    /**
     * @param {number} val
     */
    push(val) {
        wasm.i32vec_push(this.__wbg_ptr, val);
    }
}

const U8VecFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_u8vec_free(ptr >>> 0, 1));

export class U8Vec {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(U8Vec.prototype);
        obj.__wbg_ptr = ptr;
        U8VecFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        U8VecFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_u8vec_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.u8vec_new();
        this.__wbg_ptr = ret >>> 0;
        U8VecFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get ptr() {
        const ret = wasm.i32vec_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get len() {
        const ret = wasm.u8vec_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get capacity() {
        const ret = wasm.i32vec_capacity(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    get(index) {
        const ret = wasm.u8vec_get(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * @param {number} index
     * @param {number} val
     */
    set(index, val) {
        wasm.u8vec_set(this.__wbg_ptr, index, val);
    }
    /**
     * @param {number} val
     */
    push(val) {
        wasm.u8vec_push(this.__wbg_ptr, val);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_0;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('wasm_simd_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync,wasm };
export default __wbg_init;
