'use strict'
const mongoose = require('mongoose'),
    Demo = mongoose.model('demo');

//Returns a promise for search results.
exports.search = (params) =>{
    const promise = Demo.find(params).exec();
    return promise;
};

//save new demo object
exports.save=(demo)=>{
    const newDemo = new Demo(demo);
    return newDemo.save();
};

//Return the demo object by id
exports.get = (demoId)=>{
    const demoPromise = Demo.findById(demoId).exec();
    return demoPromise;
}

//update a demo
exports.update=(updateDemo)=>{
    const promise=Demo.findByIdAndUpdate(updateDemo.id,updateDemo).exec();
    return promise;
};

//delete a demo
exports.delete = (demoId) =>{
    const promise = Demo.findByIdAndDelete(demoId).exec();
    return promise;
};