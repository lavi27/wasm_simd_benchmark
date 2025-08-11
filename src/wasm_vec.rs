use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct I32Vec {
    #[wasm_bindgen(skip)]
    pub vec: Vec<i32>,
}

#[wasm_bindgen]
impl I32Vec {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self::from_vec(Vec::new())
    }

    #[wasm_bindgen(getter)]
    pub fn ptr(&self) -> *const i32 {
        self.vec.as_ptr()
    }

    #[wasm_bindgen(getter)]
    pub fn len(&self) -> usize {
        self.vec.len()
    }

    #[wasm_bindgen(getter)]
    pub fn capacity(&self) -> usize {
        self.vec.capacity()
    }

    pub fn get(&self, index: usize) -> i32 {
        self.vec[index]
    }

    pub fn set(&mut self, index: usize, val: i32) {
        self.vec[index] = val;
    }

    pub fn push(&mut self, val: i32) {
        self.vec.push(val);
    }
}

impl I32Vec {
    pub fn from_vec(vec: Vec<i32>) -> Self {
        Self { vec }
    }
}

impl Drop for I32Vec {
    fn drop(&mut self) {
        self.vec.clear();
        self.vec.shrink_to_fit();
    }
}

#[wasm_bindgen]
pub struct U8Vec {
    #[wasm_bindgen(skip)]
    pub vec: Vec<u8>,
}

#[wasm_bindgen]
impl U8Vec {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self::from_vec(Vec::new())
    }

    #[wasm_bindgen(getter)]
    pub fn ptr(&self) -> *const u8 {
        self.vec.as_ptr()
    }

    #[wasm_bindgen(getter)]
    pub fn len(&self) -> usize {
        self.vec.len()
    }

    #[wasm_bindgen(getter)]
    pub fn capacity(&self) -> usize {
        self.vec.capacity()
    }

    pub fn get(&self, index: usize) -> u8 {
        self.vec[index]
    }

    pub fn set(&mut self, index: usize, val: u8) {
        self.vec[index] = val;
    }

    pub fn push(&mut self, val: u8) {
        self.vec.push(val);
    }
}

impl U8Vec {
    pub fn from_vec(vec: Vec<u8>) -> Self {
        Self { vec }
    }
}

impl Drop for U8Vec {
    fn drop(&mut self) {
        self.vec.clear();
        self.vec.shrink_to_fit();
    }
}
