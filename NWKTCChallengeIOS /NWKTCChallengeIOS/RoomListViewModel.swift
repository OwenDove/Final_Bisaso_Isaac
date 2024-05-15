//
//  RoomListViewModel.swift
//  NWKTCChallengeIOS
//
//  Created by Isaac Samuel Owen Bisaso on 5/7/24.
//

import SwiftUI

class RoomListViewModel: ObservableObject {
    @Published var rooms: [Room] = []
    
    // Implement function to fetch rooms from server
    // Update self.rooms with the fetched rooms
    func fetchRooms() {
        guard let url = URL(string: "http://localhost:3000/api/classrooms") else { return }
        
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else {
                print("Error: \(error?.localizedDescription ?? "Unknown error")")
                return
            }
            
            do {
                // Decode the JSON data into an array of Room objects
                let decodedRooms = try JSONDecoder().decode([Room].self, from: data)
                
                // Update self.rooms with the fetched rooms
                DispatchQueue.main.async {
                    self.rooms = decodedRooms
                }
            } catch {
                print("Error decoding JSON: \(error.localizedDescription)")
            }
        }.resume()
    }
}
