<script setup lang="ts">
const props = defineProps<{
  state: any;
}>();

const addExperience = () => {
  props.state.workingExperiences.push({
    jobTitle: "",
    company: "",
    start_date: "",
    end_date: "",
    job_description: "",
  });
};

const removeExperience = (key: number) => {
  props.state.workingExperiences.splice(key, 1);
};

const addEducation = () => {
  props.state.educations.push({
    degree: "",
    school: "",
    from: "",
    to: "",
  });
};

const removeEducation = (key: number) => {
  props.state.educations.splice(key, 1);
};

const addSkills = () => {
  props.state.skills.push({ title: "" });
};

const removeSkills = (key: number) => {
  props.state.skills.splice(key, 1);
};

const addCertificates = () => {
  props.state.certifications.push({
    title: "",
    issuing_organization: "",
    year_earned: "",
  });
};

const removeCertificate = (key: number) => {
  props.state.certifications.splice(key, 1);
};

const addAwards = () => {
  props.state.honorsAndAwards.push({
    award: "",
  });
};

const removeAward = (key: number) => {
  props.state.honorsAndAwards.splice(key, 1);
};

const addLanguages = () => {
  props.state.languages.push({
    name: "",
    proficiency: "",
  });
};

const removeLanguage = (key: number) => {
  props.state.languages.splice(key, 1);
};

const addReference = () => {
  props.state.references.push({
    reference_name: "",
    title_and_company: "",
    contact_info: "",
  });
};

const removeReference = (key: number) => {
  props.state.references.splice(key, 1);
};

watch(
  () => props.state.image,
  (newFile) => {
    if (newFile instanceof File) {
      props.state.imagePreview = URL.createObjectURL(newFile);
    }
  }
);
</script>
<template>
  <div class="bg-white rounded-lg shadow-lg">
    <div class="p-6 overflow-y-auto h-[1400px]">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Resume Details</h2>

      <!-- Personal Information -->
      <div
        class="mb-6 bg-white rounded-lg border border-gray-200 shadow-md p-6"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4">
          Personal Information
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <div>
            <TextField
              v-model="state.fullName"
              id="fullName"
              type="text"
              class="mt-1 block w-full"
              placeholder="Full Name"
            />
          </div>
          <div>
            <TextField
              v-model="state.email"
              placeholder="Email"
              id="email"
              type="email"
              class="block w-full"
            />
          </div>
          <div>
            <TextField
              v-model="state.phone"
              placeholder="Phone"
              id="phone"
              type="tel"
              class="block w-full"
            />
          </div>
          <div>
            <TextField
              v-model="state.location"
              placeholder="Location"
              id="location"
              type="text"
              class="block w-full"
            />
          </div>
          <div class="col-span-2">
            <FileUploadField
              v-model="props.state.image"
              name="featured_image"
              id="image"
              placeholder="Profile Image"
              class="block w-full"
            />
          </div>
        </div>
      </div>

      <!-- Professional Summary -->
      <div
        class="mb-6 bg-white rounded-lg border border-gray-200 shadow-md p-6"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4">
          Professional Summary
        </h3>
        <TextAreaField
          v-model="state.summary"
          id="summary"
          placeholder="Summary"
          class="mt-1 block w-full border-gray-900 rounded-md shadow-sm"
          rows="5"
        />
      </div>

      <!-- Work Experience -->
      <div
        class="mb-6 bg-white rounded-lg border border-gray-200 shadow-md p-6"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4">Work Experience</h3>

        <div class="flex items-center justify-end">
          <button
            type="button"
            @click="addExperience"
            class="text-sm text-blue-500"
          >
            Add Experience
          </button>
        </div>

        <div
          class="relative grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 shadow-md p-4 rounded-md border border-gray-300"
          v-for="(workingExperience, key) in state.workingExperiences"
          :key="key"
        >
          <div
            v-if="key !== 0"
            class="absolute -right-3 -top-3 bg-red-500 px-1 py-1 rounded-full flex justify-end"
          >
            <button
              @click="removeExperience(key)"
              type="button"
              class="text-white"
            >
              <IconsXMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <TextField
              v-model="workingExperience.jobTitle"
              placeholder="Job Title"
              id="jobTitle"
              type="text"
              class="mt-1 block w-full"
            />
            <TextField
              v-model="workingExperience.company"
              placeholder="Company"
              id="company"
              type="text"
              class="mt-1 block w-full"
            />
          </div>
          <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <TextField
              v-model="workingExperience.start_date"
              label="Start Date"
              id="startDate"
              type="month"
              class="mt-1 block w-full"
            />
            <TextField
              v-model="workingExperience.end_date"
              label="End Date"
              id="endDate"
              type="month"
              class="mt-1 block w-full"
            />
          </div>
          <div class="col-span-2">
            <InputLabel value="Job Description" for="jobDescription" />
            <TiptapEditor
              v-model="workingExperience.job_description"
              class="text-sm"
            />
          </div>
        </div>
      </div>

      <!-- Education -->
      <div
        class="mb-6 bg-white rounded-lg border border-gray-200 shadow-md p-6"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4">Education</h3>

        <div class="flex items-center justify-end">
          <button
            type="button"
            @click="addEducation"
            class="text-sm text-blue-500"
          >
            Add Education
          </button>
        </div>
        <div
          class="relative grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 shadow-md p-4 rounded-md border border-gray-300"
          v-for="(education, key) in state.educations"
          :key="key"
        >
          <div
            v-if="key !== 0"
            class="absolute -right-3 -top-3 bg-red-500 px-1 py-1 rounded-full flex justify-end"
          >
            <button
              @click="removeEducation(key)"
              type="button"
              class="text-white"
            >
              <IconsXMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <TextField
            v-model="education.degree"
            placeholder="Degree"
            id="degree"
            type="text"
            class="mt-1 block w-full col-span-2"
          />
          <TextField
            v-model="education.school"
            placeholder="School"
            id="school"
            type="text"
            class="mt-1 block w-full col-span-2"
          />
          <div class="grid grid-cols-2 col-span-2 gap-4">
            <TextField
              v-model="education.from"
              placeholder="From"
              id="gradYear"
              type="number"
              class="mt-1 block w-full"
            />

            <TextField
              v-model="education.to"
              placeholder="To"
              id="gradYear"
              type="number"
              class="mt-1 block w-full"
            />
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="mb-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Skills</h3>

        <div class="flex items-center justify-end">
          <button
            type="button"
            @click="addSkills"
            class="text-sm text-blue-500"
          >
            Add Skills
          </button>
        </div>
        <div
          class="relative grid grid-cols-1 gap-2 mt-5 shadow-md p-4 rounded-md border border-gray-300"
          v-for="(skill, key) in state.skills"
          :key="key"
        >
          <div
            v-if="key !== 0"
            class="absolute -right-3 -top-3 bg-red-500 px-1 py-1 rounded-full flex justify-end"
          >
            <button @click="removeSkills(key)" type="button" class="text-white">
              <IconsXMarkIcon class="w-4 h-4" />
            </button>
          </div>
          <TextField
            v-model="skill.title"
            placeholder="Skills"
            :id="`skills-${key}`"
            type="text"
            class="mt-3 block w-full"
          />
        </div>
      </div>

      <!-- Certifications -->
      <div class="mb-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Certifications</h3>

        <div class="flex items-center justify-end">
          <button
            type="button"
            @click="addCertificates"
            class="text-sm text-blue-500"
          >
            Add Certificate
          </button>
        </div>
        <div
          class="relative grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 shadow-md p-4 rounded-md border border-gray-300"
          v-for="(certification, key) in state.certifications"
          :key="key"
        >
          <div
            class="absolute -right-3 -top-3 bg-red-500 px-1 py-1 rounded-full flex justify-end"
          >
            <button
              @click="removeCertificate(key)"
              type="button"
              class="text-white"
            >
              <IconsXMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <TextField
            v-model="certification.title"
            placeholder="Certificate Title"
            :id="`certifications-${key}`"
            type="text"
            class="mt-3 block w-full"
          />

          <TextField
            v-model="certification.issuing_organization"
            placeholder="Issuing Organization"
            :id="`certifications-${key}-issuing_organization`"
            type="text"
            class="mt-3 block w-full"
          />

          <TextField
            v-model="certification.year_earned"
            placeholder="Year Earned"
            :id="`certifications-${key}-year_earned`"
            type="text"
            class="mt-3 block w-full"
          />
        </div>
      </div>

      <!-- Honors and Awards -->
      <div class="mb-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Honors and Awards</h3>

        <div class="flex items-center justify-end">
          <button
            type="button"
            @click="addAwards"
            class="text-sm text-blue-500"
          >
            Add Award
          </button>
        </div>
        <div
          class="relative grid grid-cols-1 gap-2 mt-5 shadow-md p-4 rounded-md border border-gray-300"
          v-for="(award, key) in state.honorsAndAwards"
          :key="key"
        >
          <div
            class="absolute -right-3 -top-3 bg-red-500 px-1 py-1 rounded-full flex justify-end"
          >
            <button @click="removeAward(key)" type="button" class="text-white">
              <IconsXMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <TextField
            v-model="award.title"
            placeholder="Award Title"
            :id="`awards-${key}`"
            type="text"
            class="mt-3 block w-full"
          />
        </div>
      </div>

      <!-- Languages -->
      <div class="mb-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Languages</h3>

        <div class="flex items-center justify-end">
          <button
            type="button"
            @click="addLanguages"
            class="text-sm text-blue-500"
          >
            Add Language
          </button>
        </div>
        <div
          class="relative grid grid-cols-1 gap-2 mt-5 shadow-md p-4 rounded-md border border-gray-300"
          v-for="(language, key) in state.languages"
          :key="key"
        >
          <div
            class="absolute -right-3 -top-3 bg-red-500 px-1 py-1 rounded-full flex justify-end"
          >
            <button
              @click="removeLanguage(key)"
              type="button"
              class="text-white"
            >
              <IconsXMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <TextField
            v-model="language.name"
            placeholder="Language"
            :id="`languages-${key}-language`"
            type="text"
            class="mt-3 block w-full"
          />
          <TextField
            v-model="language.proficiency"
            placeholder="Proficiency"
            :id="`languages-${key}-proficiency`"
            type="text"
            class="mt-3 block w-full"
          />
        </div>
      </div>

      <!-- References -->
      <div class="mb-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">References</h3>

        <div class="flex items-center justify-end">
          <button
            type="button"
            @click="addReference"
            class="text-sm text-blue-500"
          >
            Add Reference
          </button>
        </div>
        <div
          class="relative grid grid-cols-1 gap-2 mt-5 shadow-md p-4 rounded-md border border-gray-300"
          v-for="(reference, key) in state.references"
          :key="key"
        >
          <div
            class="absolute -right-3 -top-3 bg-red-500 px-1 py-1 rounded-full flex justify-end"
          >
            <button
              @click="removeReference(key)"
              type="button"
              class="text-white"
            >
              <IconsXMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <TextField
            v-model="reference.reference_name"
            placeholder="Reference Name"
            :id="`references-${key}`"
            type="text"
            class="mt-3 block w-full"
          />

          <TextField
            v-model="reference.title_and_company"
            placeholder="Title and Company"
            :id="`title_and_company-${key}`"
            type="text"
            class="mt-3 block w-full"
          />

          <TextField
            v-model="reference.contact_info"
            placeholder="Contact Information"
            :id="`contact_info-${key}`"
            type="text"
            class="mt-3 block w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
