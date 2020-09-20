"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require('dotenv').config();
var app = express_1.default();
app.get('/', function (req, res) {
    res.send("\n    <div> \n      <h1> Hello Express </h1> \n    </div>\n  ");
});
var PORT = process.env.PORT;
app.listen(PORT, function () {
    console.log("Server UP! listen on PORT : " + PORT);
});
