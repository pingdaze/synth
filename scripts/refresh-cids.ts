import charDeploymant from "./deploy-args/char-mock-deployment.json"

import { refreshCIDs } from "../utils/add-options";

// Replace magic numbers

async function main() {

    
    await refreshCIDs(
      charDeploymant.ArbGorliV2.SelectableOptionsV2,
      charDeploymant.ArbGorliV2.WearablesValidator,
      charDeploymant.ArbGorliV2.AugmentsValidator
    );

}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });