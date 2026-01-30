export function SearchField({value, setSearchText, searchForText}: 
    {value: string, 
    setSearchText: any,
    searchForText: any}) {

    const textField = <input type="text" placeholder={"Enter a city..."}
     value={value}
     onChange={(e) => setSearchText(e.target.value)}
     onBlur={() => searchForText(value)}
     ></input>

    return (
        <>
        <div className="searchField">
        {textField}
        </div>
        </>
    )
}