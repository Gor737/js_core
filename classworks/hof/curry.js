const curry = (fn) => {
    return function nested(...args){
        if(args.length === fn.length) return fn(...args);
        else return (...newArgs) => nested(...args, ...newArgs);
    }
}