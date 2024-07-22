import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req,res) => {
    const userId = req.params.userId;
    const q = `SELECT * FROM users WHERE id = ?`;

    db.query(q,[userId], (err, data)=>{
        if(err) return res.status(500).json(err);
        const { password, ...other } = data[0];
        return res.status(200).json(other)
    })
}

export const updateUser = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("User not logged in!");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")
    
        const q ="UPDATE users SET `name` = ?, `bio` = ?, `location` = ?, `profilePic` = ?, `coverPic` = ? WHERE id = ?";

        db.query(q,[
            req.body.name,
            req.body.bio,
            req.body.location,
            req.body.profilePic,
            req.body.coverPic,
            userInfo.id
        ],(err, data) =>{
            if(err) return res.status(500).json(err);
            console.log(err);
            console.log(data);
            if(data.affectedRows > 0)return res.json("updated");
            return res.status(403).json("You can only update your own post")
        })

    })
}