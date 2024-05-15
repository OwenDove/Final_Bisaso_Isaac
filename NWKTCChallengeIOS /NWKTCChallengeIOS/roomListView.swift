//
//  roomListView.swift
//  NWKTCChallengeIOS
//
//  Created by Isaac Samuel Owen Bisaso on 5/7/24.
//

import SwiftUI

struct RoomListView: View {
    @StateObject var viewModel = RoomListViewModel()
    
    var body: some View {
        NavigationView {
            List(viewModel.rooms, id: \.id) { room in
                NavigationLink(destination: RoomDetailView(room: room)) {
                    Text(room.Name)
                }
            }
            .navigationTitle("Available Rooms")
        }
        .onAppear {
            viewModel.fetchRooms()
        }
    }
}
#Preview {
RoomListView()
}

