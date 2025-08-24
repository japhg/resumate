export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser()

    // Check if the user is authenticated and navigate to login page
    if (user && to.name == 'login') {
        return navigateTo('/')
    }

    // Check if the user is not authenticated
    if (!user && to.name != 'login') {
        return navigateTo('/login')
    }
});