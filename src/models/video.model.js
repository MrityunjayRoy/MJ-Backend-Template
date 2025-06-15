import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate"; 

const videoSchema = mongoose.Schema(
    {
        url: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        views: {
            type: Number,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }    
)

mongoose.plugin(mongooseAggregatePaginate);

export const video = mongoose.model("Video", videoSchema);