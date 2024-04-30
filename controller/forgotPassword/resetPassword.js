import bcrypt from "bcrypt";
import patientModel from "../../models/patient.model.js";
import careTakerModel from "../../models/careTaker.model.js";

const handleResetPassword = async (req, res) => {
  const { id, role, password } = req.body;

  if (!id || !role || !password) {
    return res
      .status(400)
      .json({ message: "Id, Role and new password are required" });
  }

  if (role.toLowerCase() == "patient") {
    try {
      const foundPatient = await patientModel.findById(id);
      if (!foundPatient) {
        return res
          .status(403)
          .json({ message: "Patient does not exist with given id" });
      }

      const newPassword = await bcrypt.hash(password, 10);
      foundPatient.password = newPassword;
      await foundPatient.save();
      return res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
      console.error(err);
      return res.status(500);
    }
  } else if (role.toLowerCase() == "caretaker") {
    try {
      const foundCareTaker = await careTakerModel.findById(id);
      if (!foundCareTaker) {
        return res
          .status(403)
          .json({ message: "Care Taker does not exist with given id" });
      }

      const newPassword = await bcrypt.hash(password, 10);
      foundCareTaker.password = newPassword;
      await foundCareTaker.save();
      return res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
      console.error(err);
      return res.status(500);
    }
  } else {
    return res.status(404).json({ message: "Invalid Role" });
  }
}

export default handleResetPassword;