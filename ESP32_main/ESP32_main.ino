const int SPEAKER = 23;
int NOTE_DUR = 100;
int freq = 2000;
int channel = 0;
int resolution = 8;

#include "pitches.h"
#include "secrets.h"
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <string>
using namespace std;

// index = pitch - 23
int pitchArr[89] = { NOTE_B0,
                     NOTE_C1, NOTE_CS1, NOTE_D1, NOTE_DS1, NOTE_E1, NOTE_F1, NOTE_FS1, NOTE_G1, NOTE_GS1, NOTE_A1, NOTE_AS1, NOTE_B1,
                     NOTE_C2, NOTE_CS2, NOTE_D2, NOTE_DS2, NOTE_E2, NOTE_F2, NOTE_FS2, NOTE_G2, NOTE_GS2, NOTE_A2, NOTE_AS2, NOTE_B2,
                     NOTE_C3, NOTE_CS3, NOTE_D3, NOTE_DS3, NOTE_E3, NOTE_F3, NOTE_FS3, NOTE_G3, NOTE_GS3, NOTE_A3, NOTE_AS3, NOTE_B3,
                     NOTE_C4, NOTE_CS4, NOTE_D4, NOTE_DS4, NOTE_E4, NOTE_F4, NOTE_FS4, NOTE_G4, NOTE_GS4, NOTE_A4, NOTE_AS4, NOTE_B4,
                     NOTE_C5, NOTE_CS5, NOTE_D5, NOTE_DS5, NOTE_E5, NOTE_F5, NOTE_FS5, NOTE_G5, NOTE_GS5, NOTE_A5, NOTE_AS5, NOTE_B5,
                     NOTE_C6, NOTE_CS6, NOTE_D6, NOTE_DS6, NOTE_E6, NOTE_F6, NOTE_FS6, NOTE_G6, NOTE_GS6, NOTE_A6, NOTE_AS6, NOTE_B6,
                     NOTE_C7, NOTE_CS7, NOTE_D7, NOTE_DS7, NOTE_E7, NOTE_F7, NOTE_FS7, NOTE_G7, NOTE_GS7, NOTE_A7, NOTE_AS7, NOTE_B7,
                     NOTE_C8, NOTE_CS8, NOTE_D8, NOTE_DS8};

#define USER_EMAIL "USER_EMAIL"
#define USER_PASSWORD "USER_PASSWORD"


/* 6. Define the Firebase Data object */
FirebaseData fbdo, fbdo1;
/* Define the FirebaseAuth data for authentication data */
FirebaseAuth auth;
/* Define the FirebaseConfig data for config data */
FirebaseConfig config;

unsigned long sendDataPrevMillis1;

uint16_t count1;

String path = "";

void printResult(FirebaseData &data);
void play(int note, int dur);
void MSMIntro();
void ChopsticksMelody();
void Pirates();
void tone(byte pin, int freq);
void noTone(byte pin);
void decode(string input);
void parseJSON(FirebaseJson json);

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////

void setup()
{
  Serial.begin(115200);
  Serial.println();
  Serial.println();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  Serial.println("------------------------------------");
  Serial.println("Begin stream 1...");
  if (!Firebase.beginStream(fbdo, path + "/speakerState"))
  {
    Serial.println("FAILED");
    Serial.println("REASON: " + fbdo.errorReason());
    Serial.println();
  }
  else
  {
    Serial.println("PASSED");
    Serial.println("------------------------------------");
    Serial.println();
  }

  ledcSetup(channel, freq, resolution);
  ledcAttachPin(SPEAKER, channel);
}

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////

