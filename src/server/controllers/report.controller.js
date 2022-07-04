const Report = require('../models/report.model.js');

/**
 * Report list.
 *
 * @returns {Object}
 */

const reportList = async (req, res) => {
      try {
        const report = await Report.find({user: req.user.id});
        return res.status(200).json({message: 'Operation success', report});
      } catch (error) {
        console.log(error)
      }
    };

/**
 * Add Report.
 *
 * @param {string}      client
 * @param {string}      description
 * 
 * @returns {Object}
 */
 const addReport = async (req, res) => {
    try {
        const report = new Report({
          client: req.body.client,
          description: req.body.description, 
        })
        await report.save();
        return res.status(200).json({message:'Report added successfully'});
        
    } catch (error) {
        console.log(error)
    }
 };


 /**
 * Search Report By Client.
 *
 * @param {string}      client
 * 
 * @returns {Object}
 */
 const searchReportByClient = async (req, res) => {
    try {
      const query = req.params.query;
      const result = await Report.find({$text: {$search: query}});
      return res.status(200).send(result);
      
    } catch (error) {
        console.log(error)
    }
};


module.exports = {
    reportList,
    addReport,
    searchReportByClient
};