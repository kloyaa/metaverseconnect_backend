require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
const useragent = require('express-useragent');
const { getAwsSecrets } = require("./_core/service/secrets/aws.secrets");

async function runApp() {
    try {
        const { DB_CONNECTION_STRING, DB_PORT, WHITELISTED_ORIGIN } = await getAwsSecrets();
        let connectionString = process.env.DB_LOCAL;
        let port = process.env.PORT;
        let corsOptions = {};

        if (process.env.NODE_ENV === "production") {
            connectionString = DB_CONNECTION_STRING;
            port = DB_PORT;
            corsOptions = {
                origin: function (origin, callback) {
                  const origins = WHITELISTED_ORIGIN.split(",");
                  if (origins.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                  } else {
                    callback(new Error('Not allowed by CORS'));
                  }
                }
            };
        }

        mongoose
            .set("strictQuery", false)
            .set("strictPopulate", false)
            .connect(connectionString)
            .then(() => console.log("SERVER IS CONNECTED"))
            .catch(() => console.log("SERVER CANNOT CONNECT"));

        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ limit: '25mb', extended: true }));
        app.use(useragent.express());

        app.use("/api/v1", require("./auth/auth.controller"));
        app.use("/api/v1", require("./wallet/wallet.controller"));
        app.use("/api/v1", require("./user/user.controller"));
        app.use("/api/v1", require("./user/profile.controller"));
        app.use("/api/v1", require("./blacklist/blacklist.controller"));

        app.listen(port, () => console.log(`SERVER IS RUNNING ON ${port}`));
    } catch (error) {
        console.log(error);
    }
}

runApp();
