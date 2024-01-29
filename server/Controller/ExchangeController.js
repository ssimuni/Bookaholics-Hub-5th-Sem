/* eslint-disable no-unused-vars */
import prisma from "../DB/db.config.js";
import upload from '../multer.config.js';
import nodemailer from "nodemailer";

export const createExchangePost = async(req,res)=>{
    const b_title =req.body.title;
    const  b_authorname =req.body.authorname;
    const b_edition =req.body.edition;
    const b_numOfPages=Number(req.body.numOfPages);
    const b_description=req.body.description;
    const b_price =Number(req.body.price);
    const b_quantity =Number(req.body.quantity);
    const category = req.body.category;
    const wishedBook = req.body.wishedBook;
    const wishedBookAuthor = req.body.wishedBookAuthor;
    const wishedBookEdition = req.body.wishedBookEdition;
    const imagePath = req.file ? req.file.path : null; 
    const soldBy_Email =req.body.email;
    const newPost=await prisma.exchangeableBook.create({
        data:{
            b_title:b_title,
            b_authorname:b_authorname,
            b_edition:b_edition,
            b_numOfPages:b_numOfPages,
            b_description:b_description,
            b_price:b_price,
            b_quantity:b_quantity,
            category:category,
            image:imagePath,
            soldBy_Email:soldBy_Email,
            wishedBook:wishedBook,
            wishedBookAuthor:wishedBookAuthor,
            wishedBookEdition:wishedBookEdition
        },
    });
    
    res.send(newPost);
}

export const getExchangePosts = async(req,res)=>{
    const posts= await prisma.exchangeableBook.findMany(
        {
            where:{
                b_quantity:{
                    not: 0
                }
            }
        }
    );
    res.send(posts);
}

export const getExchangeBook =  async(req,res)=>{
    const ebId = req.params.ebId; 
    const gotBook = await prisma.exchangeableBook.findFirst({
        where: {
            ebId: Number(ebId),
    },
    });
    res.send(gotBook);
}

export const exchangePlace = async(req,res)=>{
    const exchangerEmail = req.body.exchangerEmail;
    const eId =req.body.ebId;
    const phone=req.body.phone;
    
    const newExchange = await prisma.exchangeProcess.create({
        data:{
            eId:Number(eId),
            exchangerEmail:exchangerEmail,
            phone:phone
        }
    })
    if(newExchange!=null){
        const updateMain=await prisma.exchangeableBook.update({
            where:{
                ebId:Number(eId)
            },
            data:{
                b_quantity:{
                    decrement: 1,
                }
            }

        })
        res.status(200).send(newExchange);}
    else
    res.status(204).send("Process could not be completed.")
}

export const getExchangeRequests = async(req,res)=>{
  const myMail= req.params.eEmail;
   const results = await prisma.exchangeProcess.findMany({
    select: {
      epId: true,
      postAt: true,
      phone: true,
      exchanger: {
        select: {
          email: true,
        },
      },
      exchangeId: {
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
            exchangeId: {
              soldBy_Email: myMail,
             },
        },
          { state:"Pending" },
        ],
    },
  });

  const requests= [];
  results.forEach(item=>{
    const requestObject = {
      epId: item.epId,
      exchangerEmail:item.exchanger.email,
      postAt:item.postAt,
      phone:item.phone,
      b_title:item.exchangeId.b_title,
      b_authorname:item.exchangeId.b_authorname,
      b_edition:item.exchangeId.b_edition
    };
    requests.push(requestObject);
  })
 
  if(requests)
      res.status(200).send(requests);
  else
      res.status(204).send("Process could not be completed.");
}


export const deleteExchangeProcess = async(req,res)=>{
  const epId = req.params.epId;
  const gotBook = await prisma.exchangeProcess.findFirst({
    where: {
        epId: Number(epId),
    },
  });
  const book= gotBook.eId;
  const resetAgain= await prisma.exchangeableBook.update({
    where:{
      ebId: Number(book),
    },
    data:{
      b_quantity:{
          increment: 1,
      }
     }
  });
  const deleteProcess= await prisma.exchangeProcess.delete({
    where:{
      epId: Number(epId)
    }
  });
  if(deleteProcess!=null){
    res.status(200).send("Process deleted");
  }
  else
  res.status(204).send("Could NOT Delete.");
}

// export const confirmRequest = async(req,res)=>{
//     const epId=req.params.epId;
//   const confirm= await prisma.exchangeProcess.update({
//     where:{
//       epId:Number(epId),
//     },
//     data:{
//       state:"Confirmed",
//     }
//   });
//   if(confirm!=null){
//      res.status(200).send("Process Completed Successfully");
//   }
//   else{
//     res.status(204).send("Process could not be completed.");
//   }
// }

