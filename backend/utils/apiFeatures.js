class ApiFeature {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i",
            },
        } : {};
        console.log(keyword)

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter(){
        const queryCopy = {...this.queryString};
        //removing extra field to filter results based to category searched 
        const removeExtraStuff = ["keyword","limit","page"];
        removeExtraStuff.forEach((key) => delete queryCopy[key]);


        //replacing gt/lt/lte/gte with $gt/$lt/$lte/$gte to filter result based on pricing  
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        
        
        
        
        
        this.query = this.query.find(JSON.parse(queryStr));
        // console.log(queryStr)
        return this;
    }

}

module.exports =  ApiFeature;