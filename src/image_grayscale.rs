use core::arch::wasm32::*;
use wasm_bindgen::prelude::*;

use crate::{utils::*, wasm_vec::*};

#[wasm_bindgen]
pub fn image_grayscale_v0(data: &U8Vec) -> U8Vec {
    let mut res: Vec<u8> = Vec::with_capacity(data.len() / 3);
    let data = &data.vec;

    unsafe {
        let res_ptr = res.as_mut_ptr();
        let mut res_len = 0;

        for i in (0..data.len()).step_by(4 * 3) {
            let r_vec = f32x4_convert_u8(data[i], data[i + 3], data[i + 6], data[i + 9]);
            let g_vec = f32x4_convert_u8(data[i + 1], data[i + 4], data[i + 7], data[i + 10]);
            let b_vec = f32x4_convert_u8(data[i + 2], data[i + 5], data[i + 8], data[i + 11]);

            let r_vec = f32x4_mul(r_vec, f32x4_splat(0.2126));
            let g_vec = f32x4_mul(g_vec, f32x4_splat(0.7152));
            let vec_res = f32x4_add(r_vec, g_vec);
            let b_vec = f32x4_mul(b_vec, f32x4_splat(0.0722));
            let vec_res = f32x4_add(vec_res, b_vec);

            let vec_res = u8x4_convert_f32x4(vec_res);

            v128_store32_lane::<0>(vec_res, res_ptr.add(res_len) as *mut u32);
            res_len += 4;
        }

        res.set_len(res_len);
    }

    for i in ((res.len() * 3)..data.len()).step_by(3) {
        let item_res = (data[i] as f32 * 0.2126)
            + (data[i + 1] as f32 * 0.7152)
            + (data[i + 2] as f32 * 0.0722);

        res.push(item_res as u8);
    }

    U8Vec::from_vec(res)
}

#[wasm_bindgen]
pub fn image_grayscale_v1(data: &U8Vec) -> U8Vec {
    let mut res: Vec<u8> = Vec::with_capacity(data.len() / 3);
    let data = &data.vec;

    unsafe {
        let res_ptr = res.as_mut_ptr();
        let mut res_len = 0;

        for i in (0..data.len()).step_by(4 * 3) {
            let r_vec = f32x4_convert_u8_byte_align(data[i], data[i + 3], data[i + 6], data[i + 9]);
            let g_vec =
                f32x4_convert_u8_byte_align(data[i + 1], data[i + 4], data[i + 7], data[i + 10]);
            let b_vec =
                f32x4_convert_u8_byte_align(data[i + 2], data[i + 5], data[i + 8], data[i + 11]);

            let r_vec = f32x4_mul(r_vec, f32x4_splat(0.2126));
            let g_vec = f32x4_mul(g_vec, f32x4_splat(0.7152));
            let vec_res = f32x4_add(r_vec, g_vec);
            let b_vec = f32x4_mul(b_vec, f32x4_splat(0.0722));
            let vec_res = f32x4_add(vec_res, b_vec);

            let vec_res = u8x4_convert_f32x4_shuffle(vec_res);

            v128_store32_lane::<0>(vec_res, res_ptr.add(res_len) as *mut u32);
            res_len += 4;
        }

        res.set_len(res_len);
    }

    for i in ((res.len() * 3)..data.len()).step_by(3) {
        let item_res = (data[i] as f32 * 0.2126)
            + (data[i + 1] as f32 * 0.7152)
            + (data[i + 2] as f32 * 0.0722);

        res.push(item_res as u8);
    }

    U8Vec::from_vec(res)
}

const GRAYSCALE_R: [f32; 256] = {
    let mut res = [0f32; 256];

    let mut i = 0;
    loop {
        if i == 256 {
            break;
        };

        res[i] = (i as f32) * 0.2126;

        i += 1;
    }

    res
};
const GRAYSCALE_G: [f32; 256] = {
    let mut res = [0f32; 256];

    let mut i = 0;
    loop {
        if i == 256 {
            break;
        };

        res[i] = (i as f32) * 0.7152;

        i += 1;
    }

    res
};
const GRAYSCALE_B: [f32; 256] = {
    let mut res = [0f32; 256];

    let mut i = 0;
    loop {
        if i == 256 {
            break;
        };

        res[i] = (i as f32) * 0.0722;

        i += 1;
    }

    res
};

#[wasm_bindgen]
pub fn image_grayscale_v2(data: &U8Vec) -> U8Vec {
    let mut res: Vec<u8> = Vec::with_capacity(data.len() / 3);
    let data = &data.vec;

    unsafe {
        let res_ptr = res.as_mut_ptr();
        let mut res_len = 0;

        for i in (0..data.len()).step_by(4 * 3) {
            let r_vec = f32x4(
                GRAYSCALE_R[data[i] as usize],
                GRAYSCALE_R[data[i + 3] as usize],
                GRAYSCALE_R[data[i + 6] as usize],
                GRAYSCALE_R[data[i + 9] as usize],
            );
            let g_vec = f32x4(
                GRAYSCALE_G[data[i + 1] as usize],
                GRAYSCALE_G[data[i + 4] as usize],
                GRAYSCALE_G[data[i + 7] as usize],
                GRAYSCALE_G[data[i + 10] as usize],
            );
            let b_vec = f32x4(
                GRAYSCALE_B[data[i + 2] as usize],
                GRAYSCALE_B[data[i + 5] as usize],
                GRAYSCALE_B[data[i + 8] as usize],
                GRAYSCALE_B[data[i + 11] as usize],
            );

            let iter_res = f32x4_add(r_vec, g_vec);
            let iter_res = f32x4_add(iter_res, b_vec);

            let iter_res = u8x4_convert_f32x4(iter_res);

            v128_store32_lane::<0>(iter_res, res_ptr.add(res_len) as *mut u32);
            res_len += 4;
        }

        res.set_len(res_len);
    }

    for i in ((res.len() * 3)..data.len()).step_by(3) {
        let item_res = (data[i] as f32 * 0.2126)
            + (data[i + 1] as f32 * 0.7152)
            + (data[i + 2] as f32 * 0.0722);

        res.push(item_res as u8);
    }

    U8Vec::from_vec(res)
}

