//
//  ContentView.swift
//  NWKTCChallengeIOS
//
//  Created by Isaac Samuel Owen Bisaso on 5/7/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                AppHeaderView()
                    
                    
                   
        
                RoomListView()
                    .navigationBarTitle("", displayMode: .inline)
                    .padding(.top, 0)
                
                
            }
            
            .navigationBarHidden(true)
            
        }
    }
}
        
#Preview {
ContentView()
}
