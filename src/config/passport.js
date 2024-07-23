const passport = require('passport')
const local = require('passport-local')
const GitHubStrategy = require('passport-github2')
const { getUserEmail, registerUser, getUserById } = require('../dao/mongo/users.services.js')
const { createHash, isValidPassword } = require('../utils/bcryptPassword.js')

const LocalStrategy = local.Strategy

function initializePassport() {

        passport.use('github', new GitHubStrategy(
            {
                clientID: 'Iv23liyCSmZpqqs6i1Fc',
                clientSecret: 'b2a131179b5aad4196c3e805eb849737db9eedfc',
                callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
            },
    
    
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log({profile})
                    let email = profile._json.email
                    let user = await getUserEmail(email)
    
                    if (!user) {
                        let newUser = {
                            name: profile._json.name,
                            email: profile._json.email,
                            password: '',
                        }
                        let result = await registerUser({ ...newUser })
                        done(null, result)
                    }
                    else {
                        return done(null, user)
                    }
                } catch (error) {
                    done(error)
                }
            }
    
        ))
        passport.serializeUser((user, done) => {
            done(null, user._id)
        })
        passport.deserializeUser(async (id, done) => {
            let user = await getUserById(id)
            done(null, user)
        }) 
    //-----///
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const { confirmPassword } = req.body
                if (password !== confirmPassword) {
                    console.log('Las contraseñas no coinciden')
                    return done(null, false)
                }
                const user = await getUserEmail(username)
                if (user) {
                    console.log('El usuario ya existe')
                    return done(null, false)
                }

                req.body.password = createHash(password)
                const newUser = await registerUser({ ...req.body })
                if (newUser) {
                    return done(null, newUser)
                }
                return done(null, false)

            } catch (error) {
                done(error)
            }
        }))
    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                let user = await getUserEmail(username)
                //console.log(user.password)
                //console.log(password)
                if (!user) {
                    console.log('El usuario no existe')
                    done(null, false)
                }
                if (!isValidPassword(password, user.password)) {
                    console.log('La Password no Coinciden')
                    return done(null, false)
                }
                return done(null, user)

            } catch (error) {
                done(error)
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await getUserById(id)
        done(null, user)
    })

}


//-----//





//------//

module.exports = {
    initializePassport
}