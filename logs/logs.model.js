const mongoose = require("mongoose");
// const locationSchema = {
//   range: {
//     type: [Number],
//   },
//   country: {
//     type: String,
//   },
//   region: {
//     type: String,
//   },
//   eu: {
//     type: Number,
//     default: 0,
//   },
//   timezone: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
//   ll: {
//     type: [Number],
//     index: "2dsphere",
//   },
//   metro: {
//     type: Number,
//   },
//   area: {
//     type: Number,
//   },
// };

const ErrorLogSchema = new mongoose.Schema(
  {
    error: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: false,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Auth",
    },
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// ErrorLogSchema.index({ type: 1 });

const UserLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Auth",
    },
    data: {
      type: Object,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);
// UserLogSchema.index({ type: 1 });

const AdminLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Auth",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Auth",
    },
    details: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: false,
      default: {},
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// AdminLogSchema.index({ type: 1 });

const ErrorLogModel = mongoose.model("ErrorLog", ErrorLogSchema);
const UserLogModel = mongoose.model("UserLog", UserLogSchema);
const AdminLogModel = mongoose.model("AdminLog", AdminLogSchema);

module.exports = {
  ErrorLogSchema,
  AdminLogSchema,
  UserLogSchema,
  ErrorLogModel,
  AdminLogModel,
  UserLogModel,
};
