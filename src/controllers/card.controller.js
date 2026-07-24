

export const getCards = async (req, res) => {

    try {
        const response = await fetch(
            "https://api.scryfall.com/cards/search?q=c%3Awhite+mv%3D1"
        );

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        res.json(data)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });

    }

}