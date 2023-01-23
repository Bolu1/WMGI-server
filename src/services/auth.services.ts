const bcrypt = require("bcrypt");
const querystring = require('querystring')
const axios = require("axios")
const jwt = require("jsonwebtoken");
import randomString from "../utils/randomString";
const multer = require("multer");
import activityLogger from "../helpers/logger";
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

class UserService {
  public static async addUser(body) {
    const { email, name, phone, username, password } = body;
    //payload to the database
    const slug = generateString(4, true, false);
    const hashedPassword = await bcrypt.hash(password, 12);
    //payload to the database
    const payload = {
      email: email,
      password: hashedPassword,
      name: name,
      slug: slug
    };

    // check if user exists
    const result = await this.getUserByEmail(email);
    if (result) {
      throw new ConflictError("Email is taken");
    }

    const sql = `INSERT INTO users SET ?`;
    await adb.query(sql, payload);
    const emailToken = await Jwt.issue({ email: email }, 1);
    return emailToken;
  }

  public static async getUserByName(username) {
    const sql = `SELECT * FROM users WHERE name = '${username}'`;
    const result = await adb.query(sql);
    return result[0][0];
  }

  public static async getUserByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    const result = await adb.query(sql);
    return result[0][0];
  }

  public static async login(body) {
    const sql = `SELECT * FROM users WHERE email = '${body.email}'`;
    const result = await adb.query(sql);
    if (!result[0][0]) {
      throw new BadRequestError("Invalid login details");
    }
    const valid = await bcrypt.compare(body.password, result[0][0].password);
    if (!valid) {
      throw new BadRequestError("Invalid login details");
    }

    const authToken = await Jwt.issue({
      email: result[0][0].email,
      id: result[0][0].slug,
      name: result[0][0].name,
    });
    return {
      token: authToken,
      id: result[0][0].slug,
      email: result[0][0].email,
      name: result[0][0].name,
    };
  }


}

export default UserService;
