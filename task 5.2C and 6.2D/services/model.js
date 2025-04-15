const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;

