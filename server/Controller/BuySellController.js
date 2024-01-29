import prisma from "../DB/db.config.js";
import upload from '../multer.config.js';
import nodemailer from "nodemailer";

export const createSellPost = async (req, res) => {
  const b_title = req.body.title;
  const b_authorname = req.body.authorname;
  const b_edition = req.body.edition;
  const b_numOfPages = Number(req.body.numOfPages);
  const b_description = req.body.description;
  const b_price = Number(req.body.price);
  const b_quantity = Number(req.body.quantity);
  const category = req.body.category;
  const soldBy_Email = req.body.email;
  const imagePath = req.file ? req.file.path : null;

  const newPost = await prisma.sellingBook.create({
    data: {
      b_title: b_title,
      b_authorname: b_authorname,
      b_edition: b_edition,
      b_numOfPages: b_numOfPages,
      b_description: b_description,
      b_price: b_price,
      b_quantity: b_quantity,
      category: category,
      image: imagePath,
      soldBy_Email: soldBy_Email
    },
  });
  res.send(newPost);
}

export const getBuyPosts = async (req, res) => {
  const posts = await prisma.sellingBook.findMany({
    where: {
      b_quantity: {
        not: 0
      }
    },
    orderBy: {
      b_quantity: 'asc',
    }
  })
  res.send(posts);
}

export const getABook = async (req, res) => {
  const sid = req.params.sid;
  const gotBook = await prisma.sellingBook.findFirst({
    where: {
      sid: Number(sid),
    },
  });
  res.send(gotBook);
}

export const orderPlace = async (req, res) => {
  const quantity = req.body.b_quantity;
  const pickupPoint = req.body.pickupPoint;
  const phone = req.body.phone;
  const takenBy_Email = req.body.takenBy_Email;
  const sbId = req.body.sbID;
  const perPrice = req.body.price;
  const total = Number(quantity) * Number(perPrice);

  console.log(takenBy_Email);

  const findBook = await prisma.sellingBook.findFirst({
    where: {
      sid: Number(sbId)
    }
  })
  if (findBook.b_quantity < Number(quantity)) {

    res.status(205).send("Not enough stock of this book. You can order minimum " + findBook.b_quantity + " books.");
  }
  else {
    const newOrder = await prisma.order.create({
      data: {
        quantity: Number(quantity),
        pickupPoint: pickupPoint,
        phone: phone,
        total: Number(total),
        takenBy_Email: takenBy_Email,
        sbId: Number(sbId),
      }
    })
    if (newOrder != null) {
      const updateMain = await prisma.sellingBook.update({
        where: {
          sid: Number(sbId)
        },
        data: {
          b_quantity: {
            decrement: Number(quantity),
          }
        }

      })
      res.status(200).send(newOrder);
    }
    else
      res.status(204).send("Order not placed.")
  }
}

export const getOrderRequests = async (req, res) => {
  const myMail = req.params.eEmail;
  const results = await prisma.order.findMany({
    select: {
      orderId: true,
      orderedAt: true,
      phone: true,
      takenBy: {
        select: {
          email: true,
        },
      },
      sellbook: {
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
          sellbook: {
            soldBy_Email: myMail,
          },
        },
        { state: "Pending" },
      ],
    },
    orderBy: {
      orderedAt: 'asc',
    }
  });

  const requests = [];
  results.forEach(item => {
    const requestObject = {
      orderId: item.orderId,
      takenBy_Email: item.takenBy.email,
      orderedAt: item.orderedAt,
      phone: item.phone,
      b_title: item.sellbook.b_title,
      b_authorname: item.sellbook.b_authorname,
      b_edition: item.sellbook.b_edition
    };
    requests.push(requestObject);
  })
  if (requests)
    res.status(200).send(requests);
  else
    res.status(204).send("Process could not be completed.");
}


export const deleteOrderProcess = async (req, res) => {
  const orderId = req.params.orderId;
  const gotBook = await prisma.order.findFirst({
    where: {
      orderId: Number(orderId),
    },
  });
  const book = gotBook.sbId;
  const resetAgain = await prisma.sellingBook.update({
    where: {
      sid: Number(book),
    },
    data: {
      b_quantity: {
        increment: Number(gotBook.quantity),
      }
    }
  });
  const deleteProcess = await prisma.order.delete({
    where: {
      orderId: Number(orderId)
    }
  });
  if (deleteProcess != null) {
    res.status(200).send("Process deleted");
  }
  else
    res.status(204).send("Could NOT Delete.");
}

// export const confirmOrderRequest = async(req,res)=>{
//     const orderId=req.params.orderId;
//     const confirm= await prisma.order.update({
//       where:{
//         orderId:Number(orderId),
//       },
//       data:{
//         state:"Confirmed",
//       }
//     });
//     const getBuyerEmail = await prisma.order.findFirst({
//       where:{
//         orderId:Number(orderId),
//       }
//     })
//     console.log(getBuyerEmail.takenBy_Email);
//     if(confirm!=null){
//        res.status(200).send("Process Completed Successfully");
//     }
//     else{
//       res.status(204).send("Process could not be completed.");
//     }
// }

