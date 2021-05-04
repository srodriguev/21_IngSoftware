import React, { Fragment } from "react";


export const HomePage = () => (
  <Fragment>
    <div className="row" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
    }}>

      <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8d64b08-3731-4ace-9436-bab648955c5b/deiywhh-7089bd3a-690a-4b0c-b95b-92419c40781b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U4ZDY0YjA4LTM3MzEtNGFjZS05NDM2LWJhYjY0ODk1NWM1YlwvZGVpeXdoaC03MDg5YmQzYS02OTBhLTRiMGMtYjk1Yi05MjQxOWM0MDc4MWIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.tUGRXHs7OrtUBj9qKCXUQq76SLbzbEoIZVYkkRDar8Q" />;

    </div>
    <div className="row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
      <h1>Welcome to Poll Me App!</h1>
    </div>
    <div className="row"
    style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
    }}>
      <br></br>
    </div>
    <div className="row"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <h3>¿QUE ESPERAS PARA SUBIR TU ENCUESTA?</h3>
    </div>
  </Fragment>
);