const { Schema, model } = require("mongoose");

const Tasks = new Schema(
    {
        title: { type: String, required: true },
        contributor: { type: String, required: true },
        status: { type: String, required: true },
        time: { type: Array, required: true },
        description: { type: String, required: true },
        correlation: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = model("Tasks", Tasks);
