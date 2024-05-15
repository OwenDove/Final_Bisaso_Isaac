import SwiftUI

struct RoomDetailView: View {
    let room: Room
    @State private var selectedDate = Date()
    @State private var selectedTime = Date()
    @State private var instructorName = ""
    @State private var classDetails = ""
    @State private var bookingStatusMessage = ""
    
    var body: some View {
        VStack {
            Text("Room Name: \(room.Name)")
                .padding()
            
            DatePicker("Select Date", selection: $selectedDate, displayedComponents: .date)
                .padding()
            
            DatePicker("Select Time", selection: $selectedTime, displayedComponents: .hourAndMinute)
                .padding()
            
            TextField("Instructor's Name", text: $instructorName)
                .padding()
            
            TextField("Class Details", text: $classDetails)
                .padding()
            
            Button(action: {
                // Call function to book out the room
                rentRoom()
            }) {
                Text("Book Room")
                    .padding()
            }
            
            Text(bookingStatusMessage)
                .padding()
            
            Spacer()
        }
        .navigationTitle("Book Detail")
        .padding()
    }
    
    private func rentRoom() {
        guard let url = URL(string: "http://localhost:3000/api/classrooms/update/\(room.id)") else {
            print("Invalid URL")
            return
        }
        
        // Create a URLRequest
        var request = URLRequest(url: url)
        request.httpMethod = "PATCH"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        // Create a dictionary to hold the booking details
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        let timeFormatter = DateFormatter()
        timeFormatter.dateFormat = "HH:mm"
        
        let requestBody: [String: Any] = [
            "name": room.Name,
            "date": dateFormatter.string(from: selectedDate),
            "time": timeFormatter.string(from: selectedTime),
            "instructorName": instructorName,
            "classDetails": classDetails
        ]
        
        // Convert the dictionary to JSON data
        do {
            let jsonData = try JSONSerialization.data(withJSONObject: requestBody, options: [])
            request.httpBody = jsonData
        } catch {
            print("Error creating JSON data: \(error.localizedDescription)")
            return
        }
        
        // Create a URLSession task to send the PATCH request
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Error: \(error.localizedDescription)")
                self.bookingStatusMessage = "Error: \(error.localizedDescription)"
                return
            }
            
            // Handle response
            guard let httpResponse = response as? HTTPURLResponse else {
                print("Invalid response")
                self.bookingStatusMessage = "Invalid response"
                return
            }
            
            if (200...299).contains(httpResponse.statusCode) {
                self.bookingStatusMessage = "Booking details updated successfully"
            } else {
                self.bookingStatusMessage = "Error updating booking details. Status code: \(httpResponse.statusCode)"
                print(httpResponse)
            }
        }.resume()
    }
}
