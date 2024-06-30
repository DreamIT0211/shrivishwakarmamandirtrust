// models/headline.js

class Headline {
    constructor(NewsLineID, Line, created_at) {
        this.NewsLineID = NewsLineID;
        this.Line = Line;
        this.created_at = created_at;
    }
}

module.exports = Headline;
