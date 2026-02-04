import mongoose, { Schema} from "mongoose"

const doctorFollowSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

/*
* Prevent duplicate follows
 * Same patient cannot follow same doctor twice
*/

doctorFollowSchema.index(
    {
        doctor: 1,
        patient: 1,
    },
    {
        unique: true
    }
)

export const DoctorFollow = mongoose.model("DoctorFollow", doctorFollowSchema)
