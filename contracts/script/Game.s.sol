// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CatchTheImposter} from "../src/Game.sol";

contract GameScript is Script {
    CatchTheImposter public game;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        game = new CatchTheImposter();
        game.createRoom{value: 1000000000000000}(5, 2);
        vm.stopBroadcast();
    }
}
