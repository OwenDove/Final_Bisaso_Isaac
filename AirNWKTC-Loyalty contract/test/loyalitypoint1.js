const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  const { ethers } = require("hardhat"); // Import the ethers object from hardhat
  
  describe("LoyaltyPoints", function () {
    
    async function deployLoyaltyPointsFixture() {
      const LoyaltyPoints = await ethers.getContractFactory("LoyaltyPoints");
    
      // Contracts are deployed using the first signer/account by default
      const [admin, otherAccount, otherAccount2] = await ethers.getSigners();
    
      const loyaltyPoints = await LoyaltyPoints.deploy();
    
      return { loyaltyPoints, admin, otherAccount, otherAccount2 };
    }
  
    describe("Deployment", function () {
      it("Should set the correct admin", async function () {
        const { loyaltyPoints, admin } = await loadFixture(deployLoyaltyPointsFixture);
  
        expect(await loyaltyPoints.admin()).to.equal(admin.address);
      });
    });
  
    describe("Rating Instructors", function () {
      it("Should rate an instructor and update loyalty points", async function () {
        const { loyaltyPoints, otherAccount } = await loadFixture(deployLoyaltyPointsFixture);
        const instructorWallet = otherAccount.address;
        const starRating = 4;
        
        await loyaltyPoints.rateInstructor(instructorWallet, starRating);
        
        const expectedPoints = 1;
        const actualPoints = await loyaltyPoints.getLoyaltyPoints(instructorWallet);
        
        expect(actualPoints).to.equal(expectedPoints);
      });
    });
  
    describe("Admin Functions", function () {
      it("Should add loyalty points by admin", async function () {
        const { loyaltyPoints, otherAccount } = await loadFixture(deployLoyaltyPointsFixture);
        const instructorWallet = otherAccount.address;
        const pointsToAdd = 2;
        
        await loyaltyPoints.addLoyaltyPoints(instructorWallet, pointsToAdd);
        
        const expectedPoints = 2;
        const actualPoints = await loyaltyPoints.getLoyaltyPoints(instructorWallet);
        
        expect(actualPoints).to.equal(expectedPoints);
      });
  
      it("Should set total reviews by admin", async function () {
        const { loyaltyPoints, otherAccount } = await loadFixture(deployLoyaltyPointsFixture);
        const instructorWallet = otherAccount.address;
        const totalReviews = 5;
        
        await loyaltyPoints.setTotalReviews(instructorWallet, totalReviews);
        
        const actualReviews = await loyaltyPoints.getTotalReviews(instructorWallet);
        
        expect(actualReviews).to.equal(totalReviews);
      });
    });
  });
  