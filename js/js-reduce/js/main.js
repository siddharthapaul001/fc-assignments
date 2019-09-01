function reduce(callback) {
    let i = 0, args = [];
    for(i = 0; i < arguments.length; i++){
        args.push(arguments[i]);
    }
    if (typeof callback !== 'function') {
        throw new TypeError('Must pass a callback function');
    }
    return (function(){
        let arr, prev, i = 0;
        if(arguments.length == 3){
            arr = arguments[2];
            prev = arguments[1];
        }else{
            return reduce.bind(null, ...arguments);
        }
        if(!prev){
            prev = +arr[0] || arr[0];
            arr = arr.splice(1);
            i++;
        }
        for (i in arr) {
            prev = args[0](+prev || prev, +arr[i] || arr[i], i, arr);
        }
        return prev;
    }).apply(null, args);
}

function map(callback, arr) {
    let resultArr = [];
    if (typeof callback !== 'function') {
        throw new TypeError('Must pass a callback function');
    }
    reduce(function (a, b, index, array) {
        resultArr.push(callback(b, index, array));
        return b;
    }, [], arr);
    return resultArr;
}

function filter(callback, arr) {
    let resultArr = [];
    if (typeof callback !== 'function') {
        throw new TypeError('Must pass a callback function');
    }
    reduce(function (a, b, index, array) {
        if (callback(b, index, array)) {
            resultArr.push(b);
        }
        return b;
    }, [], arr);
    return resultArr;
}

function flat(depth, arr) {
    var resultArr = [];
    while(depth > 0){
        resultArr = [];
        reduce(function (a, b, index, array) {
            if(Array.isArray(b)){
                for(let e of b){
                    resultArr.push(e);
                }
            }else{
                resultArr.push(b);
            }
            return b;
        }, [], arr);
        arr = resultArr;
        depth--;
    }
    return resultArr;
}

function flatMap(callback, arr){
    let resultArr = map(callback, arr);
    return flat(1, resultArr);
}

var reduceFunc = reduce(function(a, b){
    return a+b;
});
console.log(reduceFunc([], [1,2,3,4]));

var movies = [{
    "name": "ABC",
    "genre": "Thriller"
},
{
    "name": "Ram",
    "genre": "Horror"
},
{
    "name": "Sam",
    "genre": "Thriller"
}];

var genres = reduce(
    function(a, b){
        if(a.indexOf(b.genre) == -1){
            a.push(b.genre);
        }
        return a;
    },
    [],
    movies
);
console.log(genres);

console.log(map(e => e*1.5, [1,2,3,4,5]));

console.log(filter(e => e > 4, [2,3, 4,5,6,6]));

console.log(flat(3, [1,[2,[3,[4,5],6]],7,[7,8],9]));

console.log(flatMap(e => [[e,e]], [2,3,4,5,7]));