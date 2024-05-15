//
//  Room.swift
//  NWKTCChallengeIOS
//
//  Created by Isaac Samuel Owen Bisaso on 5/7/24.
//

import Foundation

struct Room: Codable, Identifiable {
        let id: Int
        let Name: String
        let Date: String
        let Time: String
        let InstructorName: String
        let classDetails: String
        let IsBooked: Int
}


