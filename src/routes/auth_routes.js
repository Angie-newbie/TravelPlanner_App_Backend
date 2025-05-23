// a test not confident it will work
import { auth,  checkUserType } from '../auth.js'
import { Router } from 'express' 

const secret = process.env.JWT_SECRET
import { verifyToken } from '../auth.js'

import jwt from 'jsonwebtoken'
const { verify } = jwt

import bcrypt from 'bcrypt'

const router = Router()

// re-wrote parts of this code to work with dry concepts with functions instead of repeating code.



import User from '../models/user.js'
import { badRequest, goodRequest, notFound} from '../utils/responses.js'

// Login
router.post('/login', async (req, res) => {
    try {
        // Find the user with the provided email
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            // Validate the password
            const match = await bcrypt.compare(req.body.password || '', user.password)
            if (match) {
                // Generate a JWT and send it to the client
                const token = jwt.sign({
                    email: user.email,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
                }, secret)
                res.send({ token, email: user.email, accountType: user.accountType})
            } else {
                notFound({ message: 'Email or password incorrect' })
            }
        } else {
            notFound({ message: 'Email or password incorrect' })
        }
    }
    catch (err) {
        badRequest({ message: err.message })
    }
})

router.post('/register', auth, verifyToken, async (req, res) => {
    try {
        // Create and save new User instance
        let user; 

        // we check if the values are entered
        if (!req.body.email || !req.body.password) {
            badRequest(res, message = 'Email and password are required')
            //return res.status(400).send({ error: 'Email and password are required' })
        }

        // now we check user type then create the user
         user = await User.create({
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                userType: 'user'
            })
            // Send user to the client with 201 status

    
        // Send user to the client with 201 status
        // TODO: Create a JWT so the user is automatically logged in
        


        // res.status(201).send({ email: user.email, accountType: user.accountType })
    
        // lets create a 201 status response
        //goodRequest(email: user.email, accountType: user.accountType, message = 'User created successfully')
        // lets come back to this one
        goodRequest(res, email = user.email, accountType = user.accountTypem, message = 'User created successfully')


    }catch (err) {
        badRequest({ message: err.message })
    }

})

export default router;