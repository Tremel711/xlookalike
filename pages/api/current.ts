import serveAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
if(req.method !== 'GET') {
    return res.status(405).end()
}

try {
// extract the curretns user from library
// is gonna use the server auth to get teh session from req 
const currentUser = await serveAuth(req);

return res.status(200).json(currentUser);

    
} catch (error) {
    console.log(error);    
    return res.status(400).end();
}
}