const { expect } = require("chai");

describe("Agreement", function () {
  let Agreement, contract;
  let admin, member, addresses;
  let transaction, error;

  beforeEach(async function () {
    Agreement = await ethers.getContractFactory("Agreement");
    [admin, member, ...addresses] = await ethers.getSigners();

    contract = await Agreement.deploy();
    await contract.deployed();
  });

  describe("deployment", function () {
    it("should assign admin and og member roles", async function () {
      let owner = await contract.owner();
      let memberRole = await contract.isMember(admin.address);

      expect(admin.address).to.equal(owner);
      expect(memberRole).to.equal(true);
    });
  });

  describe("optInToDAO", function () {
    it("should require the contract to be active", async function () {
      await contract.activationSwitch();

      try {
        transaction = await contract.optInToDAO()
      } catch(err) {
        error = err.message.split("'")[1];
      }

      expect(error).to.equal("The contract no longer allows opt-ins");
    });

    it("should require member to only vote once", async function () {
      await contract.optInToDAO()

      try {
        transaction = await contract.optInToDAO()
      } catch(err) {
        error = err.message.split("'")[1];
      }

      expect(error).to.equal("You have already voted");
    });

    it("should opt member into DAO", async function () {
      let previousTotalAccounts = await contract.totalAccounts();
      await contract.optInToDAO();

      let currentTotalAccounts = await contract.totalAccounts();
      let optedIn = await contract.optIn(admin.address);
      let optedInAccount = await contract.optedInAccounts(0);

      expect(previousTotalAccounts).to.equal(0);
      expect(currentTotalAccounts).to.equal(1);
      expect(optedIn).to.equal(true);
      expect(optedInAccount).to.equal(admin.address);
    });
  });

  describe("optOutOfDAO", function () {
    it("should opt member out of DAO", async function () {
      await contract.addMember(member.address);
      let previousTotalAccounts = await contract.totalAccounts();
      await contract.connect(member).optOutOfDAO();

      let currentTotalAccounts = await contract.totalAccounts();
      let optedOut = await contract.optOut(member.address);
      let optedOutAccount = await contract.optedOutAccounts(0);

      expect(previousTotalAccounts).to.equal(0);
      expect(currentTotalAccounts).to.equal(1);
      expect(optedOut).to.equal(true);
      expect(optedOutAccount).to.equal(member.address);
    });
  });
});
