import BirthdayCake from "@/components/BirthdayCake";
import { useUser } from "@/context/userContext";

export default function CelebrationPageContent() {
    const { name, regard } = useUser();

    return (
        <div className="items-center justify-center flex flex-col text-white">
            <h1 className="text-3xl font-bold mb-2 mt-4">Happy Birthday, {name}!</h1>
            <div className="max-w-md mx-auto"> {/* Centered container with maximum width of 500px */}
                <p className="text-lg mb-4 whitespace-normal break-words">{regard}</p>
            </div>
            <BirthdayCake />
        </div>
    );
}