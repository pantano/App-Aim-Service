const Report = require('../models/report.model.js');

/**
 * Report list.
 *
 * @returns {Object}
 */

const reportList = async (req, res) => {
      try {
        const report = await Report.find({ user: req.auth.id });
        return res.status(200).json({message: 'Operation success'});
      } catch (error) {
        console.log(error)
      }
    };

/**
 * Add Report.
 *
 * @param {string}      client
 * @param {string}      site
 * @param {string}      adress
 * @param {string}      description
 * 
 * @returns {Object}
 */
 const addReport = async (req, res) => {
    try {
        const report = new Report({
            ...req.body,
            user: req.auth.id
        })
        await report.save();
        return res.status(200).json({message:'Report added successfully'});
        
    } catch (error) {
        console.log(error)
    }
 };


module.exports = {
    reportList,
    addReport
};