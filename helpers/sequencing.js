const { Counter } = require("../models/sequencing");

const setNextSequence = async (name) => {
    var ret = await Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { new: true }
    );
    console.log('seq: ', ret.seq);
    return ret.seq;
}

module.exports = {
    setNextSequence
}