void loop()
{

  if (!Firebase.readStream(fbdo))
  {
    Serial.println("Can't read stream data");
    Serial.println("REASON: " + fbdo.errorReason());
    Serial.println();
  }

  if (fbdo.streamTimeout())
  {
    Serial.println("Stream timeout, resume streaming...");
    Serial.println();
  }

  if (fbdo.streamAvailable())
  {
    Serial.println("------------------------------------");
    Serial.println("Stream Data Available...");
    Serial.println("STREAM PATH: " + fbdo.streamPath());
    Serial.println("EVENT PATH: " + fbdo.dataPath());
    Serial.println("DATA TYPE: " + fbdo.dataType());
    Serial.println("EVENT TYPE: " + fbdo.eventType());
    Serial.print("VALUE: ");
    printResult(fbdo);

    /*
    if (fbdo.dataType() == "blob")
    {
      std::vector<uint8_t> blob = fbdo.blobData();

      Serial.println();

      for (int i = 0; i < blob.size(); i++)
      {
        if (i > 0 && i % 16 == 0)
          Serial.println();

        if (i < 16)
          Serial.print("0");

        Serial.print(blob[i], HEX);
        Serial.print(" ");
      }
      Serial.println();
    }
    */

    if (fbdo.intData() % 3 == 1)
    {
      NOTE_DUR = 100;
      Serial.println("Playing Chopsticks");
      ChopsticksMelody();
    }

    else if (fbdo.intData() % 3 == 2)
    {
      NOTE_DUR = 150;
      Serial.println("Playing MSM");
      MSMIntro();
    }
  
    else if (fbdo.intData() % 3 == 0)
    {
      NOTE_DUR = 100;
      Serial.println("Playing Pirates");
      Pirates();
    }
    
    Serial.println("------------------------------------");
    Serial.println();
  }

  ///*
  if (millis() - sendDataPrevMillis1 > 15000)
  {
    sendDataPrevMillis1 = millis();

    //Create demo data
    uint8_t data[256];
    for (int i = 0; i < 256; i++)
      data[i] = i;
    data[255] = rand();

    Serial.println("------------------------------------");

    Serial.println("Set Blob Data 1...");
    if (Firebase.setBlob(fbdo1, path + "/Stream/data1", data, sizeof(data)))
    {
      Serial.println("PASSED");
      Serial.println("------------------------------------");
      Serial.println();
    }
    else
    {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo1.errorReason());
      Serial.println("------------------------------------");
      Serial.println();
    }

    FirebaseJson json;
    json.add("data1-1", count1).add("data1-2", count1 + 1).add("data1-3", count1 + 2);
    Serial.println("------------------------------------");
    Serial.println("Update Data 1...");
    if (Firebase.updateNode(fbdo1, path + "/Stream/data1", json))
    {
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo1.dataPath());
      Serial.println("TYPE: " + fbdo1.dataType());
      Serial.print("VALUE: ");
      printResult(fbdo1);
      Serial.println("------------------------------------");
      Serial.println();
    }
    else
    {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo1.errorReason());
      Serial.println("------------------------------------");
      Serial.println();
    }

    //Stop WiFi client will gain the free memory
    //This requires more time for the SSL handshake process in the next connection
    // due to the previous connection was completely stopped.
    fbdo1.stopWiFiClient();

    Serial.print("Free Heap: ");
    Serial.println(ESP.getFreeHeap());
    Serial.println();

    // count1 += 3;
  }
  //*/
}

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////

