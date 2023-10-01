const path = require("path");
const data = require('../model/model');

exports.getIndex = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

exports.postData = (req, res, next) => {
    let amount = req.body.amountVal;
    let description = req.body.descriptionVal;
    let category = req.body.categoryVal;
    const expenseData = new data(null, amount, description, category);
    data.create(
        {
            amount: amount,
            description: description,
            category: category
        }
    ).then(result => {
        console.log(result)
        res.redirect('/')
    }).catch(err => console.log(err))
};

exports.getSingleData = (req, res, next) => {
    let id = req.body.id;
    data.findOne({
        where: { id: id }
    }).then(result => {
        const data = result.dataValues;
        console.log(data);
        res.json(data);
    }).catch(err => console.log(err))
};

exports.getData = (req, res, next) => {
    data.findAll().then(data => {
        const ExpenseData = data.map(data => data.dataValues);
        res.json(ExpenseData);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Error in fetching expense data' });
    });
};

exports.deleteExpense = async (req, res, next) => {
    try {
        let id = req.body.id;
        const deletedExpense = await data.destroy({
            where: { id: id }
        });

        if (deletedExpense > 0) {
            res.json({ message: 'Data deleted successfully', Id: id });
        }
        else {
            res.status(404).json({ message: 'Data not found', Id: id });
        }
    }
    catch (error) {
        console.log('Error in deleting data: ', error);
    }
};

exports.updateData = async (req, res, next) => {
    try {
        let id = req.body.id;
        let amount = req.body.amountVal;
        let description = req.body.descriptionVal;
        let category = req.body.categoryVal;
        const expense = await data.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: 'data not found', id });
        }
        expense.amount = amount;
        expense.description = description;
        expense.category = category;
        await expense.save();
        return res.json({ message: 'data updated successfully', id });
    } catch (error) {
        console.error('Error updating data:', error);
        return res.status(500).json({ error: 'Error updating data' });
    }
};