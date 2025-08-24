<script setup lang="ts">
import debounce from "lodash/debounce";

const { state, loadResume, saveResume } = useResume();

const handleExportPdf = async (data: any) => {
  if (!data) return;

  await exportToPDF(
    `${state.fullName.replace(/\s+/g, "-").toLowerCase()}-resume.pdf`,
    data,
    {
      unit: "pt",
      format: "a4",
      orientation: "portrait",
      compress: true,
      precision: 15,
      floatPrecision: "smart",
    },
    {
      margin: [20, 20, 20, 20],
      x: 0,
      y: 0,
      autoPaging: true,
      width: 1050,
      windowWidth: 1300,
    }
  );
};

// Load saved data when component mounts
onMounted(() => {
  loadResume();
});

const debouncedSave = debounce(() => {
  saveResume();
}, 1000);

watch(
  () => state,
  () => {
    debouncedSave();
  },
  { deep: true }
);
</script>

<template>
  <main class="w-full min-h-screen bg-gray-50">
    <!-- Fixed Navigation -->
    <div
      class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
    >
      <Nav />
    </div>

    <!-- Main Content -->
    <div class="pt-20">
      <!-- Resume Builder Layout -->
      <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p class="text-gray-600">
            Create your professional resume in minutes
          </p>
        </div>

        <!-- 2-Grid Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Left Side - Form -->
          <ResumeForm :state="state" />

          <!-- Right Side - Preview -->
          <ResumePreview :state="state" @export-pdf="handleExportPdf" />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
ul {
  list-style-type: disc !important;
  padding-left: 20px !important;
}
ol {
  list-style-type: decimal !important;
  padding-left: 20px !important;
}

.pdf-container {
  width: 794px; /* A4 width at 96 DPI */
  min-height: 1123px; /* A4 height at 96 DPI */
  background: white;
  padding: 24px;
  font-family: Arial, sans-serif; /* avoid custom web fonts */
  line-height: 1.5;
  font-size: 12pt;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
