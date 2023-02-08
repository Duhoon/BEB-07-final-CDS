// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FUSD is ERC20('FUSD', 'FUSD') {
  constructor() {
    _mint(msg.sender, 10000000);
  }

  function decimals() public view override returns (uint8) {
    return 0;
  }
}
