import React, { Fragment } from "react";
import {Contact} from "./Contact"


export const About = () => (
  <Fragment>

    <div className="row"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <h1><b>About Poll Me App!</b></h1>
    </div>

    <div className="row">
      <br></br>
    </div>

    <div className="row"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <h3>¿De qué se trata Poll Me App?</h3>
    </div>


    <div className="row">
      <p>Es una aplicación para que intercambies llenado de encuestas con tus amigos y compeñros.</p>
      <p>De esta forma pueden llevar a cabo sus proyectos y aprendizaje de forma colaborativa.</p>
    </div>

    <div className="row">
      <b>¿Qué esperas para unirte?</b>
    </div>
  
    <div className="row"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
    <h3><a href='/Contact/'><p>¿Necesitas contactarnos? Haz click en este enlace</p></a></h3>
    </div>

    <div className="row" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
    }}>
      <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8d64b08-3731-4ace-9436-bab648955c5b/deiywx4-b3c20287-1628-4fd4-b978-59d0f9202899.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U4ZDY0YjA4LTM3MzEtNGFjZS05NDM2LWJhYjY0ODk1NWM1YlwvZGVpeXd4NC1iM2MyMDI4Ny0xNjI4LTRmZDQtYjk3OC01OWQwZjkyMDI4OTkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.T9Cl7SBSEOg2CnakQAjuDKtQxuIEhPUSbofT0xNOtg8" width="700" height="450" />
      
    </div>

    <div className="row"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
    <p>Imagen tomada con licencia gratuita de: <a href="https://pixabay.com/illustrations/checklist-business-businesswoman-3693113/"> Pixabay</a> </p>
    </div>

    
  </Fragment>
);
