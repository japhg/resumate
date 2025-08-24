<script setup lang="ts">
	import { signOut } from "firebase/auth";

	const user = useCurrentUser();
	const auth = useFirebaseAuth();
	const show = ref(false);

	const closeMenu = () => {
		show.value = false;
	};

	const handleSignOutButton = () => {
		if (!auth) return;

		signOut(auth);
	};
</script>

<template>
	<nav class="w-full">
		<div class="container mx-auto px-6 lg:px-8">
			<div class="flex justify-between items-center h-20">
				<!-- Logo -->
				<NuxtLink to="/" class="flex items-center">
					<img
						src="/images/resumate-logo.svg"
						alt="Linneth Logo"
						class="h-8 lg:h-10 w-auto"
					/>
				</NuxtLink>

				<!-- Mobile Menu Button -->
				<div class="flex md:hidden">
					<button
						type="button"
						class="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
						@click="show = !show"
					>
						<span class="sr-only">Open main menu</span>
						<OpenMenuIcon v-if="!show" class="w-6 h-6" />
						<IconsCloseMenuIcon v-else class="w-6 h-6" />
					</button>
				</div>

				<!-- Desktop Navigation -->
				<div class="hidden md:flex items-center space-x-8">
					<div v-if="!user">
						<NuxtLink to="/login" class="hover:underline">
							Sign In
						</NuxtLink>
					</div>
					<div v-else class="flex gap-4 items-center">
						<span>Welcome, {{ user.displayName }}!</span>
						<PrimaryButton
							type="button"
							@click="handleSignOutButton"
							class="font-normal"
						>
							Sign Out
						</PrimaryButton>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<MobileNav :show="show" @close-menu="closeMenu" />
</template>