void printResult(FirebaseData &data)
{

  if (data.dataType() == "int")
    Serial.println(data.intData());
  else if (data.dataType() == "float")
    Serial.println(data.floatData(), 5);
  else if (data.dataType() == "double")
    printf("%.9lf\n", data.doubleData());
  else if (data.dataType() == "boolean")
    Serial.println(data.boolData() == 1 ? "true" : "false");
  else if (data.dataType() == "string")
    Serial.println(data.stringData());
  else if (data.dataType() == "json")
  {
    Serial.println();
    FirebaseJson &json = data.jsonObject();
    //Print all object data
    Serial.println("Pretty printed JSON data:");
    String jsonStr;
    json.toString(jsonStr, true);
    Serial.println(jsonStr);
    Serial.println();
    Serial.println("Iterate JSON data:");
    Serial.println();
    size_t len = json.iteratorBegin();
    String key, value = "";
    int type = 0;
    for (size_t i = 0; i < len; i++)
    {
      json.iteratorGet(i, type, key, value);
      Serial.print(i);
      Serial.print(", ");
      Serial.print("Type: ");
      Serial.print(type == FirebaseJson::JSON_OBJECT ? "object" : "array");
      if (type == FirebaseJson::JSON_OBJECT)
      {
        Serial.print(", Key: ");
        Serial.print(key);
      }
      Serial.print(", Value: ");
      Serial.println(value);
    }
    json.iteratorEnd();
  }
  else if (data.dataType() == "array")
  {
    Serial.println();
    //get array data from FirebaseData using FirebaseJsonArray object
    FirebaseJsonArray &arr = data.jsonArray();
    //Print all array values
    Serial.println("Pretty printed Array:");
    String arrStr;
    arr.toString(arrStr, true);
    Serial.println(arrStr);
    Serial.println();
    Serial.println("Iterate array values:");
    Serial.println();
    for (size_t i = 0; i < arr.size(); i++)
    {
      Serial.print(i);
      Serial.print(", Value: ");

      FirebaseJsonData &jsonData = data.jsonData();
      //Get the result data from FirebaseJsonArray object
      arr.get(jsonData, i);
      if (jsonData.typeNum == FirebaseJson::JSON_BOOL)
        Serial.println(jsonData.boolValue ? "true" : "false");
      else if (jsonData.typeNum == FirebaseJson::JSON_INT)
        Serial.println(jsonData.intValue);
      else if (jsonData.typeNum == FirebaseJson::JSON_FLOAT)
        Serial.println(jsonData.floatValue);
      else if (jsonData.typeNum == FirebaseJson::JSON_DOUBLE)
        printf("%.9lf\n", jsonData.doubleValue);
      else if (jsonData.typeNum == FirebaseJson::JSON_STRING ||
               jsonData.typeNum == FirebaseJson::JSON_NULL ||
               jsonData.typeNum == FirebaseJson::JSON_OBJECT ||
               jsonData.typeNum == FirebaseJson::JSON_ARRAY)
        Serial.println(jsonData.stringValue);
    }
  }
  else
  {
    Serial.println(data.payload());
  }
}

/* MUSIC */

void play(int note, int dur)
{
  ledcWriteTone(0, note);
  delay(dur * NOTE_DUR);
  ledcWriteTone(0, 0);
  delay(dur * NOTE_DUR / 3);
}

void ChopsticksMelody()
{
    play(NOTE_C4, 3); // m1
    play(NOTE_C4, 3);
    play(NOTE_C4, 6);
    delay(NOTE_DUR*2); // m2
    play(NOTE_C4, 1);
    play(NOTE_B3, 2);
    play(NOTE_A3, 1);
    play(NOTE_B3, 2);
    play(NOTE_C4, 1);
    play(NOTE_D4, 3); 
    play(NOTE_E4, 3); // m3
    play(NOTE_E4, 3);
    play(NOTE_E4, 6);
    delay(NOTE_DUR*2); // m4
    play(NOTE_E4, 1);
    play(NOTE_D4, 2);
    play(NOTE_C4, 1);
    play(NOTE_D4, 2);
    play(NOTE_E4, 1);
    play(NOTE_F4, 3);
    play(NOTE_G4, 6); // m5
    play(NOTE_C4, 6);
    delay(NOTE_DUR*2); // m6
    play(NOTE_A4, 1);
    play(NOTE_G4, 2);
    play(NOTE_F4, 1);
    play(NOTE_E4, 3);
    play(NOTE_D4, 3);
    play(NOTE_C4, 3); // m7
    // delay(NOTE_DUR*1);
    play(NOTE_C5, 2);
    play(NOTE_B4, 1);
    play(NOTE_A4, 2);
    play(NOTE_B4, 1);
    play(NOTE_A4, 2);
    play(NOTE_G4, 1);
    play(NOTE_F4, 2);
    play(NOTE_G4, 1);
    play(NOTE_F4, 2);
    play(NOTE_E4, 1);
    play(NOTE_D4, 3);
    play(NOTE_G4, 3);
    
}

