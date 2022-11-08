if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const TodayGame = require('./models/todayGame');
const Fantasy = require('./models/fantasy');
const Article = require('./models/article');
const YesterdayGame = require('./models/yesterdayGame');
const Standings = require('./models/standings');
const User = require('./models/user');
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initializePassport = require('./passport-config')



app.set('view engine', 'ejs')
// so youre able to access the forms (in the req variable)
// req.body.__  : anything after body is the name attribute from the form
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const uri = process.env.DB_URI;

// let loggedIn = false

let users

const getUsers = async () => {
    users = await User.find()
}

// wait to listen for requests until after connecting to db
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('Connected to db'))
    .then(getUsers())
    .catch((err) => console.log(err))

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.get('/', checkAuthenticated,  async (req, res) => {
    let articles = await Article.find({}).sort({ createdAt : -1 })

    res.render('pages/index', {
        articles: articles
    });
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('pages/login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('pages/register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await user.save()
        await getUsers()
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
})

// need method-override library for delete
app.delete('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})

app.get('/today', checkAuthenticated, async (req, res) => {
    let games = await TodayGame.find()

    res.render('pages/today', {
        games: games
    });
    
});

app.get('/yesterday', checkAuthenticated, async (req, res) => {
    let gamesYesterday = await YesterdayGame.find()

    res.render('pages/yesterday', {
        games: gamesYesterday
    });
    
});

app.get('/fantasy', checkAuthenticated, async (req, res) => {
    let f = await Fantasy.find({ $or: [
        {
            position: 'F'
        },
        {
            position: 'D'
        }
    ]
    }).sort({ fpoints: -1 })
        
    let overall = f.slice(0,50)
    
    res.render('pages/fantasy', {
        overall: overall
    });
    
});

app.get('/forwards', checkAuthenticated, async (req, res) => {
    let forwards = await Fantasy.find({ position: "F" }).sort({ fpoints: -1 })

    res.render('pages/forwards', {
        forwards: forwards
    });
});

app.get('/defensemen', checkAuthenticated, async (req, res) => {
    let defensemen = await Fantasy.find({ position: "D" }).sort({ fpoints: -1 })

    res.render('pages/defensemen', {
        defensemen: defensemen
    });
});

app.get('/goalies', checkAuthenticated, async (req, res) => {
    let goalies = await Fantasy.find({ position: "G" }).sort({ fpoints: -1 })

    res.render('pages/goalies', {
        goalies: goalies
    });
    
});

app.get('/standings', checkAuthenticated, async (req, res) => {
    let standings = await Standings.find()
    let atlantic = standings.slice(0,8)
    let metro = standings.slice(8,16)
    let central = standings.slice(16,24)
    let pacific = standings.slice(24,32)

    res.render('pages/standings', {
        atlantic: atlantic,
        metro: metro,
        central: central,
        pacific: pacific
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    next()
}

app.listen(3000)