export const confirmOrderRequest = async (req, res) => {
  const orderId = req.params.orderId;
  const confirm = await prisma.order.update({
    where: {
      orderId: Number(orderId),
    },
    data: {
      state: "Confirmed",
    }
  });
  const getBuyerEmail = await prisma.order.findFirst({
    where: {
      orderId: Number(orderId),
    }
  })
  console.log(getBuyerEmail.takenBy_Email);
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
      to: getBuyerEmail.takenBy_Email,
      subject: "Order confirmation mail",
      html: '<h1>Congratulation</h1> <h1> Your order is confirmed</h2>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error", error)
      } else {
        console.log("Email sent:" + info.response);
      }
    })
  } catch (error) {
    console.log(error)
  }

  if (confirm != null) {
    res.status(200).send("Process Completed Successfully");
  }
  else {
    res.status(204).send("Process could not be completed.");
  }
}

export const getMySellPosts = async (req, res) => {
  const soldBy_Email = req.params.eEmail;
  const gotBook = await prisma.sellingBook.findMany({
    where: {
      soldBy_Email: soldBy_Email,
    },
    select: {
      sid: true,
      b_title: true,
      b_authorname: true,
      b_edition: true,
      b_numOfPages: true,
      b_price: true,
      b_quantity: true,
      category: true,
    }
  });
  const result = [];
  gotBook.forEach(item => {
    const requestObject = {
      sid: item.sid,
      b_title: item.b_title,
      b_authorname: item.b_authorname,
      b_edition: item.b_edition,
      b_numOfPages: item.b_numOfPages,
      b_price: item.b_price,
      b_quantity: item.b_quantity,
      category: item.category,
    };

    result.push(requestObject);
  })

  res.send(result);
}

export const getMyPurchase = async (req, res) => {
  const eEmail = req.params.eEmail;
  const gotBook = await prisma.order.findMany({
    where: {
      takenBy_Email: eEmail,
    },
    select: {
      orderId: true,
      orderedAt: true,
      state: true,
      quantity: true,
      pickupPoint: true,
      total: true,
      sellbook: {
        select: {
          b_title: true,
          b_authorname: true,
          b_edition: true,
          soldBy_Email: true,
        }
      }
    }
  })

  const orders = [];
  gotBook.forEach(item => {
    const orderObject = {
      orderId: item.orderId,
      soldBy_Email: item.sellbook.soldBy_Email,
      orderedAt: item.orderedAt,
      quantity: item.quantity,
      b_title: item.sellbook.b_title,
      b_authorname: item.sellbook.b_authorname,
      b_edition: item.sellbook.b_edition,
      pickupPoint: item.pickupPoint,
      total: item.total,
      state: item.state,
    };
    orders.push(orderObject);
  })

  if (orders)
    res.status(200).send(orders);
  else
    res.status(204).send("Process could not be completed.");

};

export const getMySellRecords = async (req, res) => {
  const eEmail = req.params.eEmail;
  const getRecords = await prisma.order.findMany({
    select: {
      orderId: true,
      orderedAt: true,
      takenBy_Email: true,
      pickupPoint: true,
      phone: true,
      quantity: true,
      total: true,
      sbId: true,
      takenBy: {
        select: {
          name: true,
        }
      },
      sellbook: {
        select: {
          b_title: true,
        }
      }
    },
    where: {
      AND: [
        {
          sellbook: {
            soldBy_Email: eEmail,
          },
        },
        { state: "Confirmed" },
      ],
    }
  });
  const records = [];
  getRecords.forEach(record => {
    const recordObject = {
      orderId: record.orderId,
      sbId: record.sbId,
      orderedAt: record.orderedAt,
      takenBy_Email: record.takenBy_Email,
      phone: record.phone,
      pickupPoint: record.pickupPoint,
      quantity: record.quantity,
      total: record.total,
      b_title: record.sellbook.b_title,
      name: record.takenBy.name,
    }
    records.push(recordObject);
  })
  res.send(records);
}

export const editSellPost = async (req, res) => {
  const sid = Number(req.body.sid);
  const b_title = req.body.b_title;
  const b_authorname = req.body.b_authorname;
  const b_edition = req.body.b_edition;
  const b_numOfPages = Number(req.body.b_numOfPages);
  const b_description = req.body.b_description;
  const b_price = Number(req.body.b_price);
  const b_quantity = Number(req.body.b_quantity);
  const category = req.body.category;

  const updateSellPost = await prisma.sellingBook.update({
    where: {
      sid: sid,
    },
    data: {
      b_title: b_title,
      b_authorname: b_authorname,
      b_edition: b_edition,
      b_numOfPages: b_numOfPages,
      b_description: b_description,
      b_price: b_price,
      b_quantity: b_quantity,
      category: category,
    }
  })
  if (updateSellPost != null) {
    res.status(200).send("Process Completed Successfully");
  }
  else {
    res.status(204).send("Process could not be completed.");
  }
}

export const transactionBuySell = async (req, res) => {
  const transaction = await prisma.order.findMany({
    select: {
      orderId: true,
      state: true,
      orderedAt: true,
      total: true,
      pickupPoint: true,
      takenBy: {
        select: {
          email: true,
        }
      },
      sellbook: {
        select: {
          soldBy_Email: true,
          b_title: true,
        }
      }
    }
  });
  const records = [];
  transaction.forEach(record => {
    const recordObject = {
      orderId: record.orderId,
      orderedAt: record.orderedAt,
      takenBy_Email: record.takenBy.email,
      pickupPoint: record.pickupPoint,
      total: record.total,
      soldBy_Email: record.sellbook.soldBy_Email,
      b_title: record.sellbook.b_title,
      state: record.state,
    }
    records.push(recordObject);
  })
  res.send(records);

}

export const getAllBuySellPost = async (req, res) => {
  const gotAllBuySellPost = await prisma.sellingBook.findMany()
  res.send(gotAllBuySellPost);
}