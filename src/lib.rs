#![feature(iter_array_chunks)]
pub use wasm_bindgen_rayon::init_thread_pool;

mod utils;
mod wasm_vec;

mod i32_add;
mod image_grayscale;
