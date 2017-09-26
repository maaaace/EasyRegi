'use strict';

/**
 * Module dependencies
 */
var applicantController = require('../controllers/applicant.controller');

module.exports = function (app) {
     app.route('/applicant/preview')
        .get(applicantController.renderPreviewPage);
     app.route('/api/applicant/export')
        .post(applicantController.exportApplicants)
        .get(applicantController.exportApplicants);
};
