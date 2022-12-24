/*  Тесты:
    rangeRight(4); // => [3, 2, 1, 0]
    rangeRight(-4); // => [-3, -2, -1, 0]
    rangeRight(1, 5); // => [4, 3, 2, 1]
    rangeRight(0, 20, 5); // => [15, 10, 5, 0]
    rangeRight(0, -4, -1); // => [-3, -2, -1, 0]
    rangeRight(1, 4, 0); // => [1, 1, 1]
    rangeRight(0); // => []
*/

const baseRange = (start, end, step, isRight) => {
    let index = -1;
    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
    const result = new Array(length);

    while (length--) {
        result[isRight ? length : ++index] = start;
        start += step;
    }

    return result;
}

export function range(start = 0, end, step, isRight = false) {
    if (end === undefined) {
        end = start;
        start = 0;
    }

    step = step === undefined ? (start < end ? 1 : -1) : step;
    return baseRange(start, end, step, isRight);
}
