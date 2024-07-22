// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PowerXchange {
    struct EnergyCredit {
        uint256 id;
        address producer;
        uint256 amount;
        uint256 price;
        bool isSold;
    }

    uint256 public nextCreditId;
    mapping(uint256 => EnergyCredit) public energyCredits;
    mapping(address => uint256[]) public creditsOwned;

    event CreditCreated(uint256 id, address producer, uint256 amount, uint256 price);
    event CreditSold(uint256 id, address buyer);

    function createEnergyCredit(uint256 amount, uint256 price) external {
        nextCreditId++;
        energyCredits[nextCreditId] = EnergyCredit(nextCreditId, msg.sender, amount, price, false);
        creditsOwned[msg.sender].push(nextCreditId);
        emit CreditCreated(nextCreditId, msg.sender, amount, price);
    }

    function buyEnergyCredit(uint256 id) external payable {
        EnergyCredit storage credit = energyCredits[id];
        require(!credit.isSold, "Credit already sold");
        require(msg.value == credit.price, "Incorrect value sent");

        credit.isSold = true;
        payable(credit.producer).transfer(msg.value);
        creditsOwned[msg.sender].push(id);

        emit CreditSold(id, msg.sender);
    }

    function getCreditsOwned() external view returns (uint256[] memory) {
        return creditsOwned[msg.sender];
    }
}
