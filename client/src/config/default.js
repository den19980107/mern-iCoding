const mode = process.env.NODE_ENV
let serverUrl
if (mode === 'development') {
   serverUrl = "http://localhost:5000"
} else if (mode === "production") {
   serverUrl = window.location.origin
}
const config = {
   mode: mode,
   serverUrl: serverUrl,
}


export default config
