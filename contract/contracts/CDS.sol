// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Swaps/Swaps.sol';

contract CDS is Swaps {
  event MakeSwap(
    address indexed buyer,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 _premium,
    uint256 expirationMonth
  );
  event AcceptSwap(address indexed seller, uint256 swapId);

  function makeSwap(
    address addr,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 sellerDeposit,
    uint256 premium,
    uint256 expirationMonth
  ) public returns (uint256) {
    uint256 newSwapId = _makeSwap(
      addr,
      claimPrice,
      liquidationPrice,
      sellerDeposit,
      premium,
      expirationMonth
    );
    emit MakeSwap(addr, claimPrice, liquidationPrice, premium, expirationMonth);
    return newSwapId;
  }

  function acceptSwap(address addr, uint256 swapId) public returns (uint256) {
    uint256 acceptedSwapId = _acceptSwap(addr, swapId);
    emit AcceptSwap(addr, swapId);
    return acceptedSwapId;
  }

  function swap(uint256 swapId) public view returns (Swap memory) {
    return _swaps[swapId];
  }

  function buyer(uint256 swapId) public view returns (Buyer memory) {
    return _swaps[swapId].buyer;
  }

  function seller(uint256 swapId) public view returns (Seller memory) {
    return _swaps[swapId].seller;
  }
}
