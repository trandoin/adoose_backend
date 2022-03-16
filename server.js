const express = require('express');
const dotenv = require('dotenv'); 
const Razorpay = require('razorpay')
const shortid = require('shortid')
const port = process.env.PORT || 5000 ;                
 // Server Port : 5000
const socket = require('socket.io');
const morgan = require('morgan');                       // Calculate time took to execute the request and logs it
                      // .env file support
const cors = require('cors');                           // Cross Origin resource sharing : needed to setup project.
const mongoose = require('mongoose');  
const jwt = require('jsonwebtoken');                 // Mongoose package
// const { verifyJWT } = require('./middlewares/verifyJWT');
const socketAddressesHashmap = new Map();
const scoketAddressChat = new Map();
const SaveVideoCallData = new Map();
const app = express();                                  // Creating app

app.use(cors());                                        // CORS setup
dotenv.config();                                        // Config dotenv file
app.use(morgan('tiny'));                                // HTTP request logger == morgan

const userModule = require('./routes/User');
const profileModule = require('./routes/Profile');
const user2 = require('./models/user2');
const Posts = require('./routes/Posts');
const Chats = require('./routes/Chats');
const Notififi = require('./models/Notififi');
const Rating = require('./routes/Rating');
const Report = require('./routes/Report');
const AdminAuthRoute = require('./routes/AdminAuthRoute')
const {addNotificationFunction} = require('./controllers/Notifications');

const NotificationRoute = require("./routes/Notifications");
const Search = require('./routes/Search');
const {addChat,allRead} = require('./controllers/Functions/Chats');
const Follow = require('./routes/Follow');
const AccountRoute = require('./routes/AccountRoute');
const Orders = require('./routes/Orders');
// Mongoose Connection
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connnected to DB')
);

app.use(express.json());                                         // Identifies incoming request objects as JSON objects
app.use(express.urlencoded({extended:true}));                    // Identifies incoming request objects as Strings and Arrays
app.use(express.json({limit: '500MB'}));                         // size of the request
app.use(express.urlencoded({limit: '500MB'}));

// Razorpay Payment gh

const razorpay = new Razorpay({
	key_id: process.env.Razorpay_key_id,
	key_secret: process.env.Razorpay_key_secret
})

let order_id =null;

 app.post("/payment/verify",(req,res)=>{
     console.log(req.body)
  let body=order_id + "|" + req.body.razorpay_payment_id;
 
   var crypto = require("crypto");
   var expectedSignature = crypto.createHmac('sha256', razorpay.key_secret)
                                   .update(body.toString())
                                   .digest('hex');
                                   console.log("sig received " ,req.body.razorpay_signature);
                                   console.log("sig generated " ,expectedSignature);
   var response = {"signatureIsValid":"false"}
   if(expectedSignature === req.body.razorpay_signature)
    response={"signatureIsValid":"true"}
       res.send(response);
   });

app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	var amount = req.body.Fee
	const currency = 'INR'
	const options = {
		amount: amount *100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}
   
	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
        order_id = response.id;
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})



app.post('/checkUserValidation',verifyJWT,async(req,res)=>{
    return res.status(200).json("Valid Token");
});

app.use('/user',userModule);
app.use('/profile',profileModule);
app.use('/feed', Posts);
app.use('/chats',Chats);
app.use('/Notifications',NotificationRoute);
app.use('/Search',Search);
app.use('/rate',Rating);
app.use('/follow',Follow);
app.use('/api/auth',AdminAuthRoute)
app.use('/report',Report);
app.use('/account',AccountRoute)
app.use('/orders',Orders)
var server = app.listen(port, ()=>{console.log("Server Running...")});       // Listening to PORT 5000

var io = socket(server,{
    cors:{
                origin:"*",
                methods:["GET","POST"]
            }
});

// Socket IO ka hashmap;
io.on('connection',(socket)=>{
    
    socket.emit("me",socket.id);
    socket.emit("meInChat",socket.id);

    socket.on('saveUsername',(data)=>{
        socketAddressesHashmap[data.Username] = data.id;
        console.log(socketAddressesHashmap);
    })

    socket.on('saveUsernameInChat',(data)=>{
        scoketAddressChat[data.Username] = data.id;
        console.log(scoketAddressChat);
    })

    socket.on('sendMsg',async(data)=>{
        io.to(scoketAddressChat[data.person]).emit("recieveMsg",data);
        await addChat({P1:data.person,P2:data.from,msg:data.msg});
        io.to(scoketAddressChat[data.from]).emit('sendMsgInOwner',data);
        console.log(data);
    });

    socket.on('markRead',async({P1,P2})=>{
        console.log(P1,P2)
        await allRead({P1:P1,P2:P2});
    })

    socket.on("disconnect", ()=>{
        socket.broadcast.emit("CallEnded");
    });

    socket.on("remindmeVideocall",(data)=>{
        let connector = `${data.other}$${data.user}`;
        console.log("Accessing ",connector);
        const data1 = SaveVideoCallData.get(connector);
        if(!data1)
        {
            io.to(socketAddressesHashmap[data.user]).emit("callUser", {data:'none'});
            console.log("This is bad");
            return ;
        }
        io.to(socketAddressesHashmap[data.user]).emit("callUser", {data:'yes',signal:data1.signal, from:data1.from, name:data1.name});
    })

    socket.on("callUser",async(data)=>{

        console.log(Date.now());
        
        console.log(data.otherPerson);
        const zxz = await Notififi.findOne({Username : data.otherPerson})
        
        connector = `${data.from}$${data.otherPerson}`;
        console.log("Saving in ",connector);
        if(!zxz)
        {
            await Notififi.create({Username:data.otherPerson});
            await addNotificationFunction(data.otherPerson,`${data.name} wants to call you. Click to Attend$${Date.now()}$call`)
            
            const dataToSave = {signal:data.signalData, from:data.from, name:data.name};
            SaveVideoCallData.set(connector,dataToSave);
            
            io.to(socketAddressesHashmap[data.otherPerson]).emit("callUser", {data:'yes',signal:data.signalData, from:data.from, name:data.name});
            
        }
        else
        {
            console.log("In server : ",data.userToCall);
            await addNotificationFunction(data.otherPerson,`${data.name} wants to call you. Click to Attend$${Date.now()}$call`)
            const dataToSave = {signal:data.signalData, from:data.from, name:data.name};
            
            SaveVideoCallData.set(connector,dataToSave);
            io.to(socketAddressesHashmap[data.otherPerson]).emit("callUser", {data:'yes',signal:data.signalData, from:data.from, name:data.name});
        }
        
        
    })
    
    socket.on("answerCall", (data)=>io.to(socketAddressesHashmap[data.to]).emit("callAccepted",data.signal));

    socket.on("sendNotification",async(data)=>{
        io.to(data.to).emit("notificationsSend",)
    })
})
