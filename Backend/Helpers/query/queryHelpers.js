const searchHelper = (searchKey, query, req) => {
    const filter = {};

    if (req.query.search) {
        filter[searchKey] = new RegExp(req.query.search, "i");
    }

    if (req.query.category && req.query.category !== "All") {
        filter.category = req.query.category;
    }

    if (Object.keys(filter).length > 0) {
        query = query.where(filter);
    }

    return query;
}


const paginateHelper = async (model, query, req, baseFilter = {}) => {

    const page = parseInt( req.query.page ) || 1 ; 
    const pageSize = parseInt( req.query.limit ) || 6 ; 
    const skip  = (page-1 ) * pageSize ; 
   
    const filter = { ...baseFilter };
    if (req.query.search) {
        filter.title = new RegExp(req.query.search, "i");
    }
    if (req.query.category && req.query.category !== "All") {
        filter.category = req.query.category;
    }

    const total = await model.countDocuments(filter)
  
    const pages = Math.ceil(total / pageSize ) || 1 ;

    query = query.skip(skip).limit(pageSize) ; 

    return {
        query : query  ,
        page : page ,
        pages : pages ,
        total : total
    }

}


module.exports ={
    searchHelper,
    paginateHelper
}
