import charDeploymant from "./deploy-args/char-mock-deployment.json"

import { pushOptions } from "../utils/add-options";

// Replace magic numbers

async function main() {

    
    await pushOptions(
      charDeploymant.ArbMainnet.SelectableOptions,
      charDeploymant.ArbMainnet.WearablesValidator,
      charDeploymant.ArbMainnet.AugmentsValidator
    );

}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });