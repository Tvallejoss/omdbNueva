import React from 'react'

export const Header = () => {
    let peliculas = useSelector((state) => state.peliculas);

    
    return (
        <>
             <div
                id="header"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    paddingTop: "150px",
                }}
            >
                {peliculas.length
                    ? peliculas.map((pelicula, i) => {
                          return (
                              <div
                                  key={i}
                                  style={{
                                      margin: "35px",
                                  }}
                              >
                                  <CardMovie props={pelicula} />
                              </div>
                          );
                      })
                    : ""}
            </div>
        </>
    )
}
