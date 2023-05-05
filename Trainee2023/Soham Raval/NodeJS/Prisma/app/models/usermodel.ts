export interface UserListModel{
    id?:string
    name?:string
    email?:any
    city?:any
    gender?:any
}

export interface UserDataModel{
    id?:string
    rollno?:any
    lastname?:any
    country?:any

}

export interface  TrainsModel{
    id?:string
    Train_No?:any
    destination?: any
    seatsTotal?:  any
    trainName?:  any
    stationList?:any

}

export interface StationModel{
    id?:string
    stationCode?:any
    stationName?:any
}

export interface BookingModel{
    id?:string
    passengerName:string
    passengerAge: any
    passengerGender:string
    passengerList:any
    passenger:any
    trainList:any
}

export interface PassengerModel{
    id?:string
    username:string
    password:string
    email:string
    BookingList:any

}