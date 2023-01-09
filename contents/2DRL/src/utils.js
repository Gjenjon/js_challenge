
 const mean = (xs) => {
    return sum(xs) / xs.length;
}

/**
 * 数値の配列の合計を計算する
 *
 * @param {number[]} xs
 * @returns {number} `xs`の合計
 * @throws `xs`が空ならエラー
 */
const sum = (xs) => {
    if (xs.length === 0) {
        throw new Error('xsは空でない配列であることが期待される。');
    }
    else {
        return xs.reduce((x, prev) => prev + x);
    }
}