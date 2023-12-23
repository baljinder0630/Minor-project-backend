import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    
    const { token } = req.body;
    try {
    
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err,decoded)=>{
                if(err){
                    return res.status(404).json({success:false,message:"Invalid token"})
                }
                else{
                    console.log(decoded)
                    return res.status(200).json({success:true,message:"Valid token"})
                }
                
            }
        )
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
export default verifyToken