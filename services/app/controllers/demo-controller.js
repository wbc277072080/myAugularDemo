'use strict';

const { request, response } = require('express');
const demoService = require('../services/demo-service');


//set response for demo search
exports.list=(request,response)=>{
    const totalQuery = request.query.total;
    const params={};
    if(totalQuery){
        params.total=totalQuery;
    }
    const promise = demoService.search(params);
    const result = (demos)=>{
        response.status(200);
        response.json(demos);
    };
    promise
    .then(result)
    .catch(renderErrorResponse(response));
};

//creat a new demo and sets the response
exports.save=(request,response)=>{
    const demo = Object.assign({},request.body);
    const result = (savedDemo)=>{
        response.status(201);
        response.json(savedDemo);
    };
    const promise = todoService.save(demo);
    promise
    .then(result)
    .catch(renderErrorResponse(response));
};

//return todo response
exports.get = (request, response) => {
    const demoId = request.params.id;
    const result = (demo) => {
        response.status(200);
        response.json(demo);
    };
    const promise = todoService.get(demoId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

//update demo resourse
exports.update = (request, response) => {
    const demoId = request.params.id;
    const updatedDemo= Object.assign({}, request.body);
    updatedDemo.id = demoId;
    updatedDemo.modifiedDate = Date.now();
    const result = (demo) => {
        response.status(200);
        response.json(demo);
    };
    const promise = demoService.update(updatedDemo);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

//delete demo resourse
exports.delete = (request, response) => {
    const demoId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message: "Successfully Deleted."
        });
    };
    const promise = demoService.delete(demoId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

//error
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};