export const confirmRequest = async(req,res)=>{
  const epId=req.params.epId;
const confirm= await prisma.exchangeProcess.update({
  where:{
    epId:Number(epId),
  },
  data:{
    state:"Confirmed",
  }
});
const getExchangerEmail = await prisma.exchangeProcess.findFirst({
  where:{
    epId:Number(epId),
  }
})
console.log(getExchangerEmail.exchangerEmail);
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
      to:getExchangerEmail.exchangerEmail,
      subject: "Exchange Confirmation Mail",
      html: '<h1>Congratulations!!Your exchange request is confirmed<h1>Thank you for being with BookaholicsHub</h1>'
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


export const getMyExchangePosts = async (req, res) => {
  const soldBy_Email = req.params.eEmail;
  const gotBook = await prisma.exchangeableBook.findMany({
    where: {
        soldBy_Email: soldBy_Email,
},
});
res.send(gotBook);
}

export const getMyExchange= async (req, res) => {
  const eEmail = req.params.eEmail;
  const gotBook= await prisma.exchangeProcess.findMany({
    where:{
      exchangerEmail:eEmail,
    },
    select:{
      epId:true,
      postAt:true,
      state:true,
      exchangeId:{
        select:{
          b_title:true,
          b_authorname:true,
          b_edition:true,
          soldBy_Email:true,
          wishedBook:true,
          wishedBookAuthor:true,
          wishedBookEdition:true,
        }
      }
    }
  })

  const exchanges= [];
  gotBook.forEach(item=>{
    const exchangeObject = {
      epId: item.epId,
      soldBy_Email:item.exchangeId.soldBy_Email,
      postAt:item.postAt,
      b_title:item.exchangeId.b_title,
      b_authorname:item.exchangeId.b_authorname,
      b_edition:item.exchangeId.b_edition,
      wishedBook:item.exchangeId.wishedBook,
      state:item.state,
      wishedBookAuthor:item.exchangeId.wishedBookAuthor,
      wishedBookEdition:item.exchangeId.wishedBookEdition,
    };
    exchanges.push(exchangeObject);
  })

  if(exchanges)
      res.status(200).send(exchanges);
  else
      res.status(204).send("Process could not be completed.");
};

export const getMyExchangeRecords = async (req, res) =>{
  const eEmail= req.params.eEmail;
  const getRecords= await prisma.exchangeProcess.findMany({
    select:{
      epId:true,
      postAt:true,
      exchangerEmail:true,
      phone:true,
      eId:true,
      exchanger:{
        select:{
          name:true,
        }
      },
      exchangeId:{
        select:{
          b_title:true,
          wishedBook:true,
        }   
        }
    },
    where:{
      AND: [
        { 
           exchangeId: {
             soldBy_Email: eEmail,
            },
       },
         { state:"Confirmed" },
       ],
    }
  });
  const records=[];
  getRecords.forEach(record=>{
    const recordObject = {
      epId: record.epId,
      eId: record.eId,
      postAt: record.postAt,
      exchangerEmail: record.exchangerEmail,
      phone: record.phone,
      b_title:record.exchangeId.b_title,
      name:record.exchanger.name,
      wishedBook:record.exchangeId.wishedBook,
    }
    records.push(recordObject);
  })
  res.send(records);
}

export const editExchangePost = async (req,res) => {
  const ebId=Number(req.body.ebId);
  const b_title =req.body.b_title;
  const  b_authorname =req.body.b_authorname;
  const b_edition =req.body.b_edition;
  const b_numOfPages=Number(req.body.b_numOfPages);
  const b_description=req.body.b_description;
  const b_price =Number(req.body.b_price);
  const category = req.body.category;
  const wishedBook = req.body.wishedBook;
  const wishedBookAuthor = req.body.wishedBookAuthor;
  const wishedBookEdition = req.body.wishedBookEdition;

  const updateExchangePost = await prisma.exchangeableBook.update({
    where:{
      ebId: ebId,
    },
    data:{
        b_title :b_title,
        b_authorname :b_authorname,
        b_edition :b_edition,
        b_numOfPages:b_numOfPages,
        b_description:b_description,
        b_price :b_price,
        category :category,
        wishedBook :wishedBook,
        wishedBookAuthor :wishedBookAuthor,
        wishedBookEdition :wishedBookEdition,
        ebId :ebId,
     }
  })
  if(updateExchangePost!=null){
    res.status(200).send("Process Completed Successfully");
 }
 else{
   res.status(204).send("Process could not be completed.");
 }
}

export const transactionExchange =async (req, res) => {
  const transaction= await prisma.exchangeProcess.findMany({
    select:{
      epId:true,
      state:true,
      postAt:true,
     
      exchanger:{
        select:{
          email:true,
        }
      },
      exchangeId:{
        select:{
          soldBy_Email:true,
          b_title:true,
          wishedBook:true,
        }
      }
    }
  });
  const records=[];
  transaction.forEach(record=>{
    const recordObject = {
      epId: record.epId,
      postAt: record.postAt,
      wishedBook: record.exchangeId.wishedBook,
      borrState: record.borrState,
      exchangerEmail: record.exchanger.email,
      soldBy_Email:record.exchangeId.soldBy_Email,
      b_title:record.exchangeId.b_title,
      state:record.state,
    }
    records.push(recordObject);
  })
  res.send(records);

}

export const getAllExchangePost = async (req, res) => {
  const gotExchangePost = await prisma.exchangeableBook.findMany()

  res.send(gotExchangePost);
}








