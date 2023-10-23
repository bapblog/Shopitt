import { NextFunction } from "express";
import createHttpError from "http-errors";
import Joi from "joi";

const validator =  (
    schemaName: Joi.ObjectSchema,
    body: object,
    next: NextFunction
) => {
    console.log(body)
    const { error, value } = schemaName.validate(body);
    console.log("validation result: ", value);
    if (error) {
        next(createHttpError(422,error.details[0].message));
    } else {
        next(error);
    }
}

export default validator;
