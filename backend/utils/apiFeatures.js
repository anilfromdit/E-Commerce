class ApiFeature {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    offer(){

        const offerX = this.queryString.offer ? {
            offer: {
                $regex: this.queryString.offer,
                $options: "i",
            },
        } : {};
        this.query = this.query.find({ ...offerX });
        return this;
    }
    

    search() {

        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i",
            },
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryString };
        //removing extra field to filter results based to category searched 
        const removeExtraStuff = ["keyword", "limit", "page"];
        removeExtraStuff.forEach((key) => delete queryCopy[key]);

        //replacing gt/lt/lte/gte with $gt/$lt/$lte/$gte to filter result based on pricing  
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

   

    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;

        const resultToSkip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(resultToSkip);
        return this;
    }

}

module.exports = ApiFeature;