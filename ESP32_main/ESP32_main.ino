const int SPEAKER = 23;
unsigned long NOTE_DUR = 100;
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


/* Define the Firebase Data object */
FirebaseData fbdo;

String path = "";

void printResult(FirebaseData &data);
void play(int note, int dur);
void MSMIntro();
void ChopsticksMelody();
void Pirates();
void parseJSON(FirebaseData &data);
unsigned long toMS(int tempo);

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
    
    int tempo;

    if (fbdo.intData() % 3 == 1)
    {
      tempo = 60;
      NOTE_DUR = toMS(tempo);
      Serial.println(NOTE_DUR);
      Serial.println("Playing Chopsticks");
      //ChopsticksMelody();
      Twinkle();
    }

    else if (fbdo.intData() % 3 == 2)
    {
      tempo = 90;
      NOTE_DUR = toMS(tempo);
      Serial.println(NOTE_DUR);
      Serial.println("Playing MSM");
      //MSMIntro();
      Twinkle();
    }
  
    else if (fbdo.intData() % 3 == 0)
    {
      tempo = 120;
      NOTE_DUR = toMS(tempo);
      Serial.println(NOTE_DUR);
      Serial.println("Playing Pirates");
      //Pirates();
      Twinkle();
    }
    
    Serial.println("------------------------------------");
    Serial.println();
  }
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

unsigned long toMS(int tempo)
{
  return (60.0 * 1000.0 / tempo);
}

void play(int note, int dur)
{
  ledcWriteTone(0, pitchArr[note - 23]);
  delay(dur * NOTE_DUR * 4 / 5);
  ledcWriteTone(0, 0);
  delay(dur * NOTE_DUR / 5);
}

void parseJSON(FirebaseData &data)
{
  // read json 
  FirebaseJson &json = data.jsonObject();
  Serial.println("Pretty printed JSON data:");
  String jsonStr;
  json.toString(jsonStr, true);
  Serial.println(jsonStr);
  Serial.println();
  // parse json
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

void Twinkle()
{
  play(60, 1);
  play(60, 1);
  play(67, 1);
  play(67, 1);
  
  play(69, 1);
  play(69, 1);
  play(67, 2);

  play(65, 1);
  play(65, 1);
  play(64, 1);
  play(64, 1);
  
  play(62, 1);
  play(62, 1);
  play(60, 2);
}
