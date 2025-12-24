const { getModelInfo } = require("../services/modelService");

exports.fetchModelInfo = (req, res) => {
    res.json(getModelInfo());
};
