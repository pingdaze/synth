# Notes on Reviewing

Hello!

This repo is still very much in flux, but some key pieces are relatively set in place. At this time, we're most concerned with
the defensibility of the Core instances ``contracts/core/Core1155.sol`` && ``contracts/core/Core1155.sol``.

These are where we hold most of the main bussiness logic for token balances, and where any token compromising vulnerabilities would likely live.

It has been suggested that we simplify the Core721 and Core1155 interfacing to allow for 1 interface, so we may revise this, and some other small naming tweaks but the core logic should be good.

Much of the other character minting logic occurs between the ``contracts/validators/CharacterValidator.sol`` and ``contracts/characters/SelectableOptions.sol`` which is where the majority of the individual character options are held.

For a more explicit and detailed run-through of how a character is minted your best entry point will likely be the character tests (``test/CharacterValidator.ts``)

We rely on Auth quite a bit, and in quite a few different places. The overall vision is to be progressively permissionless, so over time the ability to upgrade logic, and control options, character minting, and all of the other features we've placed auth guards on
can be handed over, but we're aware that initially the ``Owner`` will have quite a bit of control in the system. This compromise is made in order to deliver the complexity of the Pills system.

For Asset storage, we use CIDs stored on chain to retrieve and "stitch" character avatars. This architecture is the best compromise between fully on-chain, and completly off-chain. We refer to this verifiably-on-chain approach to data as a hybrid-on-chain asset model. We'll have more information on the metadata server we use in the future, and all of that code will be opensourced.

For a look into how we pull the asset information from our CDS and push links on-chain see ``/utils/add-options.ts``

For any other questions during the review process please feel free to reach out,

- Ping (@pingdaze)

# Synth Overview

The SYNTH system is composed of two foundational building blocks, Fabricators, and Validators.

Fabricators are the _CORE_ of Synth, and enable the tracking and transfer of various asset classes (ERC20, ERC721, ERC1155)

Validators are contracts that are responsible for verifying, or initiating minting on a token. This lets us dis-integrate minting logic into an upgradable plugin that can be responsible for additional logic. This way the main accounting for the tokens can be seperated from more dynamic behaviors the token may have without a need to make the base balances upgradable contracts. This also allows us to initiate minting on a collection from 2 seperate chains through seperate validators and message passing.


## Synth & Pills

### Character and Wearables Tracking

For pills, Characters, Pills, and Wearables are tracked using fabricators. This lets us have a single collection that has a variety of distribution methods that can adapt over time. This is necesary for asset classes like "equipment" that has an evolving sense of how it's earned, and how it's lost. It also lets us release 2 initial forms for characters, and then expand into additional forms within the same collection without forcing a contract upgrade.

Characters are minted using a validator that consumes a portalpill, and pillboosts, and then mints an ERC721 Pioneer/Avatar through the Character Validator. Every X characters a request for randomness is initiated by an authorized account. It then initiates a cross-chain request for randomness starting on Arbitrum and going onto mainnet. As soon as VRF is available native on Arbitrum we'll simplify this process.

Once the randomness is returned several pieces of EQUIPMENT (Augments or Wearables) are generated for your pioneer

We handle Wearables and Augments each with their own ERC1155 Fabricator instance, and the basic logic to equip, and unequip wearables is handled through an installed Validator. When a user _equips_ a wearable, it's burned, when a user _unequips_ a wearable it's minted back into their ownership. You could easily create a validator that would handle the exchange to and from an ERC20 from a given ERC1155 into the wearables collection as well.

Wearables and Augments are encoded using the following ID schema:
``` SERIES : UINT32 ; FORM : UINT8 ;  RARITY : UINT8 ; SLOT : UINT8 ```
This sequence is packed into an Wearable ID. This let's us create a 1 dimensional mapping where we can easily key into the correct drop from the Chracter Validator.

### Distribution

For PortalPill distribution, we rely on an 1155 fabricator. The initial portal pill release to legacy pill holders
uses the CheckerValidator, and the subsequent releases are using the Raffle and Auction validator.

In each of these cases all of the conditions necesary to get a portal pill are handled in the validator.

For the Raffle validator there are a few different ways it can work. It uses Chainlink VRF with an external subscriber to handle the actual raffle. The Raffle will only trigger 

### Contract Structure/Notes

SYNTH

