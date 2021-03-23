# New Collectibles Features

## Migration

- Transfers tokens from OG contract to burner address `bytes32(0x1)`
- mints users a duplicate on the new contract

> **Note** Users must grant approval on V1 contract to V2 before calling
> `migrate`

## Modular Mint Logic

- minting can be determined by external contracts.
- allows for a variety stories and creative minting
  ideas
- should be able to deactivate these outside contracts

## Merkle Drop Logic Plugin

### User Story

A timed merkle drop is an efficient way to ensure NFT supply meets demand exactly.
Essentially, a merkle root can be published that has `x` mintable tokens in it.
This number can be arbitrarily high. However, after either

1. `y` blocks are mined, or
2. `z` timestamp passes

the drop ends and no more NFTs can be minted from that hash.

In emergency situations, the plugin could be disconnected from the contract
by the "farmacists", but this would be pretty awkward and we'd have some
explaining to do. However, it is a fairly lightweight emergency shutoff.

### Functionality

- Can publish a sequence of merkle drops
- Each drop can be valid until either a timestamp or block height is reached
- merkle leaves are validated using the token Id and the IPFS hash.
