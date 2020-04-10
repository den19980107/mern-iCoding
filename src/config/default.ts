const mode = process.env.NODE_ENV || 'development'
let serverUrl, clientUrl
if (mode == 'development') {
    serverUrl = "http://localhost:5000"
    clientUrl = "http://localhost:3000"
} else if (mode == "production") {
    // production 時這兩個要依樣 記得！
    serverUrl = "http://localhost:5000"
    clientUrl = "http://localhost:5000"
}

type config = {
    mode: string,
    serverUrl: string,
    clientUrl: string
}

const config: config = {
    mode: mode,
    serverUrl: serverUrl,
    clientUrl: clientUrl
}


export default config

