<script setup lang="ts">
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const userAuth = getAuth();

const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const handleSignUpButton = () => {
  createUserWithEmailAndPassword(userAuth, form.email, form.password)
    .then(() => {
      router.replace("/");
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>
<template>
  <div
    class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
  >
    <Nav />
  </div>

  <main class="h-screen">
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <AppLogo />
        <h2
          class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
        >
          Sign up an account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" class="space-y-6">
          <div>
            <TextField
              id="name"
              type="text"
              name="name"
              label="Name"
              v-model="form.name"
              required
              autocomplete="name"
            />
          </div>
          <div>
            <TextField
              id="email"
              type="email"
              name="email"
              label="Email"
              v-model="form.email"
              required
              autocomplete="email"
            />
          </div>

          <div>
            <TextField
              id="password"
              type="password"
              name="password"
              label="Password"
              v-model="form.password"
              required
              autocomplete="current-password"
            />
          </div>

          <div class="flex flex-col gap-2">
            <PrimaryButton type="submit" @click="handleSignUpButton">
              Register
            </PrimaryButton>

            <div class="flex justify-center mt-5">
              <NuxtLink to="/login" class="text-black hover:underline text-sm">
                Already have an account? Sign In
              </NuxtLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
