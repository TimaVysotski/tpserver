import express from "express";

export interface UpdatedPostRequest extends express.Request {
    body: {
        id?: string,
        text?: string,
        postedBy?: string,
    }
}


export interface UpdatedUserRequest extends express.Request {
    body: {
        username?: string,
        password?: string,
        gender?: string,
        id?: string,
    }
}