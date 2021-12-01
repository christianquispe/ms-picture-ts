import express from "express";
import cors from "cors";

import config from "../helpers/config.helper";

import graphql from "./graphql";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/graphql", config.upload, graphql);

server.set("env", config.server.env);
server.set("host", config.server.host);
server.set("port", config.server.port);

export default server;
