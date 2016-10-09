const mongoose = require('mongoose');
import {User} from "../entities/User";

const UserSchema = new mongoose.Schema(new User());
module.exports = mongoose.model('User', UserSchema);