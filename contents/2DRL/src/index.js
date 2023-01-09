

discountAndNormalizeRewards = (rewardSequences, discountRate) => {
    return tf.tidy(() => {
        const discounted = [];
        // rewardSequencesの個々の要素を反復処理
        for (const sequence of rewardSequences) {
            const discountratedRewardTF = discountRewards(sequence, discountRate);
            // discounted配列に、報酬値のtf.Tensorを追加
            discounted.push(discountratedRewardTF)
        }
        // 割引いた報酬値全体の平均と標準偏差を計算する
        const concatenated = tf.concat(discounted);
        // 平均
        const mean = tf.mean(concatenated);
        // 標準偏差
        const std = tf.sqrt(tf.mean(tf.square(concatenated.sub(mean))));
        // 求めた平均と標準偏差を使って、報酬値のシーケンスを正規化する。
        const normalized = discounted.map((rs) => {
            return rs.sub(mean).div(std);
        })
        return normalized;
    });
}

discountRewards = (rewards, discountRate) => {
    const discountedBuffer = tf.buffer([rewards.length]);
    let prev = 0;
    for (let i = rewards.length - 1; i >= 0; --i) {
        const current = discountRate * prev + rewards[i];
        discountedBuffer.set(current, i);
        prev = current;
    }
    return discountedBuffer.toTensor();
}

scaleAndAverageGradients = (allGradients, normalizedRewards) => {
    return tf.tidy(() => {
        const gradients = {};
        // allGradientsが持つプロパティに対して以下の処理をする。
        for (const varName in allGradients) {
            // gradientsオブジェクトに、allGradientsが持つ重みとバイアスのデータを持たせる
            gradients[varName] = tf.tidy(() => {
                // 勾配を配列にまとめる
                const varGradients = allGradients[varName].map((varGameGradients) => {
                        return tf.stack(varGameGradients);
                    })
                // 次元を拡張し、ブロードキャストを使った乗算の準備をする。
                const expandedDims = [];
                for (let i = 0; i < varGradients[0].rank - 1; ++i) {
                    expandedDims.push(1);
                }
                // rankが3の場合、expandedDimsは[1,1]
                // rankが2の場合、expandedDimsは[1]
                const reshapedNormalizedRewards = normalizedRewards.map((rs) => {
                    // rsの要素数と[1, 1]か[1]を連結する
                    // rs.shapeはArrayなので、concat()が使える
                    // [要素数, 1]か[要素数,1,1]になる
                    const concated = rs.shape.concat(expandedDims);
                // rsのshapeをconcatedに変える。
                    const reshapedNormalizedRewards = rs.reshape(concated);
                    return reshapedNormalizedRewards;
                });

                for (let g = 0; g < varGradients.length; ++g) {
                    // このmul()の呼び出しはブロードキャストを使う
                    varGradients[g] = varGradients[g].mul(reshapedNormalizedRewards[g]);
                }
                // スケーリングした勾配を連結し、全ゲームの全ステップに渡って平均する
                return tf.mean(tf.concat(varGradients, 0), 0);
            });
        }
        return gradients;
    });
}