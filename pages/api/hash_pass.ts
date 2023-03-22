import { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const hash_pass = process.env.HASH_PASS
        if (!hash_pass) {
            console.log("No hash pass")
            return
        }
        const pass = req.body.params.password as string
        console.log(pass)
        console.log(hash_pass)
        const result = await bcrypt.compare(pass, hash_pass)
        res.status(200).json({ result });
    }
    catch {
        res.status(500).json({ data: "Error" })
    }
}
