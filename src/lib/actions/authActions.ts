"use server";

import Patient from "@/models/patient";
import mongoose from "mongoose";
import { Cookie } from 'universal-cookie';

import bcrypt from "bcrypt";
import {
  compileActivationTemplate,
  compileResetPassTemplate,
  sendMail,
} from "../mail";
import { signJwt, verifyJwt } from "../jwt";
import Doctor from "@/models/doctor";
import connect from "../md";
import { error } from "console";


export async function registerUser(user:any) {

  connect()

  let result;


  if (user.role == "Doctor"){
    result = await Doctor.findOne({email: user.email})
    if (result.isVerified) throw new Error("user exist ")
    result = await Doctor.create({...user, password: await bcrypt.hash(user.password, 10),})
  }else{
    result = await Patient.findOne({email: user.email})
    if (result?.isVerified) throw new Error("user exist ")
    result = await Patient.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
  })
    
  }


  const jwtUser = signJwt({
    id: result._id,
    role: result.role,
  });


  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUser}`;
  const body = compileActivationTemplate(user.fullName, activationUrl);
  await sendMail({ to: user.email, subject: "Activate Your Account", body });

}



type ActivateUserFunc = (
  jwtUser: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFunc = async (jwtUser) => {
  const payload = verifyJwt(jwtUser);
  console.log("payload", payload)
  const userId = payload?.id;
  const userRole = payload?.role;
  connect()

  let user;

  if (userRole == "Doctor"){
    user = await Doctor.findById(userId)
  }else{
    user = await Patient.findById(userId);
  }

  if (!user) return "userNotExist";
  if (user.isVerified) return "alreadyActivated";


  if (userRole == "Doctor"){
    await Doctor.findByIdAndUpdate(userId, {isVerified: true})
  }else{
    await Patient.findById(userId, {isVerified: true});
  }
  return "success";
};

export async function forgotPassword(data : any) {

  connect()

  let user;
  if (data.role == "Doctor"){
    user = await Doctor.findOne({email: data.email})
  }else{
    user = await Patient.findOne({email: data.email})
  }

  if (!user) throw new Error("The User Does Not Exist!");

  //  Send Email with Password Reset Link
  const jwtUser= signJwt({
    id: user._id,
    role: user.role,
  });

  console.log("jwt", jwtUser);

  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUser}`;
  const body = compileResetPassTemplate(user.fullName, resetPassUrl);
  const sendResult = await sendMail({
    to: user.email,
    subject: "Reset Password",
    body: body,
  });
  return sendResult;
}



type ResetPasswordFucn = (
  jwtUserId: string,
  password: string
) => Promise<"userNotExist" | "success">;

export const resetPassword: ResetPasswordFucn = async (jwtUser, password) => {
  const payload = verifyJwt(jwtUser);
  if (!payload) return "userNotExist";
  

  const userId = payload.id;
  const userRole = payload.role;

  connect()
  let user;
  if (userRole == "Doctor"){
    user = await Doctor.findById(userId)
  }else{
    user = await Patient.findById(userId)  
  }
  if (!user) return "userNotExist";


  if (userRole == "Doctor"){
    user = await Doctor.findByIdAndUpdate(userId,{password: await bcrypt.hash(password, 10)})
  }else{
    user = await Patient.findByIdAndUpdate(userId,{password: await bcrypt.hash(password, 10)})
  }
  
  if (user) return "success";
  else throw new Error("Something went wrong!");
};


