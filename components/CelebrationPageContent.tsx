import BirthdayCake from "@/components/BirthdayCake";

export default function CelebrationPageContent() {
    return (
        <div className="items-center justify-center flex flex-col text-white">
            <h1>Happy Birthday</h1>
            <p className="pb-2">Wishing you a wonderful day and a year filled with happiness!</p>
            <BirthdayCake />
        </div>
    );
}