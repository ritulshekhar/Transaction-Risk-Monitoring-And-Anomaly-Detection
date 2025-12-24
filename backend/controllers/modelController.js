const { getModelInfo } = require("../services/modelService");

exports.fetchModelInfo = async (req, res) => {
    const info = await getModelInfo();
    res.json(info);
};
