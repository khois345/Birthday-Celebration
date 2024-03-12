import BirthdayCake from "@/components/BirthdayCake";
import { useUser } from "@/context/userContext";

export default function CelebrationPageContent() {
    const { name, regard } = useUser();

    return (
        <div className="items-center justify-center flex flex-col text-white">
            <h1>Happy Birthday, {name}!</h1>
            <p className="pb-2">{regard}</p>
            <BirthdayCake />
        </div>
    );
}