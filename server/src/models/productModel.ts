// import * as mongoose from "mongoose";
import { required } from "joi";
import { model, Schema } from "mongoose";
import { User } from "./userModel";
// type specificationsprop = {
//     title: string,
//     descriptions: string;
// }
// type imagesType = {
//     public_id: string;
//     url: string;
// }
// type brandType = {
//     name: string;
//     logo: imagesType[];
// }
// type reviewType = {
//     user: User;
//     name: string;
//     rating: number;
//     comment: string;
// }
export interface Product extends Document {
    name: string;
    description: string;
    price: number;
    cuttedPrice: number;
    imgaes: string[];
    brand: string;
    category: string;
    stock: number;
    warranty?: number;
    createdAt: Date;
}

const productSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, "Enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Enter product price"]
    },
    cuttedPrice: {
        type: Number,
        required: [true, "Enter cutted price"]
    },
    images: {
        type: Array,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: [true, "Enter product category"]
    },
    stock: {
        type: Number,
        required: [true, "Enter product stock"],
        maxlength: [4, "Stock cannot exceed limit"],
        default: 1
    },
    warranty: {
        type: Number,
        default: 1,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model<Product>('Product',productSchema)