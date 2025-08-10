use core::arch::wasm32::*;
use std::{iter::StepBy, ops::Range};

pub fn i32_vec_wrap(data: &[i32]) -> Vec<v128> {
    let len = data.len() / 4;
    let mut res: Vec<v128> = Vec::with_capacity(len);
    let ptr = data.as_ptr();

    for i in (0..len).step_by(4) {
        unsafe {
            res.push(i32x4(
                *ptr.add(i),
                *ptr.add(i + 1),
                *ptr.add(i + 2),
                *ptr.add(i + 3),
            ));
        }
    }

    res
}

pub fn i32_vec_2_wrap(a: &[i32], b: &[i32]) -> Vec<v128> {
    let arr_len = a.len().min(b.len());
    let mut res = Vec::with_capacity(arr_len / 2);

    let ptr_a = a.as_ptr();
    let ptr_b = b.as_ptr();

    for i in (0..(arr_len - 3)).step_by(4) {
        unsafe {
            res.push(i32x4(
                *ptr_a.add(i),
                *ptr_a.add(i + 1),
                *ptr_a.add(i + 2),
                *ptr_a.add(i + 3),
            ));
            res.push(i32x4(
                *ptr_b.add(i),
                *ptr_b.add(i + 1),
                *ptr_b.add(i + 2),
                *ptr_b.add(i + 3),
            ));
        }
    }

    res
}

pub fn i32_vec_unwrap(vecs: Vec<v128>) -> Vec<i32> {
    let len = vecs.len() * 4;
    let cap = vecs.capacity() * 4;
    let ptr = vecs.as_ptr() as *mut i32;

    std::mem::forget(vecs);

    unsafe { Vec::from_raw_parts(ptr, len, cap) }
}

pub fn f32_vec_wrap(data: &[f32]) -> Vec<v128> {
    let len = data.len() / 4;
    let mut res: Vec<v128> = Vec::with_capacity(len);
    let ptr = data.as_ptr();

    for i in (0..len).step_by(4) {
        unsafe {
            res.push(f32x4(
                *ptr.add(i),
                *ptr.add(i + 1),
                *ptr.add(i + 2),
                *ptr.add(i + 3),
            ));
        }
    }

    res
}

pub fn f32x4_convert_u8(a0: u8, a1: u8, a2: u8, a3: u8) -> v128 {
    unsafe {
        let res = u8x16(a0, a1, a2, a3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        let res = u16x8_extend_low_u8x16(res);
        let res = u32x4_extend_low_u16x8(res);
        let res = f32x4_convert_u32x4(res);

        res
    }
}

pub fn u8x4_convert_f32x4(vec: v128) -> v128 {
    unsafe {
        let res = i32x4_trunc_sat_f32x4(vec);
        let res = i16x8_narrow_i32x4(res, i32x4_splat(0));
        let res = u8x16_narrow_i16x8(res, i16x8_splat(0));

        res
    }
}

pub fn f32x4_convert_u8_byte_align(a0: u8, a1: u8, a2: u8, a3: u8) -> v128 {
    unsafe {
        let res = u8x16(a0, 0, 0, 0, a1, 0, 0, 0, a2, 0, 0, 0, a3, 0, 0, 0);
        let res = f32x4_convert_u32x4(res);
        res
    }
}

pub fn u8x4_convert_f32x4_shuffle(vec: v128) -> v128 {
    unsafe {
        let res = i32x4_trunc_sat_f32x4(vec);
        let res = u8x16_shuffle::<0, 4, 8, 12, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16>(
            res,
            u8x16_splat(0),
        );

        res
    }
}

pub fn u16x8_extend_u8(a0: u8, a1: u8, a2: u8, a3: u8, a4: u8, a5: u8, a6: u8, a7: u8) -> v128 {
    unsafe { u8x16(a0, 0, a1, 0, a2, 0, a3, 0, a4, 0, a5, 0, a6, 0, a7, 0) }
}

pub fn step_chunks(range: Range<usize>, chunk_size: usize) -> StepBy<Range<usize>> {
    (range.start..(range.end - chunk_size + 1)).step_by(chunk_size)
}
