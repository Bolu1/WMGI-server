import express, { Request, Response } from "express";
import { createUserInput } from "../schema/user.schema";
import querystring from "querystring";
const axios = require("axios")
const jwt = require("jsonwebtoken");
import asyncHandler from "../middleware/async";
import UserService from "../services/auth.services";
import {
  BadRequestDataResponse,
  CreatedResponse,
  SuccessResponse,
} from "../core/ApiResponse";
import { BadRequestError } from "../core/ApiError";


const redirectURI = "api/auth/google";


exports.addUser = asyncHandler(
  async (req: Request<{}, {}, createUserInput["body"]>, res: Response) => {
    // validator

    await UserService.addUser(req.body);
    return new CreatedResponse("Success", []).send(res);
  }
);

exports.login = asyncHandler(
  async (req: Request<{}, {}, createUserInput["body"]>, res: Response) => {
    const result = await UserService.login(req.body);
    return new SuccessResponse("Success", result).send(res);
  }
);
