/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "isomorphic-fetch";
import queryString from "query-string";
import express from "express";
import proxy from "express-http-proxy";
import helmet from "helmet";
import bodyParser from "body-parser";
import { expressjwt as jwt } from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";
import compression from "compression";
import {
  OK,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
  NOT_ACCEPTABLE,
  MOVED_PERMANENTLY,
  TEMPORARY_REDIRECT,
} from "http-status";
import config, { getEnvironmentVariable } from "../config";
import { getToken, getUsers } from "./helpers/auth";
import Auth0SilentCallback from "./helpers/Auth0SilentCallback";
import contentSecurityPolicy from "./contentSecurityPolicy";
import errorLogger from "../util/logger";
import { errorRoute, defaultRoute } from "./routes";
import { resolveJsonOrRejectWithError } from "../sources/resolveJsonOrRejectWithError";

const app = express();
const allowedBodyContentTypes = ["application/csp-report", "application/json"];

app.use(
  bodyParser.json({
    type: (req) => allowedBodyContentTypes.includes(req.headers["content-type"]),
  }),
);

if (!config.isVercel) {
  app.use(compression());
}

app.use(
  express.static(process.env.RAZZLE_PUBLIC_DIR, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // One year
  }),
);

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    contentSecurityPolicy,
  }),
);

app.enable("trust proxy");

async function sendInternalServerError(req, res) {
  if (res.getHeader("Content-Type") === "application/json") {
    res.status(INTERNAL_SERVER_ERROR).json("Internal server error");
  } else {
    const { data } = await errorRoute(req);
    res.status(INTERNAL_SERVER_ERROR).send(data);
  }
}

function sendResponse(res, data, status = OK) {
  if (status === MOVED_PERMANENTLY || status === TEMPORARY_REDIRECT) {
    res.writeHead(status, data);
    res.end();
  } else if (res.getHeader("Content-Type") === "application/json") {
    res.status(status).json(data);
  } else {
    res.status(status).send(data);
  }
}

async function handleRequest(req, res, route) {
  try {
    try {
      const { data, status } = await route(req, res);
      sendResponse(res, data, status);
    } catch (err) {
      errorLogger.error(err);
      await sendInternalServerError(req, res);
    }
  } catch (err) {
    errorLogger.error(err);
    await sendInternalServerError(req, res);
  }
}

const GOOGLE_API_URL = config.googleApiUrl;
const GOOGLE_API_KEY = getEnvironmentVariable("NDLA_GOOGLE_API_KEY");
const GOOGLE_SEARCH_ENGINE_ID = config.googleSearchEngineId;

const apiEmbedUrl = (() => {
  if (process.env.NODE_ENV === "unittest") {
    return "http://google-api";
  }
  return GOOGLE_API_URL;
})();

const apiEmbedKey = (() => {
  if (process.env.NODE_ENV === "unittest") {
    return "googlekey";
  }
  return GOOGLE_API_KEY;
})();

const apiEmbedEngingeId = (() => {
  if (process.env.NODE_ENV === "unittest") {
    return "googleEngingeId";
  }
  return GOOGLE_SEARCH_ENGINE_ID;
})();

const apiEmbedResourceUrl = (path) => apiEmbedUrl + path;

const customSearchUrl = apiEmbedResourceUrl("/customsearch/v1/");

app.get("/customsearch/", async (req, res) => {
  const { q, start } = req.query;
  const params = {
    key: apiEmbedKey,
    cx: apiEmbedEngingeId,
    q,
    start,
  };
  const response = await fetch(`${customSearchUrl}?${queryString.stringify(params)}`).then(
    resolveJsonOrRejectWithError,
  );

  return res.send(response);
});

app.get("/robots.txt", (req, res) => {
  if (req.hostname === "stier.ndla.no") {
    res.sendFile("robots.txt", { root: "./build/" });
  } else {
    res.type("text/plain");
    res.send("User-agent: *\nDisallow: /");
  }
});

app.get("/health", (req, res) => {
  res.status(OK).send("Health check OK");
});

app.use(
  "/pintrest-proxy/*",
  proxy(config.pinterestApiUrl, {
    proxyReqOptDecorator: function (proxyReqOpts, _srcReq) {
      proxyReqOpts.headers["Authorization"] = `Bearer ${getEnvironmentVariable("PINTEREST_ACCESS_TOKEN")}`;
      return proxyReqOpts;
    },
  }),
);

app.get(
  "/get_owners",
  jwt({
    secret: expressJwtSecret({
      cache: true,
      jwksUri: `https://${config.auth0Domain}/.well-known/jwks.json`,
    }),
    audience: "ndla_system",
    issuer: `https://${config.auth0Domain}/`,
    algorithms: ["RS256"],
  }),
  async (req, res) => {
    const {
      auth,
      query: { ownerIds },
    } = req;

    const isAdmin = auth && auth.permissions.includes(`learningpath:admin`);

    if (!isAdmin) {
      res.status(FORBIDDEN).json({ status: FORBIDDEN, text: "No access allowed" });
    } else {
      try {
        const managementToken = await getToken(`https://${config.auth0Domain}/api/v2/`);
        const users = await getUsers(managementToken, ownerIds);
        res.status(OK).json(users);
      } catch (err) {
        sendInternalServerError(req, res);
        errorLogger.error(err);
      }
    }
  },
);

app.get("/login/silent-callback", (req, res) => {
  res.send("<!doctype html>\n" + Auth0SilentCallback); // eslint-disable-line
});

app.post("/csp-report", (req, res) => {
  const { body } = req;
  if (body && body["csp-report"]) {
    const cspReport = body["csp-report"];
    const errorMessage = `Refused to load the resource because it violates the following Content Security Policy directive: ${cspReport["violated-directive"]}`;
    errorLogger.error(errorMessage, cspReport);
    res.status(OK).json({ status: OK, text: "CSP Error recieved" });
  } else {
    res.status(NOT_ACCEPTABLE).json({ status: NOT_ACCEPTABLE, text: "CSP Error not recieved" });
  }
});

app.get("/*", (req, res) => {
  handleRequest(req, res, defaultRoute);
});

export default app;
