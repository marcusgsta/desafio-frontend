export async function getCityRequest() {
    
        const url = "https://geocoding-api.open-meteo.com/v1/search?name=Rio de Janeiro&count=1&language=en&format=json";
        let location = {};

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: 
                    ${response.status}`)
            }
            const result = await response.json()
            console.log(result)
        } catch (error: any) {
            console.error(error.message)
        }

    }
    
    
    
    
    
 