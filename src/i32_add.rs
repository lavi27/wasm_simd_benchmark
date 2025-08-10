use core::arch::wasm32::*;
use rayon::current_num_threads;
use rayon::iter::IntoParallelIterator;
use rayon::iter::ParallelIterator;
use std::sync::atomic::AtomicPtr;
use std::sync::atomic::Ordering;
use wasm_bindgen::prelude::*;

use crate::utils::*;
use crate::wasm_vec::*;

#[wasm_bindgen]
pub fn i32_add_v0(a: Vec<i32>, b: Vec<i32>) -> Vec<i32> {
    assert!(a.len() == b.len());

    let mut res: Vec<i32> = Vec::with_capacity(a.len());

    unsafe {
        for i in (0..a.len()).step_by(4) {
            let vec_a = i32x4(a[i], a[i + 1], a[i + 2], a[i + 3]);
            let vec_b = i32x4(b[i], b[i + 1], b[i + 2], b[i + 3]);

            let vec_res = i32x4_add(vec_a, vec_b);

            res.extend_from_slice(&[
                i32x4_extract_lane::<0>(vec_res),
                i32x4_extract_lane::<1>(vec_res),
                i32x4_extract_lane::<2>(vec_res),
                i32x4_extract_lane::<3>(vec_res),
            ]);
        }
    }

    for i in res.len()..a.len() {
        res.push(a[i] + b[i]);
    }

    res
}

#[wasm_bindgen]
pub fn i32_add_v1(a: &I32Vec, b: &I32Vec) -> I32Vec {
    assert!(a.len() == b.len());

    let a = &a.vec;
    let b = &b.vec;
    let mut res: Vec<i32> = Vec::with_capacity(a.len());

    unsafe {
        for i in (0..a.len()).step_by(4) {
            let vec_a = i32x4(a[i], a[i + 1], a[i + 2], a[i + 3]);
            let vec_b = i32x4(b[i], b[i + 1], b[i + 2], b[i + 3]);

            let vec_res = i32x4_add(vec_a, vec_b);

            res.extend_from_slice(&[
                i32x4_extract_lane::<0>(vec_res),
                i32x4_extract_lane::<1>(vec_res),
                i32x4_extract_lane::<2>(vec_res),
                i32x4_extract_lane::<3>(vec_res),
            ]);
        }
    }

    for i in res.len()..a.len() {
        res.push(a[i] + b[i]);
    }

    I32Vec::from_vec(res)
}

#[wasm_bindgen]
pub fn i32_add_v2(a: &I32Vec, b: &I32Vec) -> I32Vec {
    assert!(a.len() == b.len());

    let a = &a.vec;
    let b = &b.vec;
    let mut res: Vec<i32> = Vec::with_capacity(a.len());

    unsafe {
        let vecs = i32_vec_2_wrap(a, b);

        for i in (0..vecs.len()).step_by(2) {
            let vec_res = i32x4_add(vecs[i], vecs[i + 1]);

            res.extend_from_slice(&[
                i32x4_extract_lane::<0>(vec_res),
                i32x4_extract_lane::<1>(vec_res),
                i32x4_extract_lane::<2>(vec_res),
                i32x4_extract_lane::<3>(vec_res),
            ]);
        }
    }

    for i in res.len()..a.len() {
        res.push(a[i] + b[i]);
    }

    I32Vec::from_vec(res)
}

#[wasm_bindgen]
pub fn i32_add_v3(a: &I32Vec, b: &I32Vec) -> I32Vec {
    assert!(a.len() == b.len());

    let a = &a.vec;
    let b = &b.vec;
    let mut res: Vec<i32> = Vec::with_capacity(a.len());
    unsafe { res.set_len(a.len()) }

    let v128_range = a.len() / 4;
    let remainder_idx = v128_range * 4;

    unsafe {
        let a_ptr = a.as_ptr() as *const v128;
        let b_ptr = b.as_ptr() as *const v128;
        let res_ptr = res.as_mut_ptr() as *mut v128;

        for i in 0..v128_range {
            let vec_a = v128_load(a_ptr.add(i));
            let vec_b = v128_load(b_ptr.add(i));

            let vec_res = i32x4_add(vec_a, vec_b);
            v128_store(res_ptr.add(i), vec_res);
        }
    }

    for i in remainder_idx..a.len() {
        res[i] = a[i] + b[i];
    }

    I32Vec::from_vec(res)
}

#[wasm_bindgen]
pub fn i32_add_final(a: &I32Vec, b: &I32Vec) -> I32Vec {
    assert!(a.len() == b.len());

    let a = &a.vec;
    let b = &b.vec;
    let mut res: Vec<i32> = Vec::with_capacity(a.len());
    unsafe { res.set_len(a.len()) };

    let thread_cnt = current_num_threads();
    let thr_v128_size = a.len() / thread_cnt / 4;
    let remainder_idx = thr_v128_size * 4 * thread_cnt - 1;

    let a_ptr = AtomicPtr::new(a.as_ptr() as *mut i32);
    let b_ptr = AtomicPtr::new(b.as_ptr() as *mut i32);
    let res_ptr = AtomicPtr::new(res.as_mut_ptr());

    (0..thread_cnt).into_par_iter().for_each(|thr_id| unsafe {
        let start = thr_id * thr_v128_size;
        let end = start + thr_v128_size;
        let a_ptr = a_ptr.load(Ordering::Relaxed) as *const v128;
        let b_ptr = b_ptr.load(Ordering::Relaxed) as *const v128;
        let res_ptr = res_ptr.load(Ordering::Relaxed) as *mut v128;

        for i in start..end {
            let vec_a = v128_load(a_ptr.add(i));
            let vec_b = v128_load(b_ptr.add(i));

            let vec_res = i32x4_add(vec_a, vec_b);
            v128_store(res_ptr.add(i), vec_res);
        }
    });

    for i in remainder_idx..a.len() {
        res[i] = a[i] + b[i];
    }

    I32Vec::from_vec(res)
}
