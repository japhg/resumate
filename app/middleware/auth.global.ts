export default defineNuxtRouteMiddleware(async (to) => {
    const user = await getCurrentUser()

    const guestRoutes = ['login', 'register'] // allow guests here

    // If logged in and tries to visit guest-only routes → redirect home
    if (user && guestRoutes.includes(to.name)) {
        return navigateTo('/', { replace: true })
    }

    // If not logged in and tries to visit a protected route → redirect login
    if (!user && !guestRoutes.includes(to.name)) {
        return navigateTo('/login', { replace: true })
    }
})
