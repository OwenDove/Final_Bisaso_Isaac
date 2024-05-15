// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.0;

contract LoyaltyPoints {
    // Struct to represent an instructor
    struct Instructor {
        uint loyaltyPoints;
        uint totalReviews;
    }
    
    // Mapping to store instructors' loyalty points
    mapping(address => Instructor) public instructors;

    // Admin address
    address public admin;

   
    constructor() {
        admin = msg.sender;
    }

    // Modifier to only allow the admin to call certain functions
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // Function to rate an instructor after a classroom use
    function rateInstructor(address instructorWallet, uint starRating) external {
        require(starRating >= 1 && starRating <= 5, "Star rating must be between 1 and 5");
        require(instructors[instructorWallet].loyaltyPoints >= 0, "Instructor not found");

        // Increment total reviews for the instructor
        instructors[instructorWallet].totalReviews++;

        // Add loyalty point if star rating is over 3
        if (starRating > 3) {
            instructors[instructorWallet].loyaltyPoints++;
        }
    }

    // Function to get loyalty points of an instructor
    function getLoyaltyPoints(address instructorWallet) external view returns (uint) {
        return instructors[instructorWallet].loyaltyPoints;
    }

    // Function to get total reviews of an instructor
    function getTotalReviews(address instructorWallet) external view returns (uint) {
        return instructors[instructorWallet].totalReviews;
    }

    // Function to add loyalty points to an instructor's wallet by admin
    function addLoyaltyPoints(address instructorWallet, uint pointsToAdd) external onlyAdmin {
        instructors[instructorWallet].loyaltyPoints += pointsToAdd;
    }

    // Function to set total reviews of an instructor by admin
    function setTotalReviews(address instructorWallet, uint totalReviews) external onlyAdmin {
        instructors[instructorWallet].totalReviews = totalReviews;
    }
}
