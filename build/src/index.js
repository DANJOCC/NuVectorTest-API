"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getDBConnection_1 = __importDefault(require("./config/getDBConnection"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const db = (0, getDBConnection_1.default)();
db.on('open', () => {
    console.log('Connection to database succesfully');
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.set('port', process.env.PORT);
app.set('host', process.env.HOST);
app.use(express_1.default.json());
app.use(routes_1.client);
app.use(routes_1.bouncer);
app.use(routes_1.project);
app.use(routes_1.task);
app.listen(app.get('port'), () => {
    console.log(`Server on ${app.get('host')}/${app.get('port')}`);
});
