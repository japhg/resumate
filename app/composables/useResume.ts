import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { languages } from "monaco-editor";
import { reactive } from "vue";

export function useResume() {
    const { $db } = useNuxtApp();

    const user = useCurrentUser();
    const resumeRef = doc($db, "resumes", user.value?.uid || 'defaultUser');

    const state = reactive({
        fullName: "Juan Dela Cruz",
        email: "juan.delacruz@example.com",
        phone: "(+63) 912 3456 789",
        location: "Quezon City, Metropolitan Manila",
        summary:
            "Experienced software developer with 5+ years of expertise in building scalable web apps...",
        workingExperiences: [
            {
                jobTitle: "Senior Software Developer",
                company: "XYZ Company Inc.",
                start_date: "",
                end_date: "",
                job_description: "",
            },
        ],
        educations: [
            {
                degree: "Bachelor of Science in Information Technology",
                school: "University of Technology",
                from: "2019",
                to: "2023",
            },
        ],
        skills: [
            {
                title: "Javascript",
            },
        ],
        certifications: [],
        honorsAndAwards: [],
        languages: [],
        references: [],
    });

    const loadResume = () => {
        onSnapshot(resumeRef, (docSnap) => {
            if (docSnap.exists()) {
                Object.assign(state, docSnap.data());
            }
        });
    };

    const saveResume = async () => {
        await setDoc(resumeRef, { ...state }, { merge: true });
    };

    return { state, loadResume, saveResume };
}