void MSMIntro()
{
  play(NOTE_G5, 2); // M1
  play(NOTE_GS5, 1);
  play(NOTE_A5, 1);
  delay(NOTE_DUR);
  play(NOTE_GS5, 1);
  delay(NOTE_DUR*1);
  play(NOTE_FS5, 1);
  play(NOTE_G5, 2); // M2
  play(NOTE_DS5, 1);
  play(NOTE_E5, 1);
  delay(NOTE_DUR*1);
  play(NOTE_G4, 1);
  play(NOTE_A4, 1);
  play(NOTE_E5, 1);

  play(NOTE_G5, 2); // M3
  play(NOTE_GS5, 1);
  play(NOTE_A5, 1);
  delay(NOTE_DUR);
  play(NOTE_GS5, 1);
  delay(NOTE_DUR*1);
  play(NOTE_G5, 1);
  play(NOTE_E6, 2); // M4
  play(NOTE_B5, 1);
  play(NOTE_C6, 1);
  delay(NOTE_DUR*1);
  play(NOTE_G5, 1);
  play(NOTE_E5, 1);
  play(NOTE_D5, 1);

  play(NOTE_G5, 2); // M5
  play(NOTE_GS5, 1);
  play(NOTE_A5, 1);
  delay(NOTE_DUR);
  play(NOTE_GS5, 1);
  delay(NOTE_DUR*1);
  play(NOTE_E5, 1);
  play(NOTE_FS5, 1); // M6
  play(NOTE_G5, 1);
  play(NOTE_DS5, 1);
  play(NOTE_E5, 1);
  delay(NOTE_DUR*1);
  play(NOTE_G4, 1);
  play(NOTE_A4, 1);
  play(NOTE_E5, 1);

  play(NOTE_G5, 2); // M7
  play(NOTE_GS5, 1);
  play(NOTE_A5, 1);
  delay(NOTE_DUR);
  play(NOTE_GS5, 1);
  delay(NOTE_DUR*1);
  play(NOTE_G5, 1);
  play(NOTE_F5, 1); // M8
  play(NOTE_E5, 1);
  play(NOTE_D5, 1);
  play(NOTE_C5, 1);
  delay(NOTE_DUR*4);
}

void Pirates()
{
  play(NOTE_A3, 1);
  play(NOTE_C4, 1);
  play(NOTE_D4, 2); // M1
  play(NOTE_D4, 2);
  play(NOTE_D4, 1);
  play(NOTE_E4, 1);
  play(NOTE_F4, 2);
  play(NOTE_F4, 2);
  play(NOTE_F4, 1);
  play(NOTE_G4, 1);
  play(NOTE_E4, 2); // M2
  play(NOTE_E4, 2);
  play(NOTE_D4, 1);
  play(NOTE_C4, 1);
  play(NOTE_C4, 1);
  play(NOTE_D4, 3);
  play(NOTE_A3, 1);
  play(NOTE_C4, 1);
  play(NOTE_D4, 2); // M3
  play(NOTE_D4, 2);
  play(NOTE_D4, 1);
  play(NOTE_E4, 1);
  play(NOTE_F4, 2);
  play(NOTE_F4, 2);
  play(NOTE_F4, 1);
  play(NOTE_G4, 1);
  play(NOTE_E4, 2); // M2
  play(NOTE_E4, 2);
  play(NOTE_D4, 1);
  play(NOTE_C4, 1);
  play(NOTE_D4, 4);
  play(NOTE_A3, 1);
  play(NOTE_C4, 1);
  play(NOTE_D4, 2); // M5
  play(NOTE_D4, 2);
  play(NOTE_D4, 1);
  play(NOTE_F4, 1);
  play(NOTE_G4, 2);
  play(NOTE_G4, 2);
  play(NOTE_G4, 1);
  play(NOTE_A4, 1);
  play(NOTE_AS4, 2); // M6
  play(NOTE_AS4, 2);
  play(NOTE_A4, 1);
  play(NOTE_G4, 1);
  play(NOTE_A4, 1);
  play(NOTE_D4, 3);
  play(NOTE_D4, 1);
  play(NOTE_E4, 1);
  play(NOTE_F4, 2); // M1
  play(NOTE_F4, 2);
  play(NOTE_G4, 2);
  play(NOTE_A4, 1);
  play(NOTE_D4, 3);
  play(NOTE_D4, 1);
  play(NOTE_F4, 1);
  play(NOTE_E4, 2); // M2
  play(NOTE_E4, 2);
  play(NOTE_F4, 1);
  play(NOTE_D4, 1);
  play(NOTE_E4, 4); 
}
