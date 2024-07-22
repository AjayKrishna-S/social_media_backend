import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const getReletionships = (req,res) => {
        const q = "SELECT followedUserid FROM reletionships WHERE followerUserid = ?";

        db.query(q,req.query.userId,(err, data)=>{ 
            if(err) return res.status(500).json(err);
            return res.status(200).json(data.map((reletionship) => reletionship.followedUserid));
        })
    }

export const addReletionship = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("User not logged in!");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO reletionships (`followerUserid`, `followedUserid`) VALUES (?)";
    const value = [
        userInfo.id,
        req.body.userId
    ]

    db.query(q,[value], (err, data)=>{
        if (err) return res.status(500).json(err) ;
        return res.status(200).json("Follow"); 
    })})
}

export const deleteReletionship = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("User not logged in!");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");
        
    const q = "DELETE FROM reletionships WHERE followerUserid = ? AND followedUserid = ?";

    db.query(q,[userInfo.id, req.query.userId], (err, data)=>{
        if (err) return res.status(500).json(err) ;
        return res.status(200).json("Unfollow!"); 
    })})
}