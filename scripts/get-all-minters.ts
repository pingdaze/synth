/* eslint-disable prefer-reflect */
const { network, ethers } = require("hardhat");
import { Event } from 'ethers';
import fs, { WriteStream } from'fs';
import path from'path';
import { TransferBatchEvent } from '../typechain-types/contracts/legacy/Core';
import {Core as coreAddress} from "./deploy-args/mainnet-deployment.json";

async function main() {

    // Network guard just to make sure we're on the network we think we are
    if(network.name === "mainnet") {
      // Create a Core instance from previously deployed contract
      const Core = await ethers.getContractFactory("Core");
      const core = await Core.attach(coreAddress);
      let events = await core.queryFilter("TransferBatch") as TransferBatchEvent[];
      events = events.filter((value) => {
          const valueArray = value.args.ids.map((id)=> id.toString());
          const from0x = value.args.from === '0x0000000000000000000000000000000000000000';
          return valueArray.includes("2") && from0x;
      })
      const minters = events.map((el)=> el.args.to);
      // Create a write stream to write all minters into a text file in current directory
      const filePath = path.join(__dirname, '/minters.txt');
      var file = fs.createWriteStream(filePath);
      file.on('error', (err: Error) => { console.error(err) });
      // Write every address that's minted so far to a file
      minters.forEach(function(v) { file.write(v.toString() + ',\n'); });
      file.write("Total Minters:" + minters.length);
      // Housekeeping
      file.close();
      await streamPromise(file);
    }
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