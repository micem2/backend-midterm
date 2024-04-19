import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import path from 'path';
import petRoutes from './routes/petRoutes';
import { db } from './models';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../src/public')));

// Set view engine
app.set('view engine', 'hbs');

// Set view path and default layout
app.set('views', path.join(__dirname, "../src/views"));
app.set('view options', {layout: 'layout'});

// Routes
app.use('/', petRoutes);

// Error Message
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('errorpage', {
        message: "Page not found"
    });
})

// Sync Database
db.sync().then(() => {
    console.info("Connected to MySQL/MariaDB")
})

// Modify server port if necessary
app.listen(3000);