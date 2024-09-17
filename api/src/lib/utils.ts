import type { Response } from "express";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";
import { AppError, logger } from "./helpers";
import type { ResponseMessages } from "./validations";
import { AxiosError } from "axios";

export function sanitizeError(err: unknown) {
    if (err instanceof AppError) return err.message;
    else if (err instanceof AxiosError) return err.message;
    else if (err instanceof ZodError)
        return err.errors
            .map((e) =>
                e.code === "invalid_type"
                    ? `Expected ${e.expected} but received ${
                          e.received
                      } at ${e.path.join(".")}`
                    : e.message
            )
            .join(", ");
    else if (err instanceof MongooseError) return err.message;
    else if (err instanceof Error) return err.message;
    else return "Unknown error";
}

export function handleError(err: unknown, res: Response) {
    logger.error(err);

    if (err instanceof AppError)
        return CResponse({
            res,
            message: err.status,
            longMessage: sanitizeError(err),
        });
    if (err instanceof AxiosError)
        return CResponse({
            res,
            message: "BAD_REQUEST",
            longMessage: sanitizeError(err),
        });
    else if (err instanceof ZodError)
        return CResponse({
            res,
            message: "BAD_REQUEST",
            longMessage: sanitizeError(err),
        });
    else if (err instanceof MongooseError)
        return CResponse({
            res,
            message: "ERROR",
            longMessage: sanitizeError(err),
        });
    else if (err instanceof Error)
        return CResponse({
            res,
            message: "ERROR",
            longMessage: sanitizeError(err),
        });
    else
        return CResponse({
            res,
            message: "INTERNAL_SERVER_ERROR",
            longMessage: sanitizeError(err),
        });
}

export function CResponse<T = unknown>({
    res,
    message,
    longMessage,
    data,
}: {
    res: Response;
    message: ResponseMessages;
    longMessage?: string;
    data?: T;
}) {
    let code;
    let status = false;

    switch (message) {
        case "OK":
            code = 200;
            status = true;
            break;
        case "ERROR":
            code = 400;
            break;
        case "UNAUTHORIZED":
            code = 401;
            break;
        case "CONFLICT":
            code = 409;
            break;
        case "FORBIDDEN":
            code = 403;
            break;
        case "NOT_FOUND":
            code = 404;
            break;
        case "BAD_REQUEST":
            code = 400;
            break;
        case "TOO_MANY_REQUESTS":
            code = 429;
            break;
        case "INTERNAL_SERVER_ERROR":
            code = 500;
            break;
        case "SERVICE_UNAVAILABLE":
            code = 503;
            break;
        case "GATEWAY_TIMEOUT":
            code = 504;
            break;
        case "UNKNOWN_ERROR":
            code = 500;
            break;
        case "UNPROCESSABLE_ENTITY":
            code = 422;
            break;
        case "NOT_IMPLEMENTED":
            code = 501;
            break;
        case "CREATED":
            code = 201;
            status = true;
            break;
        case "BAD_GATEWAY":
            code = 502;
            break;
        default:
            code = 500;
            break;
    }

    return res.status(code).json({
        status,
        message,
        longMessage,
        data,
    });
}

export function generateDbUrl() {
    const { DB_PROTOCOL, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } =
        process.env;
    return `${DB_PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
}
