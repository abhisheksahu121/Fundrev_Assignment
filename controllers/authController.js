import investorModel from "../models/investorModel.js";
import startupModel from "../models/startupModel.js";
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import csv from 'csv-parser';
import fs from 'fs-extra';

export const investorregisterController = async (req,res) => {
    try {
        const {userName, password} = req.body;
        // validate
        if(!userName)
        {
            return res.send({message:'userName is Required'});
        }
        if(!password)
        {
            return res.send({message:'Password is required'});
        }
         //check user
         const exisitingUser = await investorModel.findOne({userName});
          //exisiting user
        if(exisitingUser)
        {
            return res.status(200).send({
                success:true,
                message: 'Already Register please login',
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new investorModel({
            userName,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success:true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
    })
}
}

export const startupregisterController = async (req, res) => {
    try {
        const {userName,password,companyName,businessDescription,revenue} = req.body
        //validation
        if(!userName)
        {
            return res.send({message:'userName is Required'});
        }
        if(!password)
        {
            return res.send({message:'password is required'});
        }
        if(!companyName)
        {
            return res.send({message:'companyName is required'});
        }
        if(!businessDescription)
        {
            return res.send({message:'businessDescription is required'});
        }
        if(!revenue)
        {
            return res.send({message:'revenue is required'});
        }
        //check user
        const exisitingUser = await startupModel.findOne({userName})
        //exisiting user
        if(exisitingUser)
        {
            return res.status(200).send({
                success:false,
                message: 'Already Register please login',
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new startupModel({
            userName,
            password: hashedPassword,
            companyName,
            businessDescription,
            revenue
        }).save();

        res.status(201).send({
            success:true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }

};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const {userName,password} = req.body;
        //validation
        if(!userName || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid userName or password"
            })
        }
        //check user
        const investoruser = await investorModel.findOne({userName});
        const startupuser = await startupModel.findOne({userName});
        if(!investoruser || !startupuser)
        {
            return res.status(404).send({
                success: false,
                message: "userName is not registerd"
            })
        }
        const match1 = await comparePassword(password,investoruser.password)
        const match2 = await comparePassword(password,startupuser.password)
        if(!match1 || !match2)
        {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }
        res.status(200).send({
            success:true,
            message: "login successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
};

//test controller
export const testController = (req, res) =>{
    res.send("protected Routes");

}

//upload-file controller
export const uploadfileController = (req, res) => {
    console.log("inside uploadfilecontroller");
    try {
        const salesData = [];
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on('data', (row) => {
            // Process CSV data
            salesData.push(row);
          })
          .on('end', () => {
            // Remove uploaded file
            fs.unlinkSync(req.file.path);
            res.json({ message: 'Sales data uploaded successfully', data: salesData });
          });
      } catch (error) {
        console.error('Error uploading sales data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

// data for the startup details
let startupDetails = [
    {
      companyName: 'Amazon',
      businessDescription: 'Product based',
      revenue: '10 cr'
    },
    {
      companyName: 'Infosys',
      businessDescription: 'Service based',
      revenue: '5 cr'
    }
  ];
export const detailsController = (req,res) => {
    try {
        // Return the startup details
        res.json(startupDetails);
      } catch (error) {
        console.error('Error fetching startup details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
export const interestedController = (req,res) => {
    try {
        console.log('Investor is interested in the startup.');
        res.status(200).json({ message: 'Interest shown successfully.' });
      } catch (error) {
        console.error('Error showing interest:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}