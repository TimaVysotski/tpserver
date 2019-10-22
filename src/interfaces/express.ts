import express from "express";


export interface UpdatedUserRequest extends express.Request {
    body: {
        email?: string,
        username?: string,
        password?: string,
        gender?: string,
        id?: string,
    }
    [x: string]: any;
};
