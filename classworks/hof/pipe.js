const pipe = (...funcs) => {
    return (...args) => {
        const res = funcs[0](...args);

        for(let i = 1; i < funcs.length; ++i){
            res = funcs[i](...args);
        }

        return res;
    }
}