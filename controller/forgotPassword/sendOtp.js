import patientModel from "../../models/patient.model.js";
import careTakerModel from "../../models/careTaker.model.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sameerv314@gmail.com",
    pass: "ciio yyve vfle mslo",
  },
});

const handleSendOtp = async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.sendStatus(400);
  }

  const otp = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const mailOptions = {
    from: "sameerv314@gmail.com",
    to: `${email}`,
    subject: "OTP for password reset",
    text: `OTP ${otp}`,
  };

  if (role.toLowerCase() == "patient") {
    try {
      const foundPatient = await patientModel.findOne({ email: email });
      if (!foundPatient) {
        return res.status(404).json({ message: "Email does not exist" });
      }

      foundPatient.otp = otp;
      await foundPatient.save();

      const info = await transporter.sendMail(mailOptions);
      console.log(info.response);
      return res.status(200).json({id:foundPatient._id,role:role});
    } catch (err) {
      return res.sendStatus(500);
    }
  } else if (role.toLowerCase() == "caretaker") {
    try {
      const foundCareTaker = await careTakerModel.findOne({ email: email });
      if (!foundCareTaker) {
        return res.status(404).json({ message: "Email does not exist" });
      }

      foundCareTaker.otp = otp;
      await foundCareTaker.save();

      const info = await transporter.sendMail(mailOptions);
      console.log(info.response);
      return res.status(200).json({id:foundCareTaker._id,role:role});
    } catch (err) {
      return res.sendStatus(500);
    }
  } else {
    return res.status(404).json({ message: "Invalid Role" });
  }
}

export default handleSendOtp;