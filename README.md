[Our Product Pitch](https://www.youtube.com/watch?v=Cj6VHWokxqI "title")

## Inspiration
All forms of education were adversely affected by COVID-19. However, few were impacted as heavily as performing arts. From Symphonic Orchestras to elementary school bands, musicians of all skill levels have struggled. Specifically, novice musicians face the unique challenge of trying to learn how to play songs without the in-person guidance of instructors. As musicians ourselves, we sought to find a solution to this problem and create a system that makes practicing easier for young musicians.

## What it does
Practice Playback is a system that takes in a picture of sheet music and plays it back on a microcontroller.

## How we built it
*Front-end application on React Native Expo
* Pictures to be processed on Python Flask backend running the tensorflow/moonlight API
* Firebase real-time database holds the processed data of notes as JSON objects
* An  ESP32 microcontroller connected our real-time database to our front-end, enabling the playing of songs with volume control, transposition, and tempo adjustment via buzzer.

## Challenges we ran into
Our back-end developers could not contribute significantly due to family emergencies, so, with no back-end experience, we struggled to integrate the Moonlight API. In the end, we ended up hard-coding three basic songs, while demonstrating the viability of our concept with what our former teammates had worked on before leaving.
	
## Accomplishments that we're proud of
Setting Up Firebase with both ESP32 Wifi-Enabled Microcontroller and React-Native Front-end, enabling communication between the two.

## What we learned
* Parsing JSON objects
* Listening for changes in a real-time database
* Integrating hardware and software components cohesively

## What's next for PracticePlayback
* Fully integrating moonlight and Google cloud to process images
* Using Bluetooth instead of WiFi with our hardware
* Supporting multiple users/microcontrollers
* Usage of better audio components

 ## With the practice playback, perfecting your music has never been easier. 
