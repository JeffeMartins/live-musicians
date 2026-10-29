require('dotenv/config');
const express=require('express');const cors=require('cors');const helmet=require('helmet');const mongoose=require('mongoose');
const app=express();app.use(helmet());app.use(cors({origin:process.env.CORS_ORIGIN || 'http://localhost:5173'}));app.use(express.json({limit:'16kb'}));app.use(require('./routes'));
app.use((error,req,res,next)=>res.status(error.status || 500).json({error:error.status ? error.message : 'Request could not be completed'}));
async function start(){await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/developers',{serverSelectionTimeoutMS:5000});const server=app.listen(Number(process.env.PORT || 3333));const close=()=>server.close(()=>mongoose.disconnect());process.once('SIGTERM',close);process.once('SIGINT',close);}
if(require.main === module)start().catch(()=>{console.error('Could not start API.');process.exitCode=1;});module.exports=app;
