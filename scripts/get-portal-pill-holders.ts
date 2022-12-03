


// Replace magic numbers
import axios from 'axios';
import fs, { WriteStream } from'fs';
import path from'path';

async function main() {
  let data;
  let owners;
  let tokenAddress = "0xa16891897378a82e9f0ad44a705b292c9753538c";
  owners =  await getOwnersForToken(tokenAddress, "1");
  owners = [...owners, await getOwnersForToken(tokenAddress, "2")];

  console.log(data);
}

async function getOwnersForToken(tokenAddress: string, tokenId: string) {
  let data;
  let owners;
  try{
    data = await axios.get(`https://api.opensea.io/api/v1/asset/${tokenAddress}/${tokenId}/owners?limit=50&order_by=created_date&order_direction=desc`, {
      headers: {
        'X-API-KEY': process.env.OPEN_SEA_API_KEY || ""
      }
    });
    owners = data.data.owners.map((owner: any) => { return {"address": owner.address, "quantity": owner.quantity} });
  } catch (e) {
    console.log(e);
  }
  while(data && data.data.next != null) {
    try{
      data = await axios.get(`https://api.opensea.io/api/v1/asset/${tokenAddress}/${tokenId}/owners?limit=50&order_by=created_date&order_direction=desc&cursor=${data.data.next}`, {
        headers: {
          'X-API-KEY': process.env.OPEN_SEA_API_KEY || ""
        }
      });
      owners = [...owners, data.data.owners.map((owner: any) => { return {"address": owner.address, "quantity": owner.quantity} })];

    } catch (e) {
      console.log(e);
    }
  }
  const filePath = path.join(__dirname, '/portal-pill-holders.json');
  var file = fs.createWriteStream(filePath);
  file.on('error', (err: Error) => { console.error(err) });
  // Write the JSON blob to a file
  file.write(owners.toString());
  // Housekeeping
  file.close();
  await streamPromise(file);
  return owners;
}

// Basic helper to make sure the stream is finished before we exit
function streamPromise(stream: WriteStream) {
  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      resolve('finish');
    });
    stream.on('error', (error) => {
      reject(error);
    });
  });
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });