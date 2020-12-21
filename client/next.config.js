module.exports = {

    serverRuntimeConfig: {
        
    },

    publicRuntimeConfig: {
        // Will be available on both server and client
        BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
    },
}