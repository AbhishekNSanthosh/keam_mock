export const navItems = [
    {
        title: "Home",
        url: "/home",
    },
    {
        title: "Upload Questions",
        url: "/upload",
    },
    {
        title: "View Questions",
        url: "/view-question",
    },
    {
        title: "View Score",
        url: "/view-score",
    },
]

export const backend = "https://sparkz-backend.onrender.com"

export const routes = {
    getAllQuestion: "/api/v2/user/getAllQuestion",
    uploadQue: "/api/v2/user/insertQuestion",
    getWinners: "/api/v2/user/winners"
}