export class Http {
    static HEADERS = { "Content-Type": "application/json" };

    static async getDailyCourse(url=`https://www.cbr-xml-daily.ru/daily_json.js`) {
        try {
            return await request(url);
        } catch (e) {
            console.log(e);
        }
    }

    static async getCourseByDate(date) {
        try {
            let url = `https://www.cbr-xml-daily.ru/archive/${date.getFullYear()}/${Number(date.getMonth()+1).toString().length === 1 ? '0'+date.getMonth().toString() : Number(date.getMonth()+1).toString()}/${date.getDate().toString().length === 1 ? '0'+date.getDate().toString() : date.getDate()}/daily_json.js`
            return await request(url);
        } catch (e) {
            console.log(e);
        }
    }
}

async function request(url, method = "GET", data) {
    const config = {
        method,
        headers: Http.HEADERS,
    };
    if (method === "POST" || method === "PATCH") {
        config.body = JSON.stringify(data);
    }
    const responce = await fetch(url, config);
    return await responce.json();
}