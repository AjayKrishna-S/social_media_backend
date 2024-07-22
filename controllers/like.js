import { db } from "../connect.js";
import jwt from 'jsonwebtoken';

export const getLikes = (req,res) => {
    const q = `SELECT userid FROM likes WHERE postid = ?` 

    db.query(q,[req.query.postId], (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map((like) => like.userid));
    })
};

export const addLike = (req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("User not logged in!");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO likes (`userid`, `postid`) VALUES (?)";
    const value = [
        userInfo.id,
        req.body.postId
    ]

    db.query(q,[value], (err, data)=>{
        if (err) return res.status(500).json(err) ;
        return res.status(200).json("Like has been added"); 
    })})
}

export const deleteLike = (req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("User not logged in!");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");
        
    const q = "DELETE FROM likes WHERE userid = ? AND postid = ?";

    db.query(q,[userInfo.id, req.query.postId], (err, data)=>{
        if (err) return res.status(500).json(err) ;
        return res.status(200).json("Likes has been removed!"); 
    })})
}