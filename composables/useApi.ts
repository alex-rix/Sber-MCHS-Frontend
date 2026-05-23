export const useApi = async function <T>(request: any, opts: any = {}, clientSideOnly: boolean = false) {
    const config = useRuntimeConfig()
    const token = null;

    if (clientSideOnly) {
        let error = null;
        let data = null;

        await $fetch<T>(request, {
            baseURL: config.public.apiURL,
            onRequest({request, options }) {
                if (token) options.headers.set('Authorization', 'Bearer ' + token)
            },
            ...opts,
        }).catch(e => error = e).then(r => data = r);

        return {data: ref(data), error: ref(error)};
    }

    return useFetch<T>(request, {
        baseURL: config.public.apiURL,
        onRequest({ request, options }) {
            if (token) options.headers.set('Authorization', 'Bearer ' + token)
        },
        ...opts,
    })
}