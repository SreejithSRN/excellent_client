import axios from "axios";

import { env } from "../../common/env";

// const isDevelopment =
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "127.0.0.1";

// const BASE_URL = isDevelopment ? String(env.API_GATEWAY_URL) : "";

const BASE_URL=String(env.API_GATEWAY_URL)

export const CLIENT_API=axios.create({
    baseURL:BASE_URL
})