export function Cities() {


    function City({min, max, name}: {min: string, max: string, name: string}) {
        return (
            <>
                <tr>
                    <td>{min}</td>
                    <td>{max}</td>
                    <td>{name}</td>
                </tr>
            </>
        )
    }

    const cities: any = [
        {"min": "10",
            "max": 8,
            "name": "Rio de Janeiro"
        },
        {"min": "10",
            "max": 8,
            "name": "Rio de Janeiro"
        },
        {"min": "10",
            "max": 8,
            "name": "Rio de Janeiro"
        },
        // {"min": "10",
        //     "max": 8,
        //     "name": "Rio de Janeiro"
        // },
        // {"min": "10",
        //     "max": 8,
        //     "name": "Rio de Janeiro"
        // },
        // {"min": "10",
        //     "max": 8,
        //     "name": "Rio de Janeiro"
        // },
        // {"min": "10",
        //     "max": 8,
        //     "name": "Rio de Janeiro"
        // },
        // {"min": "10",
        //     "max": 8,
        //     "name": "Rio de Janeiro"
        // },
        // {"min": "10",
        //     "max": 8,
        //     "name": "Rio de Janeiro"
        // },
        // {"min": "10",
        //     "max": 8,
        //     "name": "Rio de Janeiro"
        // },

    ];
    

    return (
        
        <div className="cities">
        <h2>Capitais</h2>
        <table>
            <thead><tr><th>Min</th><th>Máx</th></tr></thead>
            <tbody>
            {
            cities.map((city: any) => {
                return <City key={city.name} min={city.min} max={city.max} name={city.name} />
            })
                }
            </tbody>   
        </table>
        </div>
        
    )
}