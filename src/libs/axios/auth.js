import instance from "."


export async function login(body) {
    try {
        const { data, status } = await instance.post('/auth/login', body)
        return { data, status }
    } catch (error) {
        throw error
    }
}

export async function logout() {
    try {
        const { data, status } = await instance.post('api/v1/auth/logout')
        return { data, status }
    } catch (error) {
        throw error
    }
}

export async function register(body) {
    try {
        const { data, status } = await instance.post('/auth/register', body)
        return { data, status }
    } catch (error) {
        throw error
    }
}
