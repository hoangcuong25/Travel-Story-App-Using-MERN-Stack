const mongoose = require("mongoose")
const Schema = mongoose.Schema

const travelStorySchema = new Schema({
    title: { type: String, require: true},
    story: {type: String, require: true},
    visitedLocation: {type: [String], default :[]},
    isFavourite: {type: Boolean, default: false},
    userId: {type: Schema.Types.ObjectId, ref: "User", require: true},
    createOn: {type: Date, default: Date.now},
    imageUrl: {type: String, require: true},
    visitedDate: {type: Date, require: true}
})

module.exports = mongoose.model("TravelStory",travelStorySchema )