#[wasm_bindgen]
pub fn image_grayscale_v3(data: &U8Vec) -> U8Vec {
    let mut res: Vec<u8> = Vec::with_capacity(data.len() / 3);
    let data = &data.vec;

    unsafe {
        let res_ptr = res.as_mut_ptr();
        let mut res_len = 0;

        for i in (0..data.len()).step_by(8 * 3) {
            let r_vec = u16x8_extend_u8(
                data[i],
                data[i + 3],
                data[i + 6],
                data[i + 9],
                data[i + 12],
                data[i + 15],
                data[i + 18],
                data[i + 21],
            );
            let g_vec = u16x8_extend_u8(
                data[i + 1],
                data[i + 4],
                data[i + 7],
                data[i + 10],
                data[i + 13],
                data[i + 16],
                data[i + 19],
                data[i + 22],
            );
            let b_vec = u16x8_extend_u8(
                data[i + 2],
                data[i + 5],
                data[i + 8],
                data[i + 11],
                data[i + 14],
                data[i + 17],
                data[i + 20],
                data[i + 23],
            );

            let b_vec = u16x8_mul(b_vec, u16x8_splat(18));
            let g_vec = u16x8_mul(g_vec, u16x8_splat(183));
            let r_vec = u16x8_mul(r_vec, u16x8_splat(55));

            let sum = u16x8_add(r_vec, g_vec);
            let sum = u16x8_add(sum, b_vec);

            let sum = u16x8_shr(sum, 8);
            let sum = i8x16_narrow_i16x8(sum, u16x8_splat(0));

            v128_store64_lane::<0>(sum, res_ptr.add(res_len) as *mut u64);
            res_len += 8;
        }

        res.set_len(res_len);
    }

    for i in ((res.len() * 3)..data.len()).step_by(3) {
        let tmp = (data[i] as u16) * 18 + (data[i + 1] as u16) * 183 + (data[i + 2] as u16) * 55;
        res.push((tmp >> 8) as u8);
    }

    U8Vec::from_vec(res)
}

#[wasm_bindgen]
pub fn image_grayscale_final(data: &U8Vec) -> U8Vec {
    let mut res: Vec<u8> = Vec::with_capacity(data.len() / 3);
    let data = &data.vec;

    unsafe {
        let data_ptr = data.as_ptr();
        let res_ptr = res.as_mut_ptr();
        let mut res_len = 0;

        for i in (0..data.len()).step_by(8 * 3) {
            let r_vec = u16x8_extend_u8(
                *data_ptr.add(i),
                *data_ptr.add(i + 3),
                *data_ptr.add(i + 6),
                *data_ptr.add(i + 9),
                *data_ptr.add(i + 12),
                *data_ptr.add(i + 15),
                *data_ptr.add(i + 18),
                *data_ptr.add(i + 21),
            );
            let g_vec = u16x8_extend_u8(
                *data_ptr.add(i + 1),
                *data_ptr.add(i + 4),
                *data_ptr.add(i + 7),
                *data_ptr.add(i + 10),
                *data_ptr.add(i + 13),
                *data_ptr.add(i + 16),
                *data_ptr.add(i + 19),
                *data_ptr.add(i + 22),
            );
            let b_vec = u16x8_extend_u8(
                *data_ptr.add(i + 2),
                *data_ptr.add(i + 5),
                *data_ptr.add(i + 8),
                *data_ptr.add(i + 11),
                *data_ptr.add(i + 14),
                *data_ptr.add(i + 17),
                *data_ptr.add(i + 20),
                *data_ptr.add(i + 23),
            );

            let b_vec = u16x8_mul(b_vec, u16x8_splat(18));
            let g_vec = u16x8_mul(g_vec, u16x8_splat(183));
            let r_vec = u16x8_mul(r_vec, u16x8_splat(55));

            let sum = u16x8_add(r_vec, g_vec);
            let sum = u16x8_add(sum, b_vec);

            let sum = u16x8_shr(sum, 8);
            let sum = i8x16_narrow_i16x8(sum, u16x8_splat(0));

            v128_store64_lane::<0>(sum, res_ptr.add(res_len) as *mut u64);
            res_len += 8;
        }

        res.set_len(res_len);
    }

    for i in ((res.len() * 3)..data.len()).step_by(3) {
        let tmp = (data[i] as u16) * 18 + (data[i + 1] as u16) * 183 + (data[i + 2] as u16) * 55;
        res.push((tmp >> 8) as u8);
    }

    U8Vec::from_vec(res)
}
