import express, { Request, Response } from "express";
import { createUserInput } from "../schema/user.schema";
const axios = require("axios")
const jwt = require("jsonwebtoken");
import asyncHandler from "../middleware/async";
import ResponseService from "../services/response.services";
import {
  BadRequestDataResponse,
  CreatedResponse,
  SuccessResponse,
} from "../core/ApiResponse";
import { BadRequestError } from "../core/ApiError";



exports.getResponses = asyncHandler(async (req: Request, res: Response) => {
  const result = await ResponseService.getResponses(req.query);
  return new SuccessResponse("Success", result).send(res);
});

exports.addResponse = asyncHandler(async (req: Request, res: Response) => {
  await ResponseService.addResponse(req);
  return new SuccessResponse("Success", []).send(res);
});

exports.searchResponses = asyncHandler(async (req: Request, res: Response) => {
  const result = await ResponseService.searchResponses(req.query);
  return new SuccessResponse("Success", result).send(res);
});

