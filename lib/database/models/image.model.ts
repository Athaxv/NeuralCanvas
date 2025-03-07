import { model, models, Schema } from "mongoose";

export interface Image extends Document {
    title: string,
    transformationType: string,
    publicId: string,
    secureUrl: string,
    height?: number,
    width?: number,
    config?: object,
    transformationUrl?: string,
    aspectRatio?: string,
    color?: string,
    prompt?: string,
    author: {
        _id: string,
        firstname: string,
        lastname: string,
    },
    createdAt?: Date,
    updatedAt?: Date,
}

const ImageSchema = new Schema({
    title: { type: String, required: true},
    transformationType: { type: String, required: true},
    publicId: { type: String, required: true},
    secureUrl: { type: String, required: true},
    height: { type: Number},
    width: { type: Number},
    config: { type: Object},
    transformationUrl: { type: URL },
    aspectRatio: { type: String },
    color: { type: String },
    prompt: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})

const Image = models?.Image || model('Image', ImageSchema)

export default Image;