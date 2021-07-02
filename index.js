const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type, Accept, X-Total-Count"],
    credentials: true
  }
});

const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session); // Хранилище сессий в монгодб

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const COOKIE_SECRET = 'secret';
const COOKIE_NAME = 'sid';
const { PORT = 3001 } = process.env;

const { usersRouter, authRouter, indexRouter } = require('./routes');

const sessions = session({
  name: COOKIE_NAME,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: COOKIE_SECRET,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  }
})
mongoose.connect('mongodb://localhost:27017/jsCMS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

server.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});

app.use(cookieParser(COOKIE_SECRET));
app.use(sessions);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Total-Count");
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
});
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

let sockets = [];
io.use((socket, next) => sessions(socket.request, socket.request.res, next));

io.on('connection', (socket) => {
  const socketSession = socket.request.session;
  socket.on('findUser', data => {
    // const findedUser = sockets.find(({anketa}) => {
    //   // return (
    //   //         (anketa.member_sex === 0 && anketa.target === data.target) ||
    //   //         (anketa.member_sex === data.me_sex &&
    //   //             anketa.member_age.includes(data.me_age) &&
    //   //             anketa.target === data.target)
    //   //        )
    //   return (
    //       (anketa.target === data.target) && (())
    //   )
    // })
    console.log(findedUser);
    if (findedUser) {
      console.log('user finded');
    } else {
      const isUser = sockets.find(({socketID}) => socket.id === socketID);
      if (isUser) {
        sockets.splice(sockets.indexOf(isUser), 1);
        sockets.push({
          socketID: socket.id,
          anketa: data
        })
        console.log(sockets);
      } else {
        sockets.push({
          socketID: socket.id,
          anketa: data
        })
      }

    }

  });

  socket.on('connect', data => {
    console.log(data);
  })
});

// tasksInit();
