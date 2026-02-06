/**
 * Enumerator for playing card values. It is an ordered set.
 */
const Value = Object.freeze({
    2 : 0,
    3 : 1,
    4 : 2,
    5 : 3,
    6 : 4,
    7 : 5,
    8 : 6,
    9 : 7,
    10: 8,
    J : 9,
    Q : 10,
    K : 11,
    A : 12
});

export const get_card_key = (value) => {
    let ans;
    for (let key in Value) {
        if (Value[key] == value) {
            ans = key;
            break;
        }
    }
    if (ans) return ans;
    else throw EvalError('Given value is out of bounds.');
}



export default Value;
