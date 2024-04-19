"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const petRoutes_1 = __importDefault(require("./routes/petRoutes"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../src/public')));
// Set view engine
app.set('view engine', 'hbs');
// Set view path and default layout
app.set('views', path_1.default.join(__dirname, "../src/views"));
app.set('view options', { layout: 'layout' });
// Routes
app.use('/', petRoutes_1.default);
// Error Message
app.use((req, res, next) => {
    res.status(404).render('errorpage', {
        message: "Page not found"
    });
});
// Sync Database
models_1.db.sync().then(() => {
    console.info("Connected to MySQL/MariaDB");
});
// Modify server port if necessary
app.listen(3000);
