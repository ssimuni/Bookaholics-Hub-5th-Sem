import prisma from "../DB/db.config.js";
import upload from '../multer.config.js';
import nodemailer from "nodemailer";

export const createBorrowPost = async(req,res)=>{
    const b_title =req.body.title;
    const  b_authorname =req.body.authorname;
    const b_edition =req.body.edition;
    const b_numOfPages=Number(req.body.numOfPages);
    const b_description=req.body.description;
    const b_price =Number(req.body.price);
    const b_quantity =Number(req.body.quantity);
    const category = req.body.category;
    const pickupPoint = req.body.pickupPoint;
    const returnTime = req.body.returnTime;
    const soldBy_Email =req.body.email;
    const imagePath = req.file ? req.file.path : null; 
    
    const newPost=await prisma.borrowableBook.create({
        data:{
            b_title:b_title,
            b_authorname:b_authorname,
            b_edition:b_edition,
            b_numOfPages:b_numOfPages,
            b_description:b_description,
            b_price:b_price,
            b_quantity:b_quantity,
            category:category,
            pickupPoint:pickupPoint,
            returnTime:returnTime,
            image:imagePath,
            paymentForBorrow:Number(b_price)*0.2,
            soldBy_Email:soldBy_Email
        },
    });
    
    res.send(newPost);
}

export const getBorrowPosts = async(req,res)=>{
    const posts= await prisma.borrowableBook.findMany({
        where:{
            b_quantity:{
                not: 0
            }
        }
    });
    res.send(posts);
}

export const getBorrowBook =  async(req,res)=>{
    const borrId = req.params.borrId; 
    const gotBook = await prisma.borrowableBook.findFirst({
        where: {
            borrId: Number(borrId),
    },
    });
    res.send(gotBook);
}

export const borrowPlace = async(req,res)=>{
    const borrowerEmail = req.body.borrowerEmail;
    const phone = req.body.phone;
    const bbId =req.body.borrId;
    
    const newBorrow = await prisma.borrowProcess.create({
        data:{
            bbId:Number(bbId),
            phone:phone,
            borrowerEmail:borrowerEmail
        }
    })
    if(newBorrow!=null){
        const updateMain=await prisma.borrowableBook.update({
            where:{
                borrId:Number(bbId)
            },
            data:{
                b_quantity:{
                    decrement: 1,
                }
            }

        })
        res.status(200).send(newBorrow);}
    else
    res.status(204).send("Process could not be completed.")
}

export const getBorrowRequests = async(req,res)=>{
        const myMail= req.params.eEmail;
         const results = await prisma.borrowProcess.findMany({
          select: {
            bpId: true,
            borrowsAt: true,
            phone: true,
            borrower: {
              select: {
                email: true,
              },
            },
            borrowId: {
              select: {
                b_title: true,
                b_authorname: true,
                b_edition: true,
              },
            },
          },
          where: {
            AND: [
               { 
                  borrowId: {
                    soldBy_Email: myMail,
                   },
              },
                { borrState:"Pending" },
              ],
          },
        });
      
        const requests= [];
        results.forEach(item=>{
          const requestObject = {
            bpId: item.bpId,
            borrowerEmail:item.borrower.email,
            postAt:item.borrowsAt,
            phone:item.phone,
            b_title:item.borrowId.b_title,
            b_authorname:item.borrowId.b_authorname,
            b_edition:item.borrowId.b_edition
          };
          requests.push(requestObject);
        })
        if(requests)
            res.status(200).send(requests);
        else
            res.status(204).send("Process could not be completed.");
}
      
      
export const deleteBorrowProcess = async(req,res)=>{
        const bpId = req.params.bpId;
        const gotBook = await prisma.borrowProcess.findFirst({
          where: {
              bpId: Number(bpId),
          },
        });
        const book= gotBook.bbId;
        const resetAgain= await prisma.borrowableBook.update({
          where:{
            borrId: Number(book),
          },
          data:{
            b_quantity:{
                increment: 1,
            }
           }
        });
        const deleteProcess= await prisma.borrowProcess.delete({
          where:{
            bpId: Number(bpId)
          }
        });
        if(deleteProcess!=null){
          res.status(200).send("Process deleted");
        }
        else
        res.status(204).send("Could NOT Delete.");
}
      
// export const confirmBorrowRequest = async(req,res)=>{
//         const bpId=req.params.bpId;
//         const confirm= await prisma.borrowProcess.update({
//           where:{
//             bpId:Number(bpId),
//           },
//           data:{
//             borrState:"Confirmed",
//           }
//         });
//         if(confirm!=null){
//            res.status(200).send("Process Completed Successfully");
//         }
//         else{
//           res.status(204).send("Process could not be completed.");
//         }
// }

export const confirmBorrowRequest = async(req,res)=>{
  const bpId=req.params.bpId;
  const confirm= await prisma.borrowProcess.update({
    where:{
      bpId:Number(bpId),
    },
    data:{
      borrState:"Confirmed",
    }
  });
  const getBorrowerEmail = await prisma.borrowProcess.findFirst({
    where:{
      bpId:Number(bpId),
    }
  })
  console.log(getBorrowerEmail.borrowerEmail);
  try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,  
            pass: process.env.PASSWORD 
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to:getBorrowerEmail.borrowerEmail,
        subject: "Borrow Confirmation Mail",
        html: '<h1>Thank you for being with BookaholicsHub</h1> <h1> Your have to return the book after 7 days</h2>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error",error)
        } else {
            console.log("Email sent:" + info.response);
        }
    })
}catch(error){
    console.log(error)
}
  if(confirm!=null){
     res.status(200).send("Process Completed Successfully");
  }
  else{
    res.status(204).send("Process could not be completed.");
  }
}


