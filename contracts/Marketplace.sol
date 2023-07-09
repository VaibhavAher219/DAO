// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Marketplace {
    /* @defined a mapping from the token id to useraddress  */

    mapping(uint => address) public owners;
    /*Prices mapping token id to amount */
    mapping(uint => uint) public prices;

    function purchase(uint _id, address _recp) external payable {
        require(owners[_id] == address(0));
        require(msg.value == prices[_id]);
        owners[_id] = _recp;
    }

    function getPrice(uint _id) external returns (uint) {
        return prices[_id];
    }

    function available(uint _id) external returns (bool) {
        if (owners[_id] == address(0)) {
            return true;
        } else return false;
    }
}
