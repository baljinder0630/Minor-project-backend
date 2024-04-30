import patientModel from "../../models/patient.model.js";
import careTakerModel from "../../models/careTaker.model.js";

const handleVerifyOtp = async (req,res) => {
  const{id,role,otp} = req.body;

  if(!id || !role || !otp){
    return res.sendStatus(400);
  }

  if(role.toLowerCase() == "patient"){
    try{
      const foundPatient = await patientModel.findById({_id:id});
      if(foundPatient.otp == otp){
        foundPatient.otp = "";
        await foundPatient.save();
        return res.status(200).json({id:id,role:role});
      }
      return res.status(403).json({message:"OTP is not correct"});
    }
    catch(err){
      console.error(err);
      return res.sendStatus(500);
    }
  }
  else if(role.toLowerCase() == "caretaker"){
    try{
      const foundCareTaker = await careTakerModel.findById({_id:id});
      if(foundCareTaker.otp == otp){
        foundCareTaker.otp = "";
        await foundCareTaker.save();
        return res.status(200).json({id:id,role:role});
      }
      return res.status(403).json({message:"OTP is not correct"});
    }
    catch(err){
      console.error(err);
      return res.sendStatus(500);
    }
  }
  else{
    return res.status(404).json({message:"Invalid Role"});
  }
}

export default handleVerifyOtp;