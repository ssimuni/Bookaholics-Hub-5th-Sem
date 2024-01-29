import prisma from "../DB/db.config.js";
import nodemailer from "nodemailer";

export const createUser = async (req,res)=>{
    const name =req.body.name;
    const email =req.body.email;
    const address =req.body.address;
    const phone =req.body.phone;
    const role =req.body.role;
    const password =req.body.password;
    
    const findUser = await prisma.user.findFirst({
        where: {
            email: email,
    },
    });
    if(findUser){
        res.status(204).send("Email already exists");
    }
    else{
    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            address:address,
            phone:phone,
            role:role,
            password:password,
        },
    });
    res.status(200).send(newUser);
}
}

export const findUser = async (req,res)=>{
    const email =req.body.email;
    const password =req.body.password;
    const foundUser = await prisma.user.findFirst({
        where: {
            AND: [
                { email:email },
                { password:password }
                ],
    },
    });
    if(foundUser==null){
        res.status(204).send("Not found.");
    }
    else{
    res.status(200).send(foundUser);
    }
}

export const getUser = async(req,res)=>{
    const id=req.params.userId;
    const gotUser = await prisma.user.findFirst({
        where: {
            id: Number(id),
    },
    });
    res.send(gotUser);
}

export const getAllUser = async (req, res) =>{
    const allUser = await prisma.user.findMany();
    res.send(allUser);
  }