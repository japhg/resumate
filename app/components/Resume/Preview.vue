<script setup lang="ts">
defineProps<{
  state: any;
}>();

const emit = defineEmits(["export-pdf"]);
const pdfSection = ref<HTMLElement | null>(null);

const exportResumeToPdf = () => {
  emit("export-pdf", pdfSection.value);
};
</script>
<template>
  <div class="bg-white rounded-lg border border-gray-200 p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Preview</h2>
      <PrimaryButton class="bg-green-600 hover:bg-green-700">
        Import Resume
      </PrimaryButton>
    </div>

    <!-- Resume Preview -->
    <div>
      <div class="bg-white rounded-lg p-6 max-w-2xl" ref="pdfSection">
        <div class="text-center mb-6">
          <h1 class="text-xl font-bold text-gray-900">
            {{ state.fullName }}
          </h1>
          <p class="text-sm text-gray-600">
            {{ state.email }} | {{ state.phone }}
          </p>
          <p class="text-sm text-gray-600">
            {{ state.location }}
          </p>
        </div>

        <div class="mb-6">
          <h2 class="text-lg text-gray-800 mb-2">
            <strong>Professional Summary</strong>
          </h2>
          <p class="text-gray-700 text-[12px]">
            {{ state.summary }}
          </p>
        </div>

        <!-- Work Experience Section -->
        <div class="mb-6">
          <h2 class="text-lg text-gray-800 mb-2">
            <strong>Work Experience</strong>
          </h2>
          <div
            class="mb-4"
            v-for="(experience, key) in state.workingExperiences"
            :key="key"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-sm font-medium text-gray-900">
                  <strong>{{ experience.jobTitle }}</strong>
                </h3>
                <p class="text-gray-600 text-xs">
                  {{ experience.company }}
                </p>
              </div>
              <p class="text-gray-600 text-xs">
                {{ experience.start_date }} -
                {{ experience.end_date }}
              </p>
            </div>
            <p
              class="mt-2 text-xs text-gray-700 prose break-words text-wrap whitespace-normal"
              v-html="experience.job_description"
            />
          </div>
        </div>

        <!-- Education Section -->
        <div class="mb-6">
          <h2 class="text-lg text-gray-800 mb-2">
            <strong>Education</strong>
          </h2>
          <div
            class="flex justify-between items-start"
            v-for="(education, key) in state.educations"
            :key="key"
          >
            <div class="mb-3">
              <h3 class="text-sm font-medium text-gray-900">
                {{ education.degree }}
              </h3>
              <p class="text-gray-600 text-xs">
                {{ education.school }}
              </p>
              <p class="text-gray-600 text-xs">
                {{ education.from }} -
                {{ education.to }}
              </p>
            </div>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="mb-6">
          <h2 class="text-lg text-gray-800 mb-2">
            <strong>Skills</strong>
          </h2>
          <div class="w-full flex flex-wrap items-center gap-3">
            <div v-for="(skill, key) in state.skills" :key="key" class="my-1">
              <span
                class="bg-gray-100 text-gray-800 text-xs px-3 pb-3 rounded border"
              >
                {{ skill.title }}
              </span>
            </div>
          </div>
        </div>

        <!-- Certifications Section -->
        <div class="mb-6" v-if="state.certifications.length > 0">
          <h2 class="text-lg text-gray-800 mb-2">
            <strong>Certifications</strong>
          </h2>
          <div
            class="flex justify-between items-start"
            v-for="(certification, key) in state.certifications"
            :key="key"
          >
            <div class="mb-3">
              <h3 class="text-sm font-medium text-gray-900">
                {{ certification.title }}
              </h3>
              <p class="text-gray-600 text-xs">
                {{ certification.issuing_organization }}
              </p>
              <p class="text-gray-600 text-xs">
                {{ certification.year_earned }}
              </p>
            </div>
          </div>
        </div>

        <!-- Honors and Awards Section -->
        <div class="mb-6" v-if="state.honorsAndAwards.length > 0">
          <h2 class="text-lg text-gray-800 mb-2">
            <strong>Honors and Awards</strong>
          </h2>
          <div
            class="flex justify-between items-start"
            v-for="(award, key) in state.honorsAndAwards"
            :key="key"
          >
            <div class="mb-">
              <h3 class="text-sm font-normal text-gray-900">
                {{ award.title }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Languages Section -->
        <div class="mb-6" v-if="state.languages.length > 0">
          <h2 class="text-lg text-gray-800 mb-2">
            <strong>Languages</strong>
          </h2>
          <div
            class="flex justify-between items-start"
            v-for="(language, key) in state.languages"
            :key="key"
          >
            <div class="mb-3">
              <h3 class="text-sm font-medium text-gray-900">
                {{ language.name }}
              </h3>
              <p class="text-gray-600 text-xs">
                {{ language.proficiency }}
              </p>
            </div>
          </div>
        </div>

        <!-- References Section -->
        <div class="mb-6" v-if="state.references.length > 0">
          <h2 class="text-lg text-gray-800 mb-2">
            <strong>References</strong>
          </h2>
          <div
            class="flex justify-between items-start"
            v-for="(reference, key) in state.references"
            :key="key"
          >
            <div class="mb-3">
              <h3 class="text-sm font-medium text-gray-900">
                {{ reference.reference_name }}
              </h3>
              <p class="text-gray-600 text-xs">
                {{ reference.title_and_company }}
              </p>
              <p class="text-gray-600 text-xs">
                {{ reference.contact_info }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Options -->
    <div class="mt-6 flex gap-3">
      <PrimaryButton
        type="button"
        class="bg-blue-600 hover:bg-blue-700 flex-1"
        @click="exportResumeToPdf"
      >
        Export as PDF
      </PrimaryButton>
    </div>
  </div>
</template>
