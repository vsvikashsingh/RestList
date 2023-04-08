//wrapper function for async errors
function catchAsync(func){
    return (req, res, next)=> {
        func(req, res, next).catch(next); 
    }
}

export default catchAsync;