import { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt'

const hashedPass = "$2b$10$z1oekI3DcQAImTfaJIpyQePfSrbGlRmEueRB4GDItFo2XgkOVFrdm"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const pass = req.body.params.password as string
        bcrypt.compare(pass, hashedPass, function(err, result) {
            res.status(200).json({ result })
        });
    }
    catch {
        res.status(500).json({ data: "Error" })
    }
}