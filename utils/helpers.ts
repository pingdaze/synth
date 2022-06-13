
async function printSigners(ethers) {
    const accounts = await ethers.getSigners();
    let balance;

    for (const account of accounts) {
      balance = await ethers.provider.getBalance(account.address);
      console.log(account.address, "has balance", balance.toString());
    }
}