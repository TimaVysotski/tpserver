import express from "express";

export interface UpdatedRequest extends express.Request {
    body: {
        id?: string,
        text?: string,
        postedBy?: string,
        username?: string,
        password?: string,
        gender?: string
    };
};