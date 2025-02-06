import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/dbConnect';
import Regard from '../../../models/Regard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    const { id } = req.query;

    if (req.method === "PUT") {
        try {
            const { message } = req.body;
            const updatedRegard = await Regard.findByIdAndUpdate(id, { message }, { new: true });
            if (!updatedRegard) {
                return res.status(404).json({ message: "Regard not found" });
            }

            return res.status(200).json({ data: updatedRegard });
        } catch (error) {
            console.error("Error updating regard:", error);
            return res.status(500).json({ message: "Error updating regard" });
        }
    } 

    if (req.method === "DELETE") {
        try {
            const deletedRegard = await Regard.findByIdAndDelete(id);
            if (!deletedRegard) {
                return res.status(404).json({ message: "Regard not found" });
            }

            return res.status(200).json({ message: "Success" });
        } catch (error) {
            console.error("Error deleting regard:", error);
            return res.status(500).json({ message: "Error deleting regard" });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}