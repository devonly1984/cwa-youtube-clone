import { Client } from "@upstash/workflow";
import { config } from "./config";

export const workflow = new Client({ token: config.qstash.token });