export const getMyBorrowPosts = async (req, res) => {
  const soldBy_Email = req.params.eEmail;
  const gotBook = await prisma.borrowableBook.findMany({
    where: {
        soldBy_Email: soldBy_Email,
},
});
res.send(gotBook);
}

export const getMyBorrow= async (req, res) => {
  const eEmail = req.params.eEmail;
  const gotBook= await prisma.borrowProcess.findMany({
    where:{
      borrowerEmail:eEmail,
    },
    select:{
      bpId:true,
      borrowsAt:true,
      borrState:true,
      borrowId:{
        select:{
          b_title:true,
          b_authorname:true,
          b_edition:true,
          soldBy_Email:true,
          pickupPoint:true,
          returnTime:true,
          paymentForBorrow:true,
        }
      }
    }
  })

  const borrows= [];
  gotBook.forEach(item=>{
    const borrowObject = {
      bpId: item.bpId,
      soldBy_Email:item.borrowId.soldBy_Email,
      borrowsAt:item.borrowsAt,
      b_title:item.borrowId.b_title,
      b_authorname:item.borrowId.b_authorname,
      b_edition:item.borrowId.b_edition,
      pickupPoint:item.borrowId.pickupPoint,
      borrState:item.borrState,
      paymentForBorrow:item.borrowId.paymentForBorrow,
      returnTime:item.borrowId.returnTime,
    };
    borrows.push(borrowObject);
  })
  if(borrows)
      res.status(200).send(borrows);
  else
      res.status(204).send("Process could not be completed.");
};

export const getMyLendRecords = async (req, res) =>{
  const eEmail= req.params.eEmail;
  const getRecords= await prisma.borrowProcess.findMany({
    select:{
      bpId:true,
      borrowsAt:true,
      borrowerEmail:true,
      phone:true,
      bbId:true,
      borrower:{
        select:{
          name:true,
        }
      },
      borrowId:{
        select:{
          b_title:true,
          pickupPoint:true,
          returnTime:true,
          paymentForBorrow:true,
        }   
        }
    },
    where:{
      AND: [
        { 
           borrowId: {
             soldBy_Email: eEmail,
            },
       },
         { borrState:"Confirmed" },
       ],
    }
  });
  const records=[];
  getRecords.forEach(record=>{
    const recordObject = {
      bpId: record.bpId,
      bbId: record.bbId,
      borrowsAt: record.borrowsAt,
      borrowerEmail: record.borrowerEmail,
      phone: record.phone,
      pickupPoint: record.borrowId.pickupPoint,
      returnTime: record.borrowId.returnTime,
      paymentForBorrow: record.borrowId.paymentForBorrow,
      b_title:record.borrowId.b_title,
      name:record.borrower.name,
    }
    records.push(recordObject);
  })
  res.send(records);
}

export const editBorrowPost = async (req,res) => {
  const borrId=Number(req.body.borrId);
  const b_title =req.body.b_title;
  const  b_authorname =req.body.b_authorname;
  const b_edition =req.body.b_edition;
  const b_numOfPages=Number(req.body.b_numOfPages);
  const b_description=req.body.b_description;
  const b_price =Number(req.body.b_price);
  const category = req.body.category;
  const pickupPoint = req.body.pickupPoint;
  const returnTime=req.body.returnTime;

  const updateBorrowPost = await prisma.borrowableBook.update({
    where:{
      borrId: borrId,
    },
    data:{
        b_title :b_title,
        b_authorname :b_authorname,
        b_edition :b_edition,
        b_numOfPages:b_numOfPages,
        b_description:b_description,
        b_price :b_price,
        category :category,
        pickupPoint :pickupPoint,
        returnTime :returnTime,
     }
  })
  if(updateBorrowPost!=null){
    res.status(200).send("Process Completed Successfully");
 }
 else{
   res.status(204).send("Process could not be completed.");
 }
}

export const transactionBorrow =async (req, res) => {
  const transaction= await prisma.borrowProcess.findMany({
    select:{
      bpId:true,
      borrState:true,
      borrowsAt:true,
      phone:true,
      borrower:{
        select:{
          email:true,
        }
      },
      borrowId:{
        select:{
          soldBy_Email:true,
          b_title:true,
        }
      }
    }
  });
  const records=[];
  transaction.forEach(record=>{
    const recordObject = {
      bpId: record.bpId,
      borrowsAt: record.borrowsAt,
      phone: record.phone,
      borrState: record.borrState,
      borrowerEmail: record.borrower.email,
      soldBy_Email:record.borrowId.soldBy_Email,
      b_title:record.borrowId.b_title,
      state:record.borrState,
    }
    records.push(recordObject);
  })
  res.send(records);

}

export const getAllBorrowPost = async (req, res) => {
  const gotBorrowPost = await prisma.borrowableBook.findMany();

  res.send(gotBorrowPost);
}