- Plugin system that allows for modular minting of assets, initial release will inclue a drop based 1155 contract, an ID based 1155 contract and a 721 ID based contract.
  In future iterations we'll explore alternative balance structures (721a) for bulk mints, as well as alternatives to the ID/drop systems.

  General idea is this: the base contract registers validators, validators have control over ID blocks, or drop blocks, which means they have control over the minting of that asset range within a collection
  This lets us do things like: Give out 1155s through the avatar creator, but also let people redeem collab pills after mint to get assets in the _same collection_

  A validator can be as simple or as elaborate as we want with the main idea being that it's a contract that eventuall leads to the creation of additional 1155s, this means validators can essentially
  create "loot tables" very similar to the way that we handle the initial character minting. This is the "drop" system based approach. A single "drop" can oversee a ID span of different 1155s

  It also lets us create a validator that burns an 1155 and gives you a representative ERC20, and then ALSO THE REVERSE, a validator that burns an ERC20 and gives out an 1155.

  This means we can fractionalize an avatar into 1155s then further fractionalize that 1155 into ERC20s - this a big FAWKIN deal - this means that basically the bulk of avatars can just... go on sushi.

  Side Note:: I would avise we take part of mint, and use it as liquidity to jump-start the LPs for some of the rarer 1155s, we can also release the constituent pieces of the avatars we were _going_ to release at launch through the LPS

- Equip/Uneqip wearables operates through a validator, a piece on an avatars outfit or skeleton can be burned in exchange for the corresponding 1155 or vice versa. Wearables progress is _not_ linked to the wearable itself, and any "damage" to the wearable must be repaired before it can be unequiped. A wearable with _permanent damage_ cannot be unequiped.

- Role/1155 based AUTH system attached to each function to allow for extensiblity and chaos as the game engine expands.
  Initially, we can just set a multi-sig to control the upgradability, adding of additional validators, adding of additional XP/REP vaults, etc but long term
  we can actually use 1155 based auth, with validators establishing the conditions for minting/burning the authentication and a keeper-esque pattern for forced-burns when auth is revoked.
  As added flavorrr we can actually make them wearable 1155s but obviously we don't need to do that.

- Modular XP/REP system based on EIP-4626 with the general premise that the the difference over a given time-span between the _assets_ and _shares_ represents the XP/rep gained. System
  takes in a "base token" and a "stake ceiling" which can be changed on the fly, and is connected to the auth system. aggregate REP and XP earned is tracked for the purpose of inter-faction rep gain competition.
  Initial implementation simply works on a per-block-tick, and a ceiling for maximum staking deposit. Initial  contracts for a profit-driven XP/REP approach exists but hasn't been tested
  General idea there is: deposit ETH, ETH get's staked for yield, yield goes to CAPSULE, player gets XP = to yield. This essentially creates competitive portfolios/vaults with spend-limits.

  Additional XP/REP vaults can be installed; we don't currently have the tech for "competing vaults" but a vault adapter could easily be coded that would allow for this type of expansion.

  XP/REP are both SOULBOUND with a transfer whitelist. This means we can add contracts that can transfer XP/rep so further down the line quests/NPCs etc etc can be "loaded" with XP/rep to dish out.
  Hooks exist to add mint permissions through the auth system aswell, but I would recommend extended through the mint-> distribute pattern since limiting the supply source of these assets for 3rd party integrations is key.

  Validators can also consume XP/REP in order to mint tokens, and rank requirements can be placed on this minting process, this is how players mint faction rewards.

- Extensible Achievements pattern
  Similar to the way we have validators, achievements can be added to the base characters contract with achievement validators. This allows for contracts to be added to dictate the logic behind how people gain achievements.

- Extensible Features pattern. Similar to achievements, just meant to have mechanical implications.

- We can add additional character mint validators with different/more character options, different skeletons, different/more wearables.




### TODO


PACE TODO

- Add Faction membership and beef up factions system
  - Setup REP/REP Earning for each Faction

- Make sure Achievements work well, are extensible, and integrate with the permissions system

- Make sure portalpill is being burned correctly/required


NEXT UP PRIORITY

- Flatten out the skeleton/outfit structs into enums and arrays

- Add Class section for characters

- Get message passing setup and working with arbitrum
  - https://developer.offchainlabs.com/docs/l1_l2_messages
  - Figure out solution for chainlink problem (pass randomization from chain to arbitrum)

- Make sure character actions work with EOAs

  - Consolidate some of Augments/Wearables logic into an inheritance structure?



POST LAUNCH

- Setup the fractionalization process for the 1155s
  - Create a "validator adaptor" that lets you plug multiple validators into a single ID space
  - Create validator that consumes an 1155 and makes an ERC20
  - Create a validator that consumes an erc20 and makes an 1155


- Implement a seperate Authority file that consumes tokens:
  - https://github.com/Rari-Capital/solmate/tree/main/src/auth
  - Ensure all functions that need to are guarded by requireAuth  