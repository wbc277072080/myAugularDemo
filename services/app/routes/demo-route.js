'use strict'

const demoController = require('../controllers/demo-controller');

module.exports=(app)=>{
    app.route('/demos')
        .get(demoController.list)
        .post(demoController.save);
    
    app.route('/demos/:id')
        .get(demoController.get)
        .put(demoController.update)
        .delete(demoController.delete);
};