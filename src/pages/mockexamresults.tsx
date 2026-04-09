import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TopicStat = {
    name: string;
    total: number;
    correct: number;
};

const buildTopicStats = (topicNames: string[], totalQuestions: number, correctAnswers: number): TopicStat[] => {
    const topicCount = topicNames.length;
    const baseTotalPerTopic = Math.floor(totalQuestions / topicCount);
    const extraTotalSlots = totalQuestions % topicCount;
    const baseCorrectPerTopic = Math.floor(correctAnswers / topicCount);
    const extraCorrectSlots = correctAnswers % topicCount;

    return topicNames.map((name, index) => {
        const total = baseTotalPerTopic + (index < extraTotalSlots ? 1 : 0);
        const tentativeCorrect = baseCorrectPerTopic + (index < extraCorrectSlots ? 1 : 0);

        return {
            name,
            total,
            correct: Math.min(total, tentativeCorrect),
        };
    });
};

export default function MockExamResultsPage(){
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();
    const totalQuestions = 80;
    const correctAnswers = 52;
    const totalTime = "01:24:36";
    const hintsUsed = 7;
    const averageTimePerQuestion = "01:03";
    const examSetupSummary = {
        examType: "AM EXAM" as "AM EXAM" | "PM EXAM",
        isTimed: true,
        durationMinutes: 90,
        questionCount: 80,
        instantAnswers: false,
        selectedCategories: ["Technology", "Management", "Strategy"],
        selectedTopicCount: 23,
    };
    const categoryBreakdown = [
        {
            name: "Technology",
            correct: 33,
            total: 50,
            topics: buildTopicStats([
                "Number Systems & Data Representation",
                "Applied Mathematics",
                "Discrete Math & Algorithms",
                "Computer Architecture & Hardware",
                "Operating Systems",
                "Digital Logic",
                "Computer Graphics",
                "Databases",
                "Networking",
                "Cybersecurity",
                "Software Engineering & Design",
                "Software Testing",
                "Emerging Technologies",
            ], 50, 33),
        },
        {
            name: "Management",
            correct: 9,
            total: 15,
            topics: buildTopicStats([
                "Project Management",
                "IT Service Management (ITSM)",
                "System Auditing",
                "Quality Management",
                "Corporate Finance",
            ], 15, 9),
        },
        {
            name: "Strategy",
            correct: 10,
            total: 15,
            topics: buildTopicStats([
                "Business Strategy",
                "System Strategy",
                "IT Governance & Compliance",
                "Law & Intellectual Property",
                "Digital Trends",
            ], 15, 10),
        },
    ];

    const toggleCategory = (categoryName: string) => {
        setOpenCategories((current) => ({
            ...current,
            [categoryName]: !current[categoryName],
        }));
    };

    return(
        <>
        <div className="py-10 md:py-0 md:min-h-screen flex md:w-full flex-col items-center bg-white gap-4 md:gap-10 select-none">
            <NavBar></NavBar>
            <div className='w-full min-h-[78vh] md:h-[78vh] px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32'>
                <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <section className="h-auto md:h-full flex flex-col justify-center items-stretch lg:items-start px-2 sm:px-4 md:px-10">
                        <div className="flex items-end gap-3 sm:gap-5">
                        <h1 className="text-7xl sm:text-8xl md:text-9xl leading-none font-bold">
                            {correctAnswers}
                        </h1>
                        <h1 className="font-semibold text-2xl sm:text-3xl text-black opacity-50">
                            /{totalQuestions}
                        </h1>
                        </div>

                        <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-5 w-full lg:max-w-sm">
                            <div className="flex items-baseline justify-between border-b pb-2">
                                <p className="text-sm uppercase tracking-wide opacity-60">Score</p>
                                <p className="text-2xl sm:text-3xl font-bold">{correctAnswers}/{totalQuestions}</p>
                            </div>
                            <div className="flex items-baseline justify-between border-b pb-2">
                                <p className="text-sm uppercase tracking-wide opacity-60">Total Time</p>
                                <p className="text-2xl sm:text-3xl font-bold">{totalTime}</p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 w-full lg:max-w-md">
                            <h2 className="text-sm uppercase tracking-wide opacity-60">Exam Setup Summary</h2>
                            <div className="flex items-baseline justify-between border-b pb-2 gap-4">
                                <p className="text-sm opacity-70">Exam Type</p>
                                <p className="text-lg sm:text-xl font-bold text-right">{examSetupSummary.examType}</p>
                            </div>
                            <div className="flex items-baseline justify-between border-b pb-2 gap-4">
                                <p className="text-sm opacity-70">Timer</p>
                                <p className="text-lg sm:text-xl font-bold text-right">
                                    {examSetupSummary.isTimed ? "Timed" : "Not timed"}
                                </p>
                            </div>
                            <div className="flex items-baseline justify-between border-b pb-2 gap-4">
                                <p className="text-sm opacity-70">Duration</p>
                                <p className="text-lg sm:text-xl font-bold text-right">
                                    {examSetupSummary.isTimed ? `${examSetupSummary.durationMinutes} mins` : "No limit"}
                                </p>
                            </div>
                            <div className="flex items-baseline justify-between border-b pb-2 gap-4">
                                <p className="text-sm opacity-70">Questions</p>
                                <p className="text-lg sm:text-xl font-bold text-right">{examSetupSummary.questionCount}</p>
                            </div>
                            <div className="flex items-baseline justify-between border-b pb-2 gap-4">
                                <p className="text-sm opacity-70">Answer Reveal</p>
                                <p className="text-lg sm:text-xl font-bold text-right">
                                    {examSetupSummary.instantAnswers ? "Instant" : "No reveal"}
                                </p>
                            </div>
                            <div className="flex items-baseline justify-between border-b pb-2 gap-4">
                                <p className="text-sm opacity-70">Categories</p>
                                <p className="text-lg sm:text-xl font-bold text-right">
                                    {examSetupSummary.selectedCategories.length === 3
                                        ? "All categories"
                                        : examSetupSummary.selectedCategories.join(", ")}
                                </p>
                            </div>
                            <div className="flex items-baseline justify-between border-b pb-2 gap-4">
                                <p className="text-sm opacity-70">Topics Selected</p>
                                <p className="text-lg sm:text-xl font-bold text-right">{examSetupSummary.selectedTopicCount}</p>
                            </div>
                        </div>
                    </section>

                    <section className="h-auto md:h-full p-4 sm:p-6 md:p-8 flex flex-col gap-6">
                        <h2 className="text-2xl sm:text-3xl font-light">PASAR! for now...</h2>

                        <div className="flex flex-col gap-4 md:flex-1 md:min-h-0">
                            <h3 className="text-sm uppercase tracking-wide opacity-60">Correct Answers by Category</h3>
                            <div className="flex flex-col gap-3 md:overflow-y-auto pr-1">
                                {categoryBreakdown.map((category) => {
                                    const isOpen = Boolean(openCategories[category.name]);

                                    return (
                                        <div key={category.name} className="border-b pb-2">
                                            <button
                                                type="button"
                                                onClick={() => toggleCategory(category.name)}
                                                className="w-full flex items-center justify-between cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <p className="text-base md:text-lg">{category.name}</p>
                                                    <CaretDownIcon
                                                        className={`h-4 w-4 opacity-70 transition-transform duration-300 ease-out ${
                                                            isOpen ? "rotate-180" : "rotate-0"
                                                        }`}
                                                        weight="bold"
                                                    />
                                                </div>
                                                <p className="text-xl sm:text-2xl font-bold">{category.correct}/{category.total}</p>
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-out ${
                                                    isOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                            >
                                                <ul className="mt-3 flex flex-col gap-2 text-sm md:text-base opacity-75">
                                                    {category.topics.map((topic) => (
                                                        <li key={topic.name} className="flex items-start sm:items-center justify-between gap-2 sm:gap-4 border-b border-black/10 pb-1">
                                                            <span className="pr-2">{topic.name}</span>
                                                            <span className="font-semibold whitespace-nowrap">{topic.correct}/{topic.total}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-2 md:mt-auto flex flex-col gap-3">
                            <div className="flex items-baseline justify-between border-b pb-2">
                                <p className="text-sm uppercase tracking-wide opacity-60">Hints Used</p>
                                <p className="text-xl sm:text-2xl font-bold">{hintsUsed}</p>
                            </div>
                            <div className="flex items-baseline justify-between border-b pb-2">
                                <p className="text-sm uppercase tracking-wide opacity-60">Avg Time per Question</p>
                                <p className="text-xl sm:text-2xl font-bold">{averageTimePerQuestion}</p>
                            </div>

                            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => navigate("/mockexamprep")}
                                    className="w-full border-2 border-black bg-black text-white font-bold py-3 px-4 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
                                >
                                    TAKE TEST AGAIN
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="w-full border-2 border-black bg-white text-black font-bold py-3 px-4 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
                                >
                                    GO HOME
                                </button>
                            </div>
                        </div>
                    </section>
                    </div>
                </div>
            <Footer></Footer>
        </div>
        </>
    )
}