'use-strict'

import mongoose from 'mongoose'
const {Schema} = mongoose

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export class UserClass {}

schema.loadClass( UserClass )

export const user = mongoose.model('UserClass', schema)