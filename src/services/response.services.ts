const bcrypt = require("bcrypt");
const querystring = require('querystring')
const axios = require("axios")
const jwt = require("jsonwebtoken");
import randomString from "../utils/randomString";
const multer = require("multer");
import { generateString } from "../helpers/constants";
const fs = require("fs");
const ndb = require("../config/connect");
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
} from "../core/ApiError";
import Jwt from "../core/Jwt";

const adb = ndb.promise();
const redirectURI = "/api/auth/google"

class ResponseService {

  public static async addResponse(req) {
    //payload to the database
    const slug = generateString(4, true, false);
    //payload to the database
    const payload = {
      response: req.body.response,
      author: req.body.author,
      category: req.body.category,
      slug: slug
    };

    const sql = `INSERT INTO responses SET ?`;
    await adb.query(sql, payload);
    return;
  }


  public static async getResponses(query) {

    const sql = `SELECT category, count(*) AS count FROM responses group by category`;
    const result = await adb.query(sql)
    return result[0]
  }

  public static async searchResponses(query) {
    const skip: number = parseInt(query.offset as string) * 20 || 0;
    const search = query.search ? ` WHERE response = '${query.search}' OR author = '${query.search}' ` : ""

    const sql = `SELECT * FROM responses ${search} ORDER BY id DESC LIMIT 20 OFFSET ${skip}`;
    const result = await adb.query(sql)
    return result[0]
  }


}

export default ResponseService;
