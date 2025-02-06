import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/dbConnect';
import Regard from '../../../models/Regard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === "GET") {
        try {
            const regards = await Regard.find();
            return res.status(200).json({ data: regards });
        } catch (error) {
            console.error("Error getting regards:", error);
            return res.status(500).json({ message: "Error getting regards" });
        }
    }

    if (req.method === "POST") {
        try {
            const { userId, message } = req.body;
            const regard = new Regard({ userId, message });
            await regard.save();
            return res.status(201).json({ message: "Success" });
        } catch (error) {
            console.error("Error saving regard:", error);
            return res.status(500).json({ message: "Error saving regard" });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}