//
//  appHeadView.swift
//  NWKTCChallengeIOS
//
//  Created by Isaac Samuel Owen Bisaso on 5/7/24.
//

import SwiftUI

import SwiftUI

struct AppHeaderView: View {
    var body: some View {
        ZStack {
            Color.black
                .opacity(0.3)
            
            HStack {
                
                Image("max")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 100 /*height: 40*/)
//                    .padding(.horizontal)
                Text("Air NWKTC Rooms")
                
                Spacer()
                
            }
            .padding(.top, 35.0)
            .foregroundColor(.white)
            
        }
        
        .ignoresSafeArea()
        .frame(height: 90)
        
    }
}



#Preview {
    AppHeaderView()
}
