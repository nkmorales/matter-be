import { Router } from "express";
import axios from "axios";
import User from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../utils/keys";
// Load input validation
import validateRegisterInput from "../utils/register";
import  validateLoginInput from "../utils/login";

const userRouter = new Router();

// @route POST api/users/register
// @desc Register user
// @access Public
userRouter.post("/register", (req, res) => {
const { errors, isValid } = validateRegisterInput(req.body);

// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        password: req.body.password,
        email: req.body.email
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
userRouter.post("/login", (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const email = req.body.email;
  const password = req.body.password;
// Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});






// userRouter.post("/", (req, res) => {
//   User.create(req.body)
//     .then(token => res.send(token))
//     .catch(err => {
//       console.log(err);
//       res.status(500).send(err);
//     });
// });

// userRouter.get("/", (req, res) => {
//   req.query.active = true;
//   User.find(req.query, (err, users) => {
//     res.send(users);
//   }).catch(err => {
//     console.log(err);
//     res.status(500).send(err);
//   });
// });

// userRouter.get("/:id", (req, res) => {
//   User.findById(req.params.id, (err, user) => {
//     res.send(user);
//   }).catch(err => {
//     console.log(err);
//     res.status(500).send(err);
//   });
// });

// userRouter.delete("/:id", (req, res) => {
//   User.findByIdAndUpdate(
//     req.params.id,
//     { $set: { active: false } },
//     (err, user) => {
//       res.send(user);
//     }
//   ).catch(err => {
//     console.log(err);
//     res.status(500).send(err);
//   });
// });

userRouter.post("/salesforce/auth", (req, res) => {
  axios.post(`https://login.salesforce.com/services/oauth2/token?username=${process.env.USERNAME}&password=${process.env.PASSWORD}${process.env.SECURITY_TOKEN}&grant_type=${process.env.GRANT_TYPE}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
    .then(resp => {
      res.send(resp.data);
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

export default userRouter;
