# Functionality
### This website functionality is to check availability of User's Booking Code. Also user need to input time on the website to inform host about arrival time of the user.

# Structure
### This website has 2 pages. First page is to show detail information about user's booking code. The other page is to show user's personal information. Route of the first page is root route ('/') and route of the second page is ('/guest-portal').

# Steps on how to set up the project
### First, delete all component that we not used. Right now we just need the layout
### Second, change the default route of the project to needed route
### Third, make views of MainScreen and GuestPortal. At MainScreen, data will show if the booking code correct. But if not correct, the "Booking Code Invalid" text will appear. On the GuestPortal, data will show based on Booking Code that inputed in MainScreen. So if Booking Code is invalid and user wanna go to GuestPortal, the "Booking Code Invalid" text will appear too.