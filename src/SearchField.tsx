export function SearchField({ value, setSearchText, searchForText }:
    {
        value: string,
        setSearchText: any,
        searchForText: any
    }) {

    const textField = (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                searchForText(value)
            }}
        >
            <input type="text" placeholder={"Enter a city..."}
                value={value}
                id="search-input"
                onChange={(e) => setSearchText(e.target.value)}
            ></input>
        </form>
    )

    return (
        <>
            <div className="search-field">

                {textField}

            </div>
        </>
    )
}