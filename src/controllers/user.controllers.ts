import axios from "axios";
import type { Request, Response } from "express";
import { google } from "googleapis";
import { oAuth2Client } from "../config/googleClient";


export const getUser = async (req: Request, res: Response) => {
  console.log("GET USER" , req.user);
  
// TODO: GET USER FROM GOOGLE USING THIS ROUTE
  // const accessToken = req.headers.authorization?.split(" ")[1 ;
  // console.log(accessToken);
  // oAuth2Client.setCredentials({access_token: accessToken});
  // const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });

  // const userInfoResponse = await oauth2.userinfo.get();
  // const userInfo = userInfoResponse.data;

  // console.log("User Info:", userInfo);

  // const user = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  // });
  res.json(req.user);
};
