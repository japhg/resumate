<script setup>
	import {
		createUserWithEmailAndPassword,
		FacebookAuthProvider,
		getAuth,
		GoogleAuthProvider,
		signInWithPopup,
	} from "firebase/auth";

	const auth = useFirebaseAuth();
	const userAuth = getAuth();

	const router = useRouter();

	const email = ref();
	const password = ref();

	const handleSignInButton = () => {
		createUserWithEmailAndPassword(userAuth, email, password)
			.then(() => {
				router.replace("/");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log("Still under fixing :<");
			});
	};

	const signInWithGoogle = () => {
		if (!auth) return;
		signInWithPopup(auth, new GoogleAuthProvider())
			.then(() => {
				router.replace("/");
			})
			.catch((error) => console.log(error));
	};

	const signInWithFacebook = () => {
        console.log('clicked!')
		if (!auth) return;
		signInWithPopup(auth, new FacebookAuthProvider())
			.then(() => {
				router.replace("/");
			})
			.catch((error) => {
				console.log(error);
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
				<img
					src="/images/resumate-logo.svg"
					alt="Your Company"
					class="mx-auto h-10 w-auto"
				/>
				<h2
					class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
				>
					Sign in to your account
				</h2>
			</div>

			<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form action="#" method="POST" class="space-y-6">
					<div>
						<TextField
							id="email"
							type="email"
							name="email"
							label="Email"
							v-model="email"
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
							v-model="password"
							required
							autocomplete="current-password"
						/>
						<div class="mt-2">
							<div class="text-sm">
								<a
									href="#"
									class="font-semibold text-black hover:text-black"
								>
									Forgot password?
								</a>
							</div>
						</div>
					</div>

					<div class="flex flex-col gap-2">
						<PrimaryButton
							type="submit"
							@click="handleSignInButton"
						>
							Sign in
						</PrimaryButton>
						<PrimaryButton
							type="button"
							icon="pi pi-google"
							@click="signInWithGoogle"
						>
							Sign in with Google
						</PrimaryButton>
						<PrimaryButton
							type="button"
							icon="pi pi-facebook"
							@click="signInWithFacebook"
						>
							Sign in with Facebook
						</PrimaryButton>
					</div>
				</form>
			</div>
		</div>
	</main>
</template>
