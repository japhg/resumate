import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, getStorage, uploadBytes, ref as storageRef } from "firebase/storage";
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
        image: "",
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
        const storage = getStorage();

        if (typeof state.image === "object" && state.image !== null && (state.image as File).type && (state.image as File).size !== undefined) {
            const imageRef = storageRef(storage, `resumes/${user.value?.uid}/profile.jpg`);
            await uploadBytes(imageRef, state.image as File);

            // Get the download URL
            const downloadURL = await getDownloadURL(imageRef);

            // Replace the File object with the Firebase URL
            state.image = downloadURL;
        }

        await setDoc(resumeRef, { ...state }, { merge: true });
    };

    return { state, loadResume, saveResume };
}
