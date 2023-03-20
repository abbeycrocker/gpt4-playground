import { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const pass = req.body.params.password as string
        bcrypt.compare(pass, process.env.HASH_PASS, function(err, result) {
            res.status(200).json({ result })
        });
    }
    catch {
        res.status(500).json({ data: "Error" })
    }
}
