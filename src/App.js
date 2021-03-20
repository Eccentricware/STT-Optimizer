import './App.css';
import React, {useState} from 'react';
import Optimizer from './util/Optimizer';
import SaveImport from './Components/SaveImport/SaveImport';
import DataCoreCrew from './util/DataCoreCrew';

function App() {
  const [saveData, setSaveData] = useState(Optimizer);

  function importData(saveData) {
    let crewPotential = {};
    /* This can be added for dynamic functionality later. Can hard code for now
    fetch('https://datacore.app/structured/crew.json')
      .then(response => response.json)
      .then(data => crewPotential = data);
      Optimizer.crewPotential = crewPotential;
    */
    console.log(Optimizer);
    console.log("Processing Roster");
    Optimizer.assessCrewRoster(saveData, DataCoreCrew);
    console.log("Roster Processed. Starting Voyage Rankings");
    Optimizer.sortVoyageRankings();
    console.log("Crew sorted by voyage EV. Finding best current crew.");
    Optimizer.findCurrentBestCrew();
    console.log("Best Current Crew Calculated. Calculating best potential crew at current rarity");
    Optimizer.findBestForRarity();
    console.log("Best crew for rarity calculated. Comparing differences");
    Optimizer.findCrewToTrain();
    console.log("Potential EV Improvements Found");
    Optimizer.findEVContributionOfCrewToTrain();
    Optimizer.sortCrewToTrain();
    Optimizer.findBestCitedCrew();
    Optimizer.findCrewToCite();
    Optimizer.findEVContributionOfCrewToCite();
    Optimizer.sortCrewToCite();
    console.log(Optimizer);
  }

  return (
    <div className="App">
      <SaveImport label={saveData} importData={importData} optimizer={Optimizer}/>
    </div>
  );
}

export default App;
