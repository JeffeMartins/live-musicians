const axios=require('axios');const Dev=require('../models/Dev');const parse=require('../utils/ParseStringAsArray');const coordinates=require('../utils/validateCoordinates');
module.exports={
 async index(req,res){return res.json(await Dev.find().limit(100));},
 async store(req,res){
  const {github_username,techs,latitude,longitude}=req.body;
  if(typeof github_username!=='string' || !/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(github_username))return res.status(400).json({error:'Invalid GitHub username'});
  const location={type:'Point',coordinates:coordinates(latitude,longitude)};const technologies=parse(techs);
  if(!technologies.length)return res.status(400).json({error:'Provide at least one technology'});
  const existing=await Dev.findOne({github_username});if(existing)return res.json(existing);
  const {data}=await axios.get('https://api.github.com/users/'+encodeURIComponent(github_username),{timeout:5000});
  const dev=await Dev.create({github_username,name:data.name || data.login,avatar_url:data.avatar_url,bio:data.bio,techs:technologies,location});return res.status(201).json(dev);
 }
};
