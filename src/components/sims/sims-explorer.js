import React from 'react';
import Collapsible from 'react-collapsible';

export default function SIMSExplorer() {
  return(
    <div>
      <h1>Métadonnées SIMS</h1>
      <h2>Nom de la série</h2>
      <Collapsible trigger="Contact">
        <p>Bientôt disponible</p>
      </Collapsible>
      <Collapsible trigger="Mise à jour des métadonnées">
        <p>Bientôt disponible</p>
      </Collapsible>
      <Collapsible trigger="Présentation statistique">
        <p>Bientôt disponible</p>
      </Collapsible>
      <Collapsible trigger="Unité de mesure">
        <p>Bientôt disponible</p>
      </Collapsible>
      <Collapsible trigger="Période de référence">
        <p>Bientôt disponible</p>
      </Collapsible>
      <Collapsible trigger="Mandat institutionnel">
        <p>Bientôt disponible</p>
      </Collapsible>
    </div>
  